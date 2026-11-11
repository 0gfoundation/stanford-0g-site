"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type AnalyticsParams } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { readStoredRef } from "@/lib/referral";

const VIDEO_MILESTONES = [25, 50, 75];

function linkLocation(link: Element): string {
  if (link.closest("nav")) return "navbar";
  if (link.closest("footer")) return "footer";
  return link.closest("section")?.id || "page";
}

function linkText(link: Element): string | undefined {
  const text = link.textContent?.replace(/\s+/g, " ").trim();
  return text || link.getAttribute("aria-label") || undefined;
}

// The card a link sits in (a mentor, project or case study), from the nearest
// heading a few levels up. Icon-only links like a mentor's LinkedIn need this.
function linkItem(link: Element): string | undefined {
  let el = link.parentElement;
  for (let depth = 0; el && depth < 4 && !el.matches("section, nav, footer"); depth++) {
    const heading = el.querySelector("h3");
    if (heading) return heading.textContent?.trim() || undefined;
    el = el.parentElement;
  }
}

// Where the lead came from, as captured on landing (the same values the Tally
// form receives as hidden fields).
function leadSource() {
  const attribution = getAttribution();
  let referrerHost: string | undefined;
  try {
    referrerHost = attribution.referrer ? new URL(attribution.referrer).host : undefined;
  } catch {
    // Malformed referrer: leave it out.
  }
  return {
    lead_source: attribution.utm_source,
    lead_medium: attribution.utm_medium,
    lead_campaign: attribution.utm_campaign,
    referral_code: readStoredRef(),
    referrer_host: referrerHost,
    landing_page: attribution.landing_page,
  };
}

/** Page-wide GA4 events: clicks, section views, video plays and the Tally application form. */
export default function Analytics() {
  const pathname = usePathname();

  // One section_view per section per page, when its top passes 60% of the viewport.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target as HTMLElement;
          track("section_view", {
            section_id: section.id,
            section_position: sections.indexOf(section) + 1,
          });
          observer.unobserve(section);
        }
      },
      { rootMargin: "0px 0px -40% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  // Every link click, labelled with where on the page it was.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      const params = {
        link_location: linkLocation(link),
        link_text: linkText(link),
        link_item: linkItem(link),
      };

      if (url.protocol === "mailto:") {
        track("contact_click", params);
      } else if (url.host !== window.location.host) {
        track("link_click", { ...params, link_domain: url.host, link_url: url.origin + url.pathname });
      } else if (url.pathname.replace(/\/$/, "") === "/apply") {
        track("cta_click", params);
      } else {
        track("nav_click", { ...params, link_target: url.hash || url.pathname });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Videos people choose to play (the muted autoplay loop in the hero is skipped).
  useEffect(() => {
    const sent = new WeakMap<HTMLVideoElement, Set<string>>();
    const once = (video: HTMLVideoElement, event: string, extra: Record<string, number> = {}) => {
      const key = `${event}${extra.video_percent ?? ""}`;
      const done = sent.get(video) ?? new Set<string>();
      if (done.has(key)) return;
      done.add(key);
      sent.set(video, done);
      track(event, {
        video_title: video.currentSrc.split("/").pop(),
        video_provider: "self-hosted",
        video_duration: Math.round(video.duration) || undefined,
        ...extra,
      });
    };
    const handle = (e: Event) => {
      const video = e.target;
      if (!(video instanceof HTMLVideoElement) || video.autoplay) return;
      if (e.type === "play") once(video, "video_start");
      if (e.type === "ended") once(video, "video_complete", { video_percent: 100 });
      if (e.type === "timeupdate" && video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        for (const milestone of VIDEO_MILESTONES) {
          if (percent >= milestone) once(video, "video_progress", { video_percent: milestone });
        }
      }
    };
    // Media events don't bubble, so listen in the capture phase.
    const types = ["play", "timeupdate", "ended"];
    types.forEach((type) => document.addEventListener(type, handle, true));
    return () => types.forEach((type) => document.removeEventListener(type, handle, true));
  }, []);

  // The Tally form is an iframe; it reports progress to the page with postMessage.
  useEffect(() => {
    const sent = new Set<string>();
    const once = (key: string, event: string, params: AnalyticsParams) => {
      if (sent.has(key)) return;
      sent.add(key);
      track(event, params);
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://tally.so" || typeof e.data !== "string" || !e.data.includes("Tally.")) {
        return;
      }
      let message: { event?: string; payload?: { formId?: string; page?: number } };
      try {
        message = JSON.parse(e.data);
      } catch {
        return;
      }
      // Only the form ID and page number are read; answers are never sent on.
      const formId = message.payload?.formId;
      const page = message.payload?.page;
      if (message.event === "Tally.FormLoaded") {
        once("loaded", "form_view", { form_id: formId });
      } else if (message.event === "Tally.FormPageView" && page) {
        once(`page-${page}`, "form_step", { form_id: formId, form_page: page });
      } else if (message.event === "Tally.FormSubmitted") {
        once("submitted", "generate_lead", { form_id: formId, ...leadSource() });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [pathname]);

  return null;
}
