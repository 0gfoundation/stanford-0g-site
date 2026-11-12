"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="apply" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-300 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-200 blur-[120px]"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Ready to <span className="text-gradient">Accelerate</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Cohort 2 applications close November 15. Teams are accepted on a
            rolling basis, so the earlier you apply, the better.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 text-white px-10 py-5 rounded-full font-medium text-xl hover:shadow-2xl hover:shadow-brand-purple-500/40 transition-all"
            >
              Apply Now
              <ArrowRight size={24} />
            </Link>
          </motion.div>

          {/* Contact */}
          <p className="text-gray-500 mt-8">
            Questions?{" "}
            <a
              href="mailto:apollo@0g.ai"
              className="text-brand-purple-500 hover:text-brand-purple-400 transition-colors font-medium"
            >
              apollo@0g.ai
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
