import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProgramStats from "@/components/ProgramStats";
import CohortHighlights from "@/components/CohortHighlights";
import ProgramOverview from "@/components/ProgramOverview";
import Perks from "@/components/Perks";
import Timeline from "@/components/Timeline";
import Mentors from "@/components/Mentors";
import Projects from "@/components/Projects";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProgramStats />
      <ProgramOverview />
      <CohortHighlights />
      <Projects />
      <CaseStudies />
      <Perks />
      <Mentors />
      <FAQ />
      <Timeline />
      <CTA />
      <Footer />
    </main>
  );
}
