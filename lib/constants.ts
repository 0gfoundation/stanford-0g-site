export const COLORS = {
  purple: {
    primary: "#9200E1",
    100: "#E3C1FF",
    200: "#D5A3FF",
    300: "#CB8AFF",
    400: "#B75FFF",
    500: "#9200E1",
  },
  black: "#000000",
  white: "#FEFEFE",
  gray: "#E5E5E5",
};

export const NAV_LINKS = [
  { label: "Highlights", href: "#highlights" },
  { label: "About", href: "#about" },
  { label: "Perks", href: "#perks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Mentors", href: "#mentors" },
  { label: "Projects", href: "#projects" },
  { label: "FAQ", href: "#faq" },
];

export const PROGRAM_STATS = [
  { value: "10", label: "Teams Selected" },
  { value: "$2M", prefix: "Up to", label: "Investment Per Project" },
  { value: "3", label: "Month Program" },
  { value: "1", label: "Demo Day" },
];

export const BUILD_CATEGORIES = [
  {
    title: "DeFi",
    description: "Build next-gen decentralized finance protocols",
    icon: "Coins",
  },
  {
    title: "AI Agents",
    description: "Create autonomous AI-powered applications",
    icon: "Bot",
  },
  {
    title: "Data Infrastructure",
    description: "Develop scalable data availability solutions",
    icon: "Database",
  },
  {
    title: "Gaming & NFTs",
    description: "Build immersive on-chain gaming experiences",
    icon: "Gamepad2",
  },
];

export const PROGRAM_PHASES = [
  {
    label: "Month 1",
    period: "December",
    duration: "4 weeks",
    modules: [
      { number: "01", title: "Overview & Plan" },
      { number: "02", title: "Product Strategy" },
      { number: "03", title: "AI Module" },
      { number: "04", title: "Tech Deep Dives" },
    ],
  },
  {
    label: "Month 2",
    period: "January",
    sprint: true,
    description:
      "Focused build against OKRs. Two weeks of team check-ins, no scheduled content, programming picks up again in February.",
  },
  {
    label: "Month 3",
    period: "February",
    duration: "4 weeks",
    modules: [
      { number: "05", title: "Go-to-Market" },
      { number: "06", title: "People, Ops & Legal" },
      { number: "07", title: "Fundraising & Demo Prep" },
      { number: "08", title: "Demo Day & Graduation", highlight: true },
    ],
  },
];

export const MILESTONES = [
  {
    title: "Stanford IRL Event",
    description:
      "In-person sessions and networking at Stanford University with mentors, investors, and fellow founders.",
    icon: "MapPin",
  },
  {
    title: "Demo Day",
    description:
      "Present your company to investors and the AI community at Demo Day. Final OKR grading, debriefing, and retrospective.",
    icon: "Presentation",
  },
  {
    title: "Graduation Party",
    description:
      "Celebrate your achievements, connect with the alumni network, and kick off the next chapter of your venture.",
    icon: "GraduationCap",
  },
];

export const BENEFITS = [
  {
    title: "Expert Mentorship",
    description: "1:1 guidance from industry veterans and successful founders",
    icon: "Users",
  },
  {
    title: "Technical Support",
    description: "Direct access to 0G engineers and resources",
    icon: "Code",
  },
  {
    title: "Network Access",
    description: "Connect with top VCs, partners, and fellow builders",
    icon: "Network",
  },
  {
    title: "Demo Day Exposure",
    description: "Showcase your project to investors and the AI community",
    icon: "Presentation",
  },
];

export const APPLY_CRITERIA = [
  "Building on or planning to build on 0G AI infrastructure",
  "Have a working MVP or strong prototype",
  "Committed founding team (2+ members)",
  "Available for the full 3-month program",
];

export const DEMO_DAY_RECORDING_URL = "https://youtu.be/cGtOOdPvSaQ";

export const COHORT1_STATS = [
  { value: "220+", label: "Applications for 10 spots" },
  {
    value: "100+",
    label: "Intro requests from investors, enterprises, and partners since Demo Day",
  },
  { value: "US$20M", prefix: "Up to", label: "Investment opportunity across teams" },
  { value: "10/10", label: "Teams at Demo Day" },
];

export const COHORT1_TESTIMONIALS = [
  {
    quote:
      "The Apollo and 0G team gets genuinely hands-on. We received detailed feedback across product, GTM, and fundraising, not just high-level advice. The program's partner network provided support at every step, and 0G actively introduced investors to our team throughout.",
    name: "Justin Bebis",
    role: "Founder, UV Labs",
  },
  {
    quote:
      "What I appreciated about the Apollo program was the range of exceptional people around the program, from the xBuilders team to mentors from Google and other companies and funds we have been introduced to. The program gave us great opportunities to present at events, while the 0G team has been amazing in organizing the program and are really supportive well after Demo Day!",
    name: "Alex Radu",
    role: "Co-founder, Pulsar Money",
  },
  {
    quote:
      "The Apollo mentors have been excellent on GTM, and the events the team organized generated real client leads for us. This is exactly what you want from a program.",
    name: "Jon Ozdoruk",
    role: "Co-Founder, DSALTA",
  },
  {
    quote:
      "Apollo gave us strong support from its mentors, and the 0G team went even further — they use our product at their own events. For a company building a professional network for agents, being embedded in this ecosystem is exactly the right place to grow.",
    name: "David Shao",
    role: "Co-Founder, Walnut AI",
  },
  {
    quote:
      "The Apollo mentors are expert in the places every startup needs, multiple deep-dive calls working through product market fit, fundraising, networking and much more. That kind of sustained, substantive help is uniquely Apollo Accelerator.",
    name: "Wyatt Benno",
    role: "Co-Founder, ICME",
  },
];

export const COHORT1_PHOTOS = [
  {
    src: "/cohort1/group-photo.jpg",
    alt: "Cohort 1 group photo at Stanford University",
    caption: "Cohort group photo",
  },
  {
    src: "/cohort1/20260729-apollo-219.jpg",
    alt: "Graduation day session at Stanford",
    caption: "Graduation ceremony",
  },
  {
    src: "/cohort1/20260729-apollo-769.jpg",
    alt: "Cohort 1 graduation dinner toast",
    caption: "Graduation dinner",
  },
];