"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Github } from "lucide-react";
import Image from "next/image";

// Custom X (Twitter) icon component
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface MentorSocials {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

interface Mentor {
  name: string;
  position: string;
  image: string;
  socials: MentorSocials;
}

const mentors: Mentor[] = [
  {
    name: "Michael Heinrich",
    position: "CEO at 0G Labs · Stanford Alumnus",
    image: "/michael.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/mheinrich/",
    },
  },
  {
    name: "Ming Wu",
    position: "CTO at 0G Labs",
    image: "/ming.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/ming-wu-7a598b1b/",
    },
  },
  {
    name: "Weisi Yuen",
    position: "CSO/CPO at 0G Labs · MIT MBA · Ex-McKinsey & Amazon",
    image: "/weisi.avif",
    socials: {},
  },
  {
    name: "Steven Willinger",
    position: "GP · xBuilders · Coinbase Ventures Lead · Ex-Google & Blockstream · Stanford GSB",
    image: "/steven.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/stevenwillinger/",
    },
  },
  {
    name: "Kun Peng",
    position: "GP · xBuilders · Founder Stanford Blockchain Accelerator & BASS · Advisor to 40+ Startups",
    image: "/kun.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/elkun/",
    },
  },
  {
    name: "Gil Rosen",
    position: "GP · xBuilders · Exited Founder (Eccella) · 50+ Angel Deals · Stanford GSB",
    image: "/gil.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/rosengil/",
    },
  },
  {
    name: "Jason Scott",
    position: "Accelerator Ops · Lead Google For Startups Worldwide · Stanford GSB & MIT",
    image: "/jason.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/jason-alexander-scott/",
    },
  },
  {
    name: "Arne Hartmann",
    position: "CFO/COO at 0G Labs · Stanford GSB",
    image: "/arne.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/arnehartmann/",
    },
  },
  {
    name: "Aytunç Yıldızlı",
    position: "CGO at 0G Labs · Ex-CEO Avax Foundation",
    image: "/aytunc.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/aytun%C3%A7-y%C4%B1ld%C4%B1zl%C4%B1-317533169",
    },
  },
  {
    name: "George",
    position: "Strategic Partnership Lead at 0G Labs · Venture Partner · Stanford School of Medicine",
    image: "/george.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/georgemvarghese/",
    },
  },
  {
    name: "Madeleine Charity",
    position: "Product Engineer at Privy",
    image: "/Madeleine.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/madeleine-charity/",
    },
  },
  {
    name: "Patrick Chang",
    position: "Founder & Managing Partner · Dispersion Capital",
    image: "/patrick.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/patricknchang/",
    },
  },
  {
    name: "Bon Sethi",
    position: "Field CTO at Google · Driving AI/ML & Web3 Innovation",
    image: "/bon.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/bon-s-12010929/",
    },
  },
  {
    name: "Peter Norvig",
    position: "AI Legend · Stanford · Ex-Google Director of Research",
    image: "/peter-norvig.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/pnorvig/",
    },
  },
  {
    name: "Paige Bailey",
    position: "Developer Experience Lead at Google DeepMind · Ex-GitHub",
    image: "/paige-bailey.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/dynamicwebpaige/",
    },
  },
  {
    name: "Bruno Rodrigues",
    position: "Cloud Architect & AI Ambassador at Google for Startups · GCP Architecture & Optimization",
    image: "/mentors/placeholder-bruno-rodrigues.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/bruno-rodrigues-81234888/",
    },
  },
  {
    name: "Anand Iyer",
    position: "Managing Partner · Canonical",
    image: "/anand-iyer.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/anandiyer/",
    },
  },
  {
    name: "Ben Biran",
    position: "Founder/CTO at ACRONYM · Ex-Director of Eng at Zapier & Plaid",
    image: "/ben.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/benbiran/",
    },
  },
  {
    name: "Scott Shi",
    position: "CTO & Co-founder · KiteAI",
    image: "/scott-shi.jpg",
    socials: {
      twitter: "https://x.com/scottshics",
    },
  },
  {
    name: "Marcus Hølland Eikeland",
    position: "Director of Programs at LUMO Labs · Accelerators & Fundraising",
    image: "/marcus.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/mhollandeikeland/",
    },
  },
  {
    name: "Alex",
    position: "Hack VC",
    image: "/alex.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/alexpack/",
    },
  },
  {
    name: "Dan Escow",
    position: "Founder · Talent Engineer",
    image: "/dan-escow.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/danuptop/",
    },
  },
  {
    name: "Margaret McCarthy",
    position: "GTM at Anthropic",
    image: "/margaret-mccarthy.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/margaret-mccarthy-70119255/",
    },
  },
  {
    name: "Jonathan King",
    position: "Head of Investments at Coinbase Ventures",
    image: "/jonathan-king.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/jonathanryanking/",
    },
  },
  {
    name: "Ali Maaz",
    position: "Head of WW Agentic AI GTM at AWS · Kiro, Q Developer, Strands & Bedrock AgentCore",
    image: "/ali-maaz.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/alimaaz/",
    },
  },
];

export default function Mentors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="mentors" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Subtle Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-purple-300 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-purple-200 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Meet Your <span className="text-gradient">Mentors</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Learn from industry leaders and Silicon Valley veterans who will guide you
            through your journey
          </p>
        </motion.div>

        {/* Mentors Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass glass-hover rounded-3xl p-8 text-center group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
            >
              {/* Profile Image */}
              <div className="mb-6 flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-brand-purple-500/20 group-hover:ring-brand-purple-500/40 transition-all">
                  {mentor.image.startsWith("/mentors/placeholder") ? (
                    <div className="w-full h-full bg-gradient-to-br from-brand-purple-200 to-brand-purple-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-brand-purple-500">
                        {mentor.name.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      loading="lazy"
                      sizes="128px"
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {mentor.name}
              </h3>

              {/* Position */}
              <p className="text-gray-600 mb-6 min-h-[48px]">{mentor.position}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                {mentor.socials.linkedin && (
                  <a
                    href={mentor.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {mentor.socials.twitter && (
                  <a
                    href={mentor.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <XIcon size={18} />
                  </a>
                )}
                {mentor.socials.github && (
                  <a
                    href={mentor.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-gray-500 hover:text-brand-purple-500 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
