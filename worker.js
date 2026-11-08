// Static assets don't answer HTTP Range requests, and Safari will only play
// <video> when they do. wrangler.jsonc routes the .mp4 files through this
// script, which serves the requested byte range; everything else is served
// directly from ./out.
export default {
  async fetch(request, env) {
    const range = request.headers.get("Range");
    const res = await env.ASSETS.fetch(request);
    const match = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!match || res.status !== 200) return res;

    const body = await res.arrayBuffer();
    const size = body.byteLength;
    let start = match[1] === "" ? size - Number(match[2]) : Number(match[1]);
    let end = match[1] === "" || match[2] === "" ? size - 1 : Number(match[2]);
    start = Math.max(0, start);
    end = Math.min(end, size - 1);
    if (start > end) {
      return new Response(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${size}` },
      });
    }

    const headers = new Headers(res.headers);
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    headers.set("Accept-Ranges", "bytes");
    return new Response(body.slice(start, end + 1), { status: 206, headers });
  },
};
