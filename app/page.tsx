import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleCloud from "@/components/3d/ParticleCloud";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg overflow-x-hidden">
      {/* Ambient 3D particle cloud — page-level background */}
      <ParticleCloud />

      {/* Grain texture overlay */}
      <GrainOverlay />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      <Navbar />

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Leadership />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
