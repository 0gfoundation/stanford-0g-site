"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Cpu, Database, ShieldCheck, Tag } from "lucide-react";

interface ModelSplitRow {
  job: string;
  model: string;
  why: string;
  onZeroG?: boolean;
}

interface CaseStudy {
  name: string;
  shortName: string;
  logo: string;
  category: string;
  website: string;
  usesZeroGFor: string;
  body: string;
  modelSplit?: ModelSplitRow[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Pulsar Money",
    shortName: "Pulsar Money",
    logo: "/projects/pulsar.png",
    category: "Multi-currency stablecoin money app",
    website: "https://pulsar.money",
    usesZeroGFor: "the AI assistant inside their app",
    body: "Every Pulsar Money user has an in-app assistant that handles notifications, analytics, and actions like transfers and payments. That assistant runs on 0G Private Computer.",
    modelSplit: [
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
    shortName: "UV Labs",
    logo: "/projects/uv-labs.png",
    category: "Agent-native trading products (Mosh Trade)",
    website: "https://uvlabs.ai",
    usesZeroGFor: "on-demand video generation",
    body: "Mosh creators need fast, reliable video generation directly within their workflow. UV Labs leverages 0G Private Computer to deliver instant, on-demand video creation, priced efficiently per clip. By offloading this heavy workload to specialized 0G compute, they bypass the bottlenecks of standard inference, giving creators seamless, high-performance generation exactly when they need it.",
  },
];

function CaseStudyCard({
  study,
  isInView,
  delay,
}: {
  study: CaseStudy;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group glass rounded-3xl p-6 md:p-10 relative overflow-hidden"
    >
      <span className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_90%_10%,rgba(146,0,225,0.08),transparent_55%)]" />
      <Cpu
        size={160}
        strokeWidth={1}
        className="hidden md:block absolute -top-6 -right-6 text-brand-purple-500/[0.06] pointer-events-none"
      />

      {/* Identity + link */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center overflow-hidden ring-1 ring-brand-purple-500/15 shadow-sm flex-shrink-0">
            <Image
              src={study.logo}
              alt={`${study.name} logo`}
              width={56}
              height={56}
              className="w-full h-full object-contain p-1.5"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{study.name}</h3>
        </div>
        <a
          href={study.website}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brand-purple-300/60 bg-white/60 text-sm font-medium text-gray-800 hover:border-brand-purple-400 hover:text-brand-purple-500 transition-colors"
        >
          View project
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-2 mt-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white/60 text-sm text-gray-700">
          <Tag size={14} className="text-gray-400" />
          {study.category}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-purple-300/60 bg-brand-purple-500/10 text-sm font-medium text-brand-purple-500">
          <Cpu size={14} />
          0G Compute (Private Computer)
        </span>
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg border border-gray-200 bg-white/60 text-sm text-gray-700">
          Apollo Cohort 1
        </span>
      </div>

      {/* What they use 0G for */}
      <div className="relative mt-6 rounded-2xl border-l-4 border-brand-purple-500 bg-brand-purple-500/[0.06] px-5 py-4 text-lg">
        <span className="font-semibold text-gradient">
          What {study.shortName} uses 0G for:
        </span>{" "}
        <span className="text-gray-800">{study.usesZeroGFor}.</span>
      </div>

      <p className="relative mt-6 text-gray-600 text-lg leading-relaxed">{study.body}</p>

      {/* Model split */}
      {study.modelSplit && (
        <div className="relative mt-8 rounded-2xl border border-gray-200 bg-white/70 overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-200 font-mono text-sm tracking-wide text-gray-700">
            <Database size={16} className="text-brand-purple-500" />
            MODEL SPLIT, BY JOB
          </div>
          <table className="w-full text-left text-sm md:text-base">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-gray-400">
                <th className="font-semibold px-5 py-3">Job</th>
                <th className="font-semibold px-5 py-3">Model</th>
                <th className="font-semibold px-5 py-3 hidden sm:table-cell">Why</th>
              </tr>
            </thead>
            <tbody>
              {study.modelSplit.map((row) => (
                <tr key={row.job} className="border-t border-gray-100 align-top">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {row.job}
                    <span className="sm:hidden block mt-1 font-normal text-gray-500">
                      {row.why}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {row.onZeroG ? (
                      <span className="inline-flex items-center gap-1.5 font-semibold text-brand-purple-500">
                        <ShieldCheck size={16} />
                        {row.model}
                      </span>
                    ) : (
                      <span className="text-gray-800">{row.model}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.article>
  );
}

export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="built-on-0g" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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

        <div className="flex flex-col gap-8">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard
              key={study.name}
              study={study}
              isInView={isInView}
              delay={0.15 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
