// Marketing attribution carried from the landing page to the application form.
// Values are stored in sessionStorage on first visit and appended to the Tally
// embed URL on /apply, where matching hidden fields capture them.
// Alumni referral codes (`ref`) are handled separately in lib/referral.ts.

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const ATTRIBUTION_STORAGE_KEY = "apollo_attribution";

export type Attribution = Partial<
  Record<(typeof ATTRIBUTION_PARAMS)[number] | "ref" | "referrer" | "landing_page", string>
>;

/** Attribution captured so far this session (first touch). */
export function getAttribution(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

function isExternalReferrer(referrer: string): boolean {
  if (!referrer) return false;
  try {
    return new URL(referrer).host !== window.location.host;
  } catch {
    return false;
  }
}

/** Capture attribution from the current URL and referrer. First touch wins. */
export function captureAttribution(): Attribution {
  const stored = getAttribution();
  const params = new URLSearchParams(window.location.search);
  const next: Attribution = { ...stored };

  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value && !next[key]) next[key] = value.slice(0, 200);
  }
  if (!next.referrer && isExternalReferrer(document.referrer)) {
    next.referrer = document.referrer.slice(0, 500);
  }
  if (!next.landing_page) {
    next.landing_page = window.location.pathname + window.location.search;
  }

  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or storage blocked: attribution is best-effort.
  }
  return next;
}

/** Append attribution to a URL as query parameters. */
export function withAttribution(url: string, attribution: Attribution): string {
  const u = new URL(url);
  for (const [key, value] of Object.entries(attribution)) {
    if (value) u.searchParams.set(key, value);
  }
  return u.toString();
}
