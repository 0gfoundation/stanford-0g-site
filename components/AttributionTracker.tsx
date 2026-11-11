"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { captureReferral } from "@/lib/referral";
import { setUserProperties } from "@/lib/analytics";

/**
 * Records UTM parameters, alumni ref codes, referrer and landing page for the application form,
 * and tags the visitor in GA4 with their referral code so every later event carries it.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
    const code = captureReferral();
    if (code) setUserProperties({ apollo_ref: code });
  }, []);
  return null;
}
