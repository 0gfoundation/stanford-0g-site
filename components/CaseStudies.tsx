"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { track } from "@/lib/analytics";
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Cpu,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

interface FlowStep {
  label: string;
  detail: string;
  icon: LucideIcon;
  onZeroG?: boolean;
}

interface ModelRoute {
  job: string;
  model: string;
  why: string;
  onZeroG?: boolean;
}

interface CaseStudy {
  name: string;
  logo: string;
  category: string;
  website: string;
  usesZeroGFor: string;
  body: string;
  // Optional badge, e.g. the Apollo cohort a team came from.
  label?: string;
  flow: FlowStep[];
  routes?: ModelRoute[];
  highlights?: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Pulsar Money",
    logo: "/projects/pulsar.png",
    category: "Multi-currency stablecoin money app",
    website: "https://pulsar.money",
    usesZeroGFor: "The AI assistant inside their app",
    body: "Every Pulsar Money user has an in-app assistant that handles notifications, analytics, and actions like transfers and payments. That assistant runs on 0G Private Computer.",
    label: "Apollo Cohort 1",
    flow: [
      { label: "Pulsar Money user", detail: "Every user gets the assistant", icon: UserRound },
      {
        label: "In-app assistant",
        detail: "Notifications, analytics, transfers and payments",
        icon: Bot,
      },
      {
        label: "Private Computer",
        detail: "Where the assistant runs",
        icon: Cpu,
        onZeroG: true,
      },
    ],
    routes: [
      {
        job: "Core app functions",
        model: "0G model",
        why: "Volume work, cost-sensitive, stays in-house",
        onZeroG: true,
      },
      {
        job: "User approvals",
        model: "OpenAI Astra",
        why: "Higher-stakes decisions, routed through 0G",
      },
    ],
  },
  {
    name: "UV Labs",
    logo: "/projects/uv-labs.png",
    category: "Agent-native trading products (Mosh Trade)",
    website: "https://uvlabs.ai",
    usesZeroGFor: "On-demand video generation",
    body: "Mosh creators need fast, reliable video generation directly within their workflow. UV Labs leverages 0G Private Computer to deliver instant, on-demand video creation, priced efficiently per clip. By offloading this heavy workload to specialized 0G compute, they bypass the bottlenecks of standard inference, giving creators seamless, high-performance generation exactly when they need it.",
    label: "Apollo Cohort 1",
    flow: [
      { label: "Mosh creator", detail: "Asks for a clip inside their workflow", icon: UserRound },
      {
        label: "Private Computer",
        detail: "Specialized 0G compute takes the heavy video workload",
        icon: Cpu,
        onZeroG: true,
      },
      { label: "Video clip", detail: "Generated on demand, ready to use", icon: Clapperboard },
    ],
    highlights: ["Instant, on demand", "Priced per clip", "No standard-inference bottlenecks"],
  },
];

// Vertical line between two flow steps, with a dot travelling down it.
function Connector() {
  const reduceMotion = useReducedMotion();
  return (
    <div
      aria-hidden
      className="relative ml-[31.5px] h-7 w-px overflow-hidden bg-gradient-to-b from-white/15 to-brand-purple-400/60"
    >
      {!reduceMotion && (
        <motion.span
          className="absolute left-0 top-0 h-2.5 w-px bg-brand-purple-100"
          animate={{ y: [-10, 28] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

function FlowNode({ step }: { step: FlowStep }) {
  const Icon = step.icon;
  return (
    <div
      className={`flex items-center gap-3.5 rounded-2xl p-3 border ${
        step.onZeroG
          ? "border-brand-purple-400/50 bg-brand-purple-500/15 shadow-[0_0_40px_-10px_rgba(146,0,225,0.7)]"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <span
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          step.onZeroG ? "bg-purple-gradient text-white" : "bg-white/[0.07] text-white/70"
        }`}
      >
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          {step.onZeroG && (
            <Image
              src="/0G-Logo-Purple_Hero.svg"
              alt="0G"
              width={378}
              height={183}
              className="h-4 w-auto"
            />
          )}
          {step.label}
        </div>
        <p className="text-xs text-white/50 mt-0.5">{step.detail}</p>
      </div>
    </div>
  );
}

function HowItRuns({ study }: { study: CaseStudy }) {
  return (
    <div className="relative h-full bg-gray-950 text-white p-6 sm:p-8 lg:p-10 overflow-hidden flex flex-col justify-center">
      <span
        aria-hidden
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-purple-500/30 blur-3xl pointer-events-none"
      />
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <div className="relative">
        <p className="font-mono text-[11px] tracking-[0.2em] text-white/45 mb-5">HOW IT RUNS</p>

        <ol aria-label={`How ${study.name} runs on 0G`}>
          {study.flow.map((step, i) => (
            <li key={step.label}>
              {i > 0 && <Connector />}
              <FlowNode step={step} />
            </li>
          ))}
        </ol>

        {study.routes && (
          <>
            <Connector />
            <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="px-4 pt-3.5 pb-2 font-mono text-[11px] tracking-[0.2em] text-white/45">
                MODEL SPLIT, BY JOB
              </p>
              <ul>
                {study.routes.map((route) => (
                  <li
                    key={route.job}
                    className="flex items-start justify-between gap-4 px-4 py-3 border-t border-white/[0.06]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{route.job}</p>
                      <p className="text-xs text-white/50 mt-0.5">{route.why}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 flex-shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        route.onZeroG
                          ? "bg-brand-purple-500 text-white"
                          : "bg-white/10 text-white/80"
                      }`}
                    >
                      {route.onZeroG && <ShieldCheck size={13} />}
                      {route.model}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {study.highlights && (
          <ul className="flex flex-wrap gap-2 mt-6">
            {study.highlights.map((highlight) => (
              <li
                key={highlight}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-xs text-white/80"
              >
                <Check size={13} className="text-brand-purple-300" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const host = new URL(study.website).host;

  return (
    <article className="glass rounded-[2rem] overflow-hidden grid lg:grid-cols-2 lg:min-h-[560px]">
      <div className="p-7 sm:p-10 lg:p-12 flex flex-col">
        <div className="flex items-center gap-4">
          <Image
            src={study.logo}
            alt={`${study.name} logo`}
            width={52}
            height={52}
            className="w-[52px] h-[52px] rounded-2xl ring-1 ring-black/5 object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-gray-900">{study.name}</h3>
            <p className="text-sm text-gray-500">{study.category}</p>
          </div>
        </div>

        <p className="mt-10 font-mono text-xs tracking-[0.2em] text-brand-purple-500">
          USES 0G FOR
        </p>
        <p className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-gray-900">
          {study.usesZeroGFor}
        </p>
        <p className="mt-5 text-gray-600 md:text-lg leading-relaxed">{study.body}</p>

        <div className="mt-auto pt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={study.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 font-semibold text-brand-purple-500 hover:text-brand-purple-400 transition-colors"
          >
            Visit {host}
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
          {study.label && (
            <span className="text-xs font-medium rounded-full px-3 py-1 bg-brand-purple-500/10 text-brand-purple-500">
              {study.label}
            </span>
          )}
        </div>
      </div>

      <HowItRuns study={study} />
    </article>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} case study`}
      className="hidden sm:flex w-10 h-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-purple-300/60 bg-white/70 text-gray-700 hover:border-brand-purple-400 hover:text-brand-purple-500 transition-colors"
    >
      <Icon size={18} />
    </button>
  );
}

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const study = CASE_STUDIES[active];

  // Wraps around, so the arrows keep cycling however many studies there are.
  const select = (i: number, focus = false) => {
    const next = (i + CASE_STUDIES.length) % CASE_STUDIES.length;
    setActive(next);
    track("case_study_view", { case_study: CASE_STUDIES[next].name });
    const tab = tabRefs.current[next];
    tab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    if (focus) tab?.focus();
  };

  const onTabKeyDown = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: CASE_STUDIES.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  return (
    <section id="built-on-0g" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gradient-border text-sm font-medium text-brand-purple-500 mb-5">
            Ecosystem case studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Built on <span className="text-gradient">0G</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how AI pioneers are leveraging 0G infrastructure to power
            their next-generation applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* One tab per study; the row scrolls sideways once it outgrows the screen */}
          <div className="flex items-center gap-3 mb-6">
            <ArrowButton direction="previous" onClick={() => select(active - 1)} />
            <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
              <div
                role="tablist"
                aria-label="Case studies"
                onKeyDown={onTabKeyDown}
                className="flex gap-2 w-max mx-auto py-1"
              >
                {CASE_STUDIES.map((s, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={s.name}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`case-tab-${i}`}
                      aria-selected={selected}
                      aria-controls="case-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => select(i)}
                      className={`inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-medium border transition-all whitespace-nowrap ${
                        selected
                          ? "bg-white border-brand-purple-400 text-gray-900 shadow-[0_6px_20px_-6px_rgba(146,0,225,0.35)]"
                          : "bg-white/50 border-gray-200 text-gray-500 hover:text-gray-800 hover:border-brand-purple-300"
                      }`}
                    >
                      <Image
                        src={s.logo}
                        alt=""
                        width={28}
                        height={28}
                        className={`w-7 h-7 rounded-full object-cover transition ${
                          selected ? "" : "grayscale opacity-70"
                        }`}
                      />
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <ArrowButton direction="next" onClick={() => select(active + 1)} />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={study.name}
              role="tabpanel"
              id="case-panel"
              aria-labelledby={`case-tab-${active}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          </AnimatePresence>

          <p className="mt-5 text-center text-sm text-gray-400 font-mono">
            {String(active + 1).padStart(2, "0")} / {String(CASE_STUDIES.length).padStart(2, "0")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
