"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Code, Network, Presentation } from "lucide-react";
import Image from "next/image";
import { BENEFITS } from "@/lib/constants";

const iconMap = {
  Users,
  Code,
  Network,
  Presentation,
};

export default function ProgramOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              The Premier <span className="text-gradient">AI Accelerator</span>
            </h2>
            <p className="text-gray-600 text-lg mb-5 leading-relaxed">
              xBuilders, led by pioneers from Stanford, partners with 0G to bring
              you an intensive program designed to help founders build, launch,
              and scale projects with the 0G AI infrastructure. Get hands-on support
              from industry experts and access to a world-class network,
              including the Stanford community.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Cohort 2 will be a three-month accelerator for up to 10 startups
              building on the 0G AI infrastructure, running December through
              February, and closing with an in-person
              graduation on Stanford campus.
            </p>

            {/* Partner Logos */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="glass px-5 py-3 rounded-xl flex items-center justify-center">
                  <Image
                    src="/0G-Logo-Purple_Hero.svg"
                    alt="0G"
                    width={80}
                    height={36}
                    className="h-7 w-auto"
                  />
                </div>
                <span className="text-gray-400 text-xl">×</span>
                <a
                  href="https://www.xbuilders.vc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-5 py-3 rounded-xl flex items-center justify-center hover:shadow-md transition-shadow"
                >
                  <Image
                    src="/xbuilders-logo.png"
                    alt="xBuilders"
                    width={1408}
                    height={398}
                    className="h-8 w-auto"
                  />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Content - What You Get */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {BENEFITS.map((benefit, index) => {
              const Icon = iconMap[benefit.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass glass-hover rounded-2xl p-6 text-center group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-brand-purple-500/20 to-brand-purple-400/10 flex items-center justify-center mx-auto mb-4 group-hover:from-brand-purple-500/30 group-hover:to-brand-purple-400/20 transition-all">
                    <Icon
                      className="text-brand-purple-500 group-hover:text-brand-purple-400 transition-colors"
                      size={28}
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
