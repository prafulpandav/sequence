import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full bg-[#08090c] min-h-screen">
      {/* 
        Component 1: The Sticky Scroller (500vh container)
        Encapsulates the HTML5 Canvas scrubbing & the Parallax Overlay (Component 2)
      */}
      <ScrollyCanvas />

      {/* 
        Component 3: The Work Grid (Glassmorphism project showcase)
        Placed directly after the scroll sequence finishes
      */}
      <Projects />

      {/* Career Track Record & Experience */}
      <Experience />

      {/* Contact & Footer Section */}
      <Footer />
    </main>
  );
}
