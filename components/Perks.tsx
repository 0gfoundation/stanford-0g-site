"use client";

import { motion, useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import Image from "next/image";
import { Lock, Check, ArrowUpRight, Mail } from "lucide-react";

interface Perk {
  partner: string;
  index: string;
  logo: string;
  value: string;
  qualifier: string;
  headline: string;
  points?: string[];
  steps?: string[];
}

const PARTNER_PERKS: Perk[] = [
  {
    partner: "Hashlock",
    index: "01",
    logo: "/hashlock.png",
    value: "30% off",
    qualifier: "Hashlock list price · every audit, any size",
    headline: "Security audits at cohort pricing",
    points: [
      "Direct line and a 24h quote",
      "Free readiness kit and office hours",
    ],
  },
  {
    partner: "Luna PR",
    index: "02",
    logo: "/luna-pr.png",
    value: "20% off",
    qualifier: "all packages",
    headline: "PR packages from Luna PR",
  },
  {
    partner: "Gaea Ventures",
    index: "03",
    logo: "/gaea-ventures.png",
    value: "20% off",
    qualifier: "all packages",
    headline: "Packages from Gaea Ventures",
  },
  {
    partner: "QuillAudits",
    index: "04",
    logo: "/quillaudits.png",
    value: "$20,000",
    qualifier: "in credits",
    headline: "Security audits at cohort pricing",
    points: [
      "$15,000 in QuillAudits credits",
      "$5,000 in QuillShield credits",
    ],
  },
  {
    partner: "CertiK",
    index: "05",
    logo: "/certik.png",
    value: "20% off",
    qualifier: "on all CertiK services",
    headline: "Audits, pen tests, compliance, AML & KYC at cohort pricing",
    points: [
      "Fast-tracked priority audit & pen-test slots",
      "Dedicated support from CertiK's partner customer success team",
      "Access to CertiK's Institution Resource Club",
    ],
  },
];

interface AlumniPerk {
  company: string;
  logo: string;
  website: string;
  websiteLabel: string;
  oneLiner: string;
  value: string;
  detail: string;
  logoWide?: boolean;
}

const ALUMNI_PERKS: AlumniPerk[] = [
  {
    company: "Om Labs",
    logo: "/projects/om-labs.jpeg",
    website: "https://omlabs.xyz",
    websiteLabel: "omlabs.xyz",
    oneLiner: "AI QA engineer that reviews, tests, monitors, and fixes software",
    value: "10,000 credits",
    detail: "on the platform, plus 50% off all plans",
  },
  {
    company: "Pulsar Money",
    logo: "/projects/pulsar.png",
    website: "https://pulsar.money",
    websiteLabel: "pulsar.money",
    oneLiner: "Europe\u2019s first crypto-native neobank",
    value: "50% off",
    detail: "subscription plans, plus cashback rewards",
  },
  {
    company: "UV Labs",
    logo: "/projects/uv-labs.png",
    website: "https://uvlabs.ai",
    websiteLabel: "uvlabs.ai",
    oneLiner: "Data + infra to train safer financial LLMs",
    value: "$8,000",
    detail: "to launch a token on Mosh.trade, with help raising from liquid funds",
  },
  {
    company: "Walnut AI",
    logo: "/projects/walnut.png",
    logoWide: true,
    website: "https://walnut.ai",
    websiteLabel: "walnut.ai",
    oneLiner: "The first agentic professional network",
    value: "3 months free",
    detail: "premium membership for every Cohort 2 founder",
  },
  {
    company: "DSALTA",
    logo: "/projects/dsalta.png",
    logoWide: true,
    website: "https://www.dsalta.com",
    websiteLabel: "dsalta.com",
    oneLiner: "AI compliance agents for 50+ frameworks",
    value: "30% off",
    detail: "your first framework, plus a free compliance planning session",
  },
  {
    company: "Mighty",
    logo: "/projects/mighty.png",
    website: "https://trymighty.ai",
    websiteLabel: "trymighty.ai",
    oneLiner: "Multimodal AI fraud detection in just one line of code",
    value: "1st month free",
    detail: "plus up to 50% off months 2-3 for prompt injection guard (text/image/audio)",
  },
];

function GroupHeading({
  title,
  subtitle,
  isInView,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  isInView: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="mb-6"
    >
      <div className="flex items-center gap-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">
          {title}
        </h3>
        <span className="flex-1 h-px bg-gradient-to-r from-brand-purple-300/70 via-brand-purple-200/40 to-transparent" />
      </div>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </motion.div>
  );
}

function PerkCard({
  perk,
  isInView,
  delay,
}: {
  perk: Perk;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="group glass glass-hover rounded-3xl overflow-hidden relative"
    >
      {/* Radial spotlight behind the value */}
      <span className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(146,0,225,0.10),transparent_60%)]" />
      {/* Faint index */}
      <span className="hidden md:block absolute top-6 left-6 text-xs text-brand-purple-300 font-mono">
        {perk.index}
      </span>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center p-8">
        {/* Zone A — partner identity */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden ring-1 ring-brand-purple-500/10 group-hover:ring-brand-purple-500/30 shadow-sm transition-all">
            <Image
              src={perk.logo}
              alt={`${perk.partner} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain p-2.5"
            />
          </div>
          <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
            {perk.partner}
          </span>
        </div>

        {/* Zone B — value + headline + points (+ stepper) */}
        <div className="text-center md:text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3 gap-y-1 justify-center md:justify-start">
            <span className="text-4xl md:text-5xl font-bold text-gradient leading-none">
              {perk.value}
            </span>
            <span className="text-base text-gray-500">
              {perk.qualifier}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mt-2">
            {perk.headline}
          </h3>
          {perk.points && (
            <ul className="space-y-1.5 mt-3 inline-block text-left">
              {perk.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-gray-600 text-sm"
                >
                  <Check
                    size={16}
                    className="text-brand-purple-400 mt-0.5 flex-shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Optional program flow stepper */}
          {perk.steps && (
            <div className="flex items-start mt-6">
              {perk.steps.map((step, i) => (
                <Fragment key={step}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView ? { opacity: 1, scale: 1 } : {}
                    }
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex flex-col items-center w-10 md:w-[72px] flex-shrink-0"
                  >
                    <span
                      title={step}
                      className="w-7 h-7 rounded-full bg-brand-purple-500/15 flex items-center justify-center text-xs font-semibold text-brand-purple-500"
                    >
                      {i + 1}
                    </span>
                    <span className="hidden md:block text-[10px] text-gray-400 mt-1.5 text-center leading-tight">
                      {step}
                    </span>
                  </motion.div>
                  {i < perk.steps!.length - 1 && (
                    <span className="flex-1 h-px mt-3.5 bg-gradient-to-r from-brand-purple-300/60 to-brand-purple-200/40" />
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Perks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="perks" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated orbs (same vocabulary as CTA/Mentors) */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-300 blur-[150px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-200 blur-[120px]"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Exclusive Perks for <span className="text-gradient">Apollo Teams</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            What our partners offer Apollo teams, and what Cohort 1 founders
            now offer the next cohort.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gradient-border text-sm font-medium text-brand-purple-500">
              <Lock size={14} />
              Apollo cohort only
              <span className="h-1.5 w-1.5 rounded-full bg-brand-purple-500" />
            </span>
          </div>
        </motion.div>

        {/* Partner perks */}
        <GroupHeading title="Partner perks" isInView={isInView} delay={0.1} />
        <div className="flex flex-col gap-6">
          {PARTNER_PERKS.map((perk, index) => (
            <PerkCard
              key={perk.partner}
              perk={perk}
              isInView={isInView}
              delay={index * 0.1}
            />
          ))}

          {/* More partner perks at kickoff */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl px-6 py-4 border border-dashed border-brand-purple-300 bg-brand-purple-100/20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left"
          >
            <span className="font-semibold text-brand-purple-500 whitespace-nowrap">
              More unlocks at kickoff
            </span>
            <span className="text-gray-600 text-sm">
              Cloud credits, AI API credits, legal, banking and wallet
              infrastructure.
            </span>
          </motion.div>
        </div>

        {/* Alumni perks */}
        <div className="mt-20">
          <GroupHeading
            title="From Cohort 1 alumni"
            subtitle="The Apollo flywheel: our graduates now offer perks to the next cohort."
            isInView={isInView}
            delay={0.3}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALUMNI_PERKS.map((perk, index) => (
              <motion.div
                key={perk.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group glass glass-hover rounded-2xl p-6 flex flex-col relative overflow-hidden"
              >
                <span className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_15%,rgba(146,0,225,0.08),transparent_55%)]" />

                {/* Identity row */}
                <div className="relative flex items-start gap-3">
                  <div
                    className={`h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden ring-1 ring-brand-purple-500/10 group-hover:ring-brand-purple-500/30 shadow-sm transition-all flex-shrink-0 ${
                      perk.logoWide ? "w-24 px-2" : "w-11 p-1"
                    }`}
                  >
                    <Image
                      src={perk.logo}
                      alt={`${perk.company} logo`}
                      width={perk.logoWide ? 96 : 44}
                      height={44}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-gray-900 truncate">
                        {perk.company}
                      </span>
                      <span className="text-[11px] font-medium text-brand-purple-500 bg-brand-purple-500/10 px-2.5 py-0.5 rounded-full flex-shrink-0">
                        Cohort 1
                      </span>
                    </div>
                    <p
                      title={perk.oneLiner}
                      className="text-sm text-gray-500 leading-snug mt-0.5 line-clamp-2 min-h-[2.5rem]"
                    >
                      {perk.oneLiner}
                    </p>
                  </div>
                </div>

                {/* Perk */}
                <div className="relative mt-5 flex-1">
                  <div className="text-2xl md:text-3xl font-bold text-gradient leading-tight">
                    {perk.value}
                  </div>
                  <p className="text-gray-700 mt-1.5 leading-relaxed">{perk.detail}</p>
                </div>

                {/* Link */}
                <a
                  href={perk.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-5 inline-flex items-center gap-1 font-mono text-xs text-brand-purple-500 hover:text-brand-purple-400 transition-colors self-start"
                >
                  {perk.websiteLabel}
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </a>
              </motion.div>
            ))}

            {/* Add yours */}
            <motion.a
              href="mailto:apollo@0g.ai?subject=Cohort%201%20alumni%20perk"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + ALUMNI_PERKS.length * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-6 border border-dashed border-brand-purple-300 bg-brand-purple-100/20 hover:bg-brand-purple-100/40 transition-colors flex flex-col items-center justify-center text-center gap-3 min-h-[220px]"
            >
              <span className="w-11 h-11 rounded-xl bg-white/80 flex items-center justify-center ring-1 ring-brand-purple-500/15">
                <Mail size={20} className="text-brand-purple-500" />
              </span>
              <span className="text-lg font-semibold text-brand-purple-500">
                More alumni perks coming
              </span>
              <span className="text-sm text-gray-600 leading-relaxed">
                Cohort 1 founder? Add yours at
                <br />
                <span className="font-medium text-gray-800">apollo@0g.ai</span>
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
