# Analytics: what is tracked and how to read it

## How the data flows

```
visitor ── apollo.0g.ai ──► Google tag GTM-5FGP4MT5 ──► GA4 property G-3LBVVY13J4
                │                                         (traffic, behaviour, leads)
                └── /apply (Tally form RGEVxj) ──► Tally responses
                     hidden fields: utm_*, ref,          (every application, with its source)
                     referrer, landing_page
```

Two sources, two jobs:

| Source | Counts | Use it for |
|---|---|---|
| **Tally responses** | Every application. Hidden fields carry the source, so ad blockers don't affect them. | **How many leads** each source, campaign and alumni code brought |
| **GA4** | Visitors whose browser loads Google's script. Ad blockers are common with crypto and developer audiences, so expect it to miss a share. | **Rates and behaviour**: visitors per source, conversion rate, funnel drop-off, which sections and links people use |

When the two disagree on lead counts, Tally is right.

The tag is only on production builds (`npm run build`), so `npm run dev` never sends data.

## Events

Code: `lib/analytics.ts` (`track()`), `components/Analytics.tsx` (page-wide listeners),
plus the referral code in `lib/referral.ts`, the FAQ and the case-study tabs.

| Event | When | Parameters |
|---|---|---|
| `page_view` | Each page, including client-side moves to /apply (GA4 automatic) | |
| `scroll`, `click` (outbound), `user_engagement` | GA4 enhanced measurement (automatic) | |
| `referral_visit` | Someone lands with `?ref=CODE` | `referral_code`, `referral_valid` (false = unknown code or typo), `referral_first` (true = first code stored for this visitor) |
| `section_view` | A homepage section's top passes 60% of the screen, once per page | `section_id` (hero, about, highlights, projects, built-on-0g, perks, mentors, faq, timeline, apply), `section_position` |
| `cta_click` | Any link to /apply | `link_location` (navbar, hero, faq, apply = bottom CTA, …), `link_text` |
| `link_click` | Any link to another site | `link_location`, `link_text`, `link_item` (the mentor, project or case study it belongs to), `link_domain`, `link_url` |
| `nav_click` | In-page and internal links | `link_location`, `link_text`, `link_target` |
| `contact_click` | `mailto:` links | `link_location` |
| `faq_open` | An FAQ question is opened | `question` |
| `case_study_view` | A Built on 0G tab is chosen | `case_study` |
| `video_start`, `video_progress`, `video_complete` | The Cohort 1 highlight video (the hero autoplay loop is skipped) | `video_title`, `video_percent` (25/50/75/100), `video_duration` |
| `form_view` | The Tally form has loaded | `form_id` |
| `form_step` | Each page of the Tally form reached | `form_id`, `form_page` |
| **`generate_lead`** | **The application is submitted** | `form_id`, `lead_source`, `lead_medium`, `lead_campaign` (first UTM values this visit), `referral_code`, `referrer_host`, `landing_page` |

User property `apollo_ref` is set from the stored alumni code (kept 90 days), so every
event from a referred visitor carries it.

Never send form answers, names or emails to GA4: Google forbids it. The Tally listener
only reads the form ID and page number.

## One-time GA4 setup (Admin)

1. **Key event**: Admin → Events → mark `generate_lead` as a key event. Optionally
   `cta_click` too, as a softer signal.
2. **Custom dimensions** (Admin → Custom definitions → Create). Event scope:
   `section_id`, `link_location`, `link_item`, `link_target`, `case_study`,
   `question`, `form_page`, `lead_source`, `lead_medium`, `lead_campaign`,
   `referral_code`, `referral_valid`, `referrer_host`, `landing_page` (call it
   "Lead landing page"), `video_percent`.
   User scope: `apollo_ref` ("Alumni referral code").
   (`link_text`, `link_url`, `link_domain`, `video_title` already exist as built-in
   dimensions.) Custom dimensions only fill from the day they are created.
3. **Data retention**: Admin → Data collection → Data retention → 14 months, so
   explorations can look back past two months.
4. **Internal traffic** (optional): define the team's IPs and turn on the filter.
5. **Enhanced measurement**: keep it on, including "Page changes based on browser
   history events" (needed for page views when people click through to /apply).
6. **Search Console** link (optional): shows the Google searches that bring people.

## Tally: every lead with its source

1. In the Tally form, check the hidden fields exist: `utm_source`, `utm_medium`,
   `utm_campaign`, `utm_content`, `utm_term`, `ref`, `referrer`, `landing_page`.
2. Integrations → Google Sheets, so each response lands in a sheet. That sheet feeds
   dashboard A below.

## Dashboards

**A. Lead sources** (Looker Studio, from the Tally sheet). This is the source of truth for lead counts.
- Total applications, and applications per day
- Applications by `utm_source` / `utm_medium` / `utm_campaign`
- **Alumni referral leaderboard**: applications by `ref`
- Applications by referring site (`referrer`) and by `landing_page`

**B. Acquisition and conversion** (GA4 Reports → Acquisition → Traffic acquisition,
with key event `generate_lead` selected, or Looker Studio on the GA4 connector)
- Per source / medium / campaign: users, engaged sessions, `cta_click`, `generate_lead`,
  and the key event rate (leads ÷ sessions)

**C. Application funnel** (GA4 Explore → Funnel exploration, open funnel)
1. `session_start`
2. `section_view` (any)
3. `cta_click`
4. `page_view` where page path = /apply
5. `form_view`
6. `form_step` with `form_page` = 2 (started filling in)
7. `generate_lead`

Break it down by "Session default channel group" or `apollo_ref` to see which sources
bring visitors who actually finish.

**D. Alumni referrals** (GA4 Explore → Free form)
- Rows: `referral_code`; values: event count of `referral_visit` and `generate_lead`, users
- A second table filtered to `referral_valid = false` shows mistyped codes worth fixing

**E. Content engagement** (GA4 Explore → Free form)
- Section reach: `section_view` users by `section_id`, sorted by `section_position`
  (shows where people stop scrolling)
- Which Apply button works: `cta_click` by `link_location`
- Most-clicked mentors, projects and partners: `link_click` by `link_item`
- `case_study_view` by `case_study`; `faq_open` by `question` (what people worry about)
- Video: `video_progress` by `video_percent`

**F. Weekly snapshot** (Looker Studio, scheduled email): users, sessions, leads
(from Tally), top 5 sources, top 5 alumni codes, conversion rate.

## Checking it works

- tagassistant.google.com → connect to apollo.0g.ai and click around. Events show live.
- GA4 Admin → DebugView shows them while Tag Assistant is connected.
- Test campaign links with UTM tags, e.g.
  `https://apollo.0g.ai/?utm_source=x&utm_medium=social&utm_campaign=cohort2`.
- Ad blockers stop the tag. Use a clean browser profile to test.
