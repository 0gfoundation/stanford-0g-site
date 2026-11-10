// Alumni referral codes (e.g. apollo.0g.ai/apply?ref=WALNUTAI).
// The first valid code a founder arrives with is kept for 90 days in
// localStorage, with a first-party cookie as fallback, and sent to the Tally
// form's `ref` hidden field. Unknown codes are ignored. Every arrival with a
// `ref` is also reported to GA4 as `referral_visit`, valid or not, so typos show up.

import { track } from "@/lib/analytics";

export const REF_CODES = new Set([
  "FLOELABS",
  "UVLABS",
  "ICMELABS",
  "BITMIND",
  "PULSARMONEY",
  "WALNUTAI",
  "IMPULSEAI",
  "DSALTA",
  "MIGHTY",
  "OMLABS",
]);

const REF_KEY = "apollo_ref";
const REF_MAX_AGE_DAYS = 90;

/** Upper-case, strip everything but A-Z and 0-9, and accept only known codes. */
export function normalizeRef(value: string | null): string | null {
  if (!value) return null;
  const code = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return REF_CODES.has(code) ? code : null;
}

/** The referral code this visitor arrived with, if still valid. */
export function readStoredRef(): string | null {
  try {
    const raw = window.localStorage.getItem(REF_KEY);
    if (raw) {
      const { code, ts } = JSON.parse(raw);
      if (REF_CODES.has(code) && Date.now() - ts < REF_MAX_AGE_DAYS * 864e5) return code;
    }
  } catch {
    // Storage blocked or malformed entry: fall back to the cookie.
  }
  const match = document.cookie.match(/(?:^|; )apollo_ref=([A-Z0-9]+)/);
  return match && REF_CODES.has(match[1]) ? match[1] : null;
}

/**
 * Capture a referral code from the current URL. First valid code wins and is
 * never overwritten. Removes `ref` from the address bar, because Tally's widget
 * forwards page query parameters to the form. Returns the code to send, or null.
 */
export function captureReferral(): string | null {
  const url = new URL(window.location.href);
  const raw = url.searchParams.get("ref");
  const incoming = normalizeRef(raw);
  let code = readStoredRef();

  if (raw !== null) {
    track("referral_visit", {
      referral_code: incoming ?? raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 30),
      referral_valid: incoming !== null,
      referral_first: !code && incoming !== null,
    });
  }

  if (!code && incoming) {
    code = incoming;
    try {
      window.localStorage.setItem(REF_KEY, JSON.stringify({ code, ts: Date.now() }));
    } catch {
      // Private mode: the cookie below still keeps the code.
    }
    document.cookie = `apollo_ref=${code}; Max-Age=${REF_MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax; Secure`;
  }

  if (url.searchParams.has("ref")) {
    url.searchParams.delete("ref");
    window.history.replaceState(window.history.state, "", url.toString());
  }
  return code;
}
