// Static assets don't answer HTTP Range requests, and Safari will only play
// <video> when they do. wrangler.jsonc routes the .mp4 files through this
// script, which streams the requested byte range; everything else is served
// directly from ./out.
export default {
  async fetch(request, env) {
    const range = request.headers.get("Range");
    const res = await env.ASSETS.fetch(request);
    const match = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!match || res.status !== 200) return res;

    // Content-Length is set in production; `wrangler dev` may omit it, so
    // fall back to reading the file to learn its size.
    let size = Number(res.headers.get("Content-Length"));
    let body = res.body;
    if (!size) {
      const buf = await res.arrayBuffer();
      size = buf.byteLength;
      body = new Blob([buf]).stream();
    }

    let start = match[1] === "" ? size - Number(match[2]) : Number(match[1]);
    let end = match[1] === "" || match[2] === "" ? size - 1 : Number(match[2]);
    start = Math.max(0, start);
    end = Math.min(end, size - 1);
    if (start > end) {
      body?.cancel();
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    const headers = new Headers(res.headers);
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    headers.set("Accept-Ranges", "bytes");
    return new Response(sliceStream(body, start, end), { status: 206, headers });
  },
};

// Pass through bytes start..end (inclusive) of a stream without buffering it.
function sliceStream(body, start, end) {
  let pos = 0;
  const reader = body.getReader();
  return new ReadableStream({
    // Keep reading until a chunk overlaps the range: a pull that enqueues
    // nothing is not called again, which would stall the response.
    async pull(controller) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) return controller.close();
        const from = Math.max(start - pos, 0);
        const to = Math.min(end + 1 - pos, value.byteLength);
        pos += value.byteLength;
        if (pos > end) {
          if (from < to) controller.enqueue(value.subarray(from, to));
          controller.close();
          reader.cancel();
          return;
        }
        if (from < to) return controller.enqueue(value.subarray(from, to));
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}
