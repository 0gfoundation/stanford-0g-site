"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

type FAQEntry = {
  question: string;
  answer: React.ReactNode;
};

const FAQ_DATA: FAQEntry[] = [
  {
    question: "Who is the 0G Apollo Program for?",
    answer:
      "The program is designed for ambitious AI founders and builders creating revenue-generating products. It is ideal for early-stage to growth stage teams ready to build and integrate with 0G\u2019s infrastructure, and achieve product market fit and go to market traction. Only 10 teams will be selected globally for this intensive cohort.",
  },
  {
    question: "Who is xBuilders?",
    answer:
      (
      <>
        xBuilders is comprised of veteran founders, operators, and investors
        from Google, Salesforce, Capital One, and Coinbase, who have extensive
        experience running accelerators across AI, Fintech, and Blockchain.
        The team teaches the MS&amp;E447 AI Sovereignty &amp; Entrepreneurship
        course at Stanford University’s School of Engineering, runs the
        Stanford Openlab Open Source AI Seminar, and has run the Stanford
        Blockchain Accelerator for the last <strong>5</strong> years, helping{" "}
        <strong>85+</strong> projects collectively raise over{" "}
        <strong>$1B</strong> from leading funds with multiple unicorn
        successes. The xBuilders team has also run AI accelerators for
        Cornell/IC3, and has extensive experience building and operating the
        Google for Startups accelerator program for dozens of cohorts across
        AI, innovation, and software technologies. Accelerator programming is
        based on Stanford University’s startup methodologies and courses, and
        the extensive experience of the team as founders, operators, and
        investors running accelerators for SBA, Google for Startups, StartX,
        and Cardinal Ventures.
      </>
    ),
  },
  {
    question: "What are the requirements to apply?",
    answer:
      "Teams actively building AI projects with a clear path to revenue and a validated need and market, and available for the 3-month program.",
  },
  {
    question: "Do we have to be exclusive to the 0G network?",
    answer:
      "No strict exclusivity is required upfront, but the program is built around helping teams launch and scale on 0G infrastructure. Accepted teams receive deep integration support, technical mentorship from 0G engineers, and incentives tied to building/deploying on 0G (e.g., funding calibrated to roadmap and traction on the network). It\u2019s not a lock-in, but the value including funding, credits, tools, and mentorship is heavily geared toward projects that commit to and succeed on 0G. Hybrid approaches may be considered if they meaningfully leverage 0G\u2019s strengths (compute and storage).",
  },
  {
    question: "Is the program remote?",
    answer:
      "The 3-month program is primarily remote, except for an in-person graduation at Stanford towards the end of the program.",
  },
  {
    question: "What is the application deadline?",
    answer:
      "Applications close on November 11, 2026. Applicants are reviewed and accepted on a rolling basis, so apply as early as you can.",
  },
  {
    question: "When does Cohort 2 start?",
    answer:
      "Cohort 2 kicks off in December 2026 — the exact date is to be confirmed.",
  },
  {
    question: "Are applications open?",
    answer: <ApplicationsOpenAnswer />,
  },
  {
    question: "What happened with Cohort 1?",
    answer: (
      <>
        Cohort 1 wrapped up in July 2026: 10 teams graduated at Stanford,
        alumni raised US$1.5M within 30 days of graduation, and every team
        presented at Demo Day. Check out the{" "}
        <a
          href="#highlights"
          className="text-brand-purple-500 hover:text-brand-purple-400 font-medium underline underline-offset-4 transition-colors"
        >
          Cohort 1 highlights
        </a>{" "}
        for the full story, photos, and the Demo Day recording.
      </>
    ),
  },
];

function ApplicationsOpenAnswer() {
  return (
    <>
      Applications are open now.{" "}
      <Link
        href="/apply"
        className="text-brand-purple-500 hover:text-brand-purple-400 font-medium underline underline-offset-4 transition-colors"
      >
        Apply to Cohort 2
      </Link>{" "}
      before November 11, 2026. Teams are reviewed and accepted on a rolling
      basis, so early applications have the best chance.
    </>
  );
}

function FAQItem({
  item,
  index,
  isInView,
}: {
  item: (typeof FAQ_DATA)[0];
  index: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => {
          if (!isOpen) track("faq_open", { question: item.question });
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-purple-500/5 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">
          {item.question}
        </span>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center flex-shrink-0">
          {isOpen ? (
            <Minus className="text-brand-purple-500" size={18} />
          ) : (
            <Plus className="text-brand-purple-500" size={18} />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-gray-600 leading-relaxed">
          {item.answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about the program
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
