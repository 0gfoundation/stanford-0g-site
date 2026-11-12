import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import TallyEmbed from "@/components/TallyEmbed";

export const metadata: Metadata = {
  title: "Apply to Apollo Cohort II - 0G Apollo Program",
  description:
    "Apply to Apollo Cohort II, the three-month AI accelerator from xBuilders and 0G. Up to 10 teams, December through February, in-person graduation on Stanford campus.",
  alternates: { canonical: "https://apollo.0g.ai/apply" },
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen relative">
      {/* Top bar */}
      <header className="max-w-3xl mx-auto px-6 pt-6 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="0G Apollo Program home">
          <Image
            src="/apollo.png"
            alt="0G Apollo Program"
            width={200}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-purple-500 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to site
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Apply to Apollo <span className="text-gradient">Cohort II</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Applications close November 15, 2026. Teams are accepted on a rolling
          basis. Questions?{" "}
          <a
            href="mailto:apollo@0g.ai"
            className="text-brand-purple-500 hover:text-brand-purple-400 font-medium transition-colors"
          >
            apollo@0g.ai
          </a>
        </p>

        <div className="glass rounded-3xl p-4 md:p-8">
          <TallyEmbed />
        </div>
      </div>
    </main>
  );
}
