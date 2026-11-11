"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import {
  COHORT1_STATS,
  COHORT1_PHOTOS,
  DEMO_DAY_RECORDING_URL,
} from "@/lib/constants";
import TestimonialCarousel from "./TestimonialCarousel";

export default function CohortHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="highlights" className="py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple-100/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-brand-purple-500 text-xs font-mono tracking-[0.2em] uppercase">
            Spring 2026 · Wrapped
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 text-gray-900">
            Cohort 1 <span className="text-gradient">Highlights</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {COHORT1_STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass glass-hover rounded-3xl p-6 md:p-8 text-center"
            >
              {"prefix" in stat && stat.prefix && (
                <div className="text-sm text-gray-500 font-medium">{stat.prefix}</div>
              )}
              <div className="text-3xl md:text-5xl font-bold text-gradient mb-3">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium text-sm md:text-base leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-lg md:text-2xl text-gray-700 max-w-4xl mx-auto mb-14"
        >
          Apollo alumni are actively building on 0G AI infrastructure.
        </motion.p>

        {/* Demo Day recording + photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          <motion.a
            href={DEMO_DAY_RECORDING_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-3xl bg-gray-900 text-white p-6 flex flex-col items-center justify-center gap-4 min-h-[220px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-full border-2 border-white/70 flex items-center justify-center group-hover:scale-110 group-hover:border-white transition-all">
              <Play size={24} className="ml-1 fill-white text-white" />
            </div>
            <span className="font-semibold text-lg relative">
              Demo Day recording
            </span>
          </motion.a>

          {COHORT1_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl overflow-hidden min-h-[220px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 right-4 text-white font-medium text-sm md:text-base">
                {photo.caption}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Cohort 1 founders <span className="text-gradient">say</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <TestimonialCarousel />
        </motion.div>
      </div>
    </section>
  );
}
