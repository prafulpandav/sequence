import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "It's Ahesan // Senior Creative Developer & Interaction Architect",
  description: "High-end 360° scrollytelling personal portfolio website featuring interactive canvas scrubbing, WebGL experiments, and kinetic design systems.",
  keywords: ["Creative Developer", "Next.js", "Framer Motion", "WebGL", "Canvas", "Awwwards", "Portfolio"],
  authors: [{ name: "It's Ahesan" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#08090c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#08090c] text-[#f3f4f6] selection:bg-cyan-500/25 selection:text-cyan-300 min-h-screen relative antialiased overflow-x-hidden">
        {/* Subtle noise grain texture */}
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Spring physics desktop cursor */}
        <CustomCursor />

        {/* Global floating navigation bar */}
        <Navbar />

        {/* Main page content */}
        {children}
      </body>
    </html>
  );
}
