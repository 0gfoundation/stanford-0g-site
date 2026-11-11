// GA4 events, sent through the Google tag in app/layout.tsx (GTM-5FGP4MT5).
// The event plan, the GA4 setup and the dashboards built on it are in
// docs/analytics.md. Never send form answers or other personal data.

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

// GA4 cuts parameter values at 100 characters; empty values are left out.
function clean(params: AnalyticsParams): AnalyticsParams {
  const out: AnalyticsParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    out[key] = typeof value === "string" ? value.slice(0, 100) : value;
  }
  return out;
}

/** Send a GA4 event. A no-op when the tag isn't on the page (local development). */
export function track(event: string, params: AnalyticsParams = {}) {
  (window as GtagWindow).gtag?.("event", event, clean(params));
}

/** Set GA4 user properties, attached to every later event from this visitor. */
export function setUserProperties(properties: AnalyticsParams) {
  (window as GtagWindow).gtag?.("set", "user_properties", clean(properties));
}
