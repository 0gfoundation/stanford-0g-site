"use client";

import { motion } from "framer-motion";
import { Presentation, GraduationCap, Calendar, MapPin, Hammer } from "lucide-react";
import { PROGRAM_PHASES, MILESTONES } from "@/lib/constants";

const milestoneIcons = {
  Presentation,
  GraduationCap,
  MapPin,
};

type Phase = (typeof PROGRAM_PHASES)[number];

export default function Timeline() {
  return (
    <section id="timeline" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            3-Month <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Three months, December through February. Four weeks of structured
            programming either side of a January build sprint, with Demo Day in
            the final week of February.
          </p>
        </motion.div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAM_PHASES.map((phase, index) => (
            <PhaseCard key={phase.label} phase={phase} index={index} />
          ))}
        </div>

        {/* Demo Day & Graduation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {MILESTONES.map((milestone, index) => {
              const Icon =
                milestoneIcons[
                  milestone.icon as keyof typeof milestoneIcons
                ];
              const date = (milestone as { date?: string }).date;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                  className="glass glass-hover rounded-3xl p-8 text-center flex-1 max-w-md group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center mx-auto mb-5 group-hover:from-brand-purple-500/30 group-hover:to-brand-purple-400/20 transition-all">
                    <Icon
                      className="text-brand-purple-500 group-hover:text-brand-purple-400 transition-colors"
                      size={28}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {milestone.title}
                  </h3>
                  {date && (
                    <div className="inline-flex items-center gap-2 bg-brand-purple-500/10 text-brand-purple-500 px-3 py-1.5 rounded-full text-sm font-medium mb-3">
                      <Calendar size={14} />
                      {date}
                    </div>
                  )}
                  <p className="text-gray-600">{milestone.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const isSprint = "sprint" in phase && phase.sprint;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`rounded-2xl p-7 flex flex-col ${
        isSprint
          ? "border border-dashed border-brand-purple-300 bg-brand-purple-100/20"
          : "glass border-t-4 border-t-brand-purple-500"
      }`}
    >
      <span
        className={`font-mono text-xs font-semibold tracking-[0.2em] uppercase ${
          isSprint ? "text-gray-500" : "text-brand-purple-500"
        }`}
      >
        {phase.label}
      </span>
      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-5">
        {phase.period}
        {"duration" in phase && phase.duration && (
          <span className="text-gray-500 font-medium"> · {phase.duration}</span>
        )}
      </h3>

      {isSprint ? (
        <div className="flex items-start gap-3">
          <Hammer className="text-brand-purple-400 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-gray-600 leading-relaxed">
            {"description" in phase && phase.description}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {"modules" in phase &&
            phase.modules?.map((mod) => {
              const highlight = "highlight" in mod && mod.highlight;
              return (
                <li key={mod.number} className="flex items-center gap-4">
                  <span
                    className={`font-mono text-sm w-6 flex-shrink-0 ${
                      highlight ? "text-brand-purple-500 font-bold" : "text-gray-400"
                    }`}
                  >
                    {mod.number}
                  </span>
                  <span
                    className={`text-gray-800 ${highlight ? "font-bold" : "font-medium"}`}
                  >
                    {mod.title}
                  </span>
                </li>
              );
            })}
        </ul>
      )}
    </motion.div>
  );
}
