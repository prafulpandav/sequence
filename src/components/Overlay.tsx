"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Terminal, Code2, Layers } from "lucide-react";
import { soundFx } from "@/lib/sound";

interface OverlayProps {
  scrollProgress: number;
  angle?: number;
}

/**
 * Calculates opacity and parallax vertical offset for a section given its active scroll window.
 */
function getParallaxStyles(
  progress: number,
  start: number,
  peakStart: number,
  peakEnd: number,
  end: number
) {
  let opacity = 0;
  let translateY = 30; // Default entering offset

  if (progress >= start && progress < peakStart) {
    // Fading & sliding in
    const ratio = (progress - start) / (peakStart - start);
    opacity = ratio;
    translateY = 30 * (1 - ratio);
  } else if (progress >= peakStart && progress <= peakEnd) {
    // Fully visible
    opacity = 1;
    // Gentle parallax float during peak
    const peakRatio = (progress - peakStart) / (peakEnd - peakStart);
    translateY = -15 * peakRatio;
  } else if (progress > peakEnd && progress <= end) {
    // Fading & sliding out upwards
    const ratio = (progress - peakEnd) / (end - peakEnd);
    opacity = 1 - ratio;
    translateY = -15 - 30 * ratio;
  } else {
    opacity = 0;
    translateY = progress < start ? 30 : -45;
  }

  return { opacity, translateY };
}

export default function Overlay({ scrollProgress, angle }: OverlayProps) {
  const currentAngle = angle ?? Math.round(scrollProgress * 360);

  // Section 1: Hero (Center, 0° - 90°)
  const s1 = getParallaxStyles(scrollProgress, -0.05, 0.0, 0.18, 0.28);

  // Section 2: Left aligned (90° - 180°)
  const s2 = getParallaxStyles(scrollProgress, 0.20, 0.28, 0.46, 0.54);

  // Section 3: Right aligned (180° - 270°)
  const s3 = getParallaxStyles(scrollProgress, 0.46, 0.54, 0.72, 0.80);

  // Section 4: Scroll transition to Projects (270° - 360°)
  const s4 = getParallaxStyles(scrollProgress, 0.72, 0.80, 0.98, 1.05);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none overflow-hidden">
      {/* Dynamic Telemetry / Status Bar (Top Right) */}
      <div className="absolute top-24 right-6 md:right-12 z-20 flex items-center gap-3 font-mono text-[11px] tracking-wider text-zinc-300 glass-panel px-4 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-400 font-bold">{currentAngle}&deg; 360&deg; ROTATION</span>
        <span className="text-zinc-600">|</span>
        <span>SCRUB: {Math.round(scrollProgress * 100)}%</span>
      </div>

      {/* SECTION 1 (0% scroll): "My Name. Creative Developer." (Center) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-transform duration-75 ease-out"
        style={{
          opacity: s1.opacity,
          transform: `translate3d(0, ${s1.translateY}px, 0)`,
          pointerEvents: s1.opacity > 0.1 ? "auto" : "none",
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass-panel border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Portfolio &bull; 2026</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase drop-shadow-2xl">
          It's Ahesan
        </h1>

        <p className="mt-4 sm:mt-6 text-lg sm:text-2xl md:text-3xl font-light text-zinc-300 tracking-wide max-w-2xl text-glow-cyan">
          Creative Developer &amp; Technical Director
        </p>

        <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-mono tracking-widest uppercase">
          Specializing in High-Performance Scroll &amp; WebGL
        </p>

        {/* Scroll cue mouse pill */}
        <div
          className="absolute bottom-10 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 6) }}
        >
          <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
            Scroll to Scrub Frame Sequence
          </span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2 (30% scroll): "I build digital experiences." (Left aligned) */}
      <div
        className="absolute inset-y-0 left-6 sm:left-12 md:left-24 max-w-xl flex flex-col justify-center transition-transform duration-75 ease-out"
        style={{
          opacity: s2.opacity,
          transform: `translate3d(0, ${s2.translateY}px, 0)`,
          pointerEvents: s2.opacity > 0.1 ? "auto" : "none",
        }}
      >
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          <Terminal className="w-4 h-4" />
          <span>01 / Philosophy</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          I build digital experiences.
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-6">
          Architecting fluid web experiences where visual fidelity meets sub-millisecond execution. Every transition, shader, and frame is calibrated to captivate.
        </p>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
          <div>
            <div className="text-2xl font-bold text-cyan-400">60+ FPS</div>
            <div className="text-zinc-400 text-[11px]">Consistent Framerate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-400">12+ Awards</div>
            <div className="text-zinc-400 text-[11px]">Awwwards &amp; FWA Honors</div>
          </div>
        </div>
      </div>

      {/* SECTION 3 (60% scroll): "Bridging design and engineering." (Right aligned) */}
      <div
        className="absolute inset-y-0 right-6 sm:right-12 md:right-24 max-w-xl flex flex-col justify-center text-right items-end transition-transform duration-75 ease-out"
        style={{
          opacity: s3.opacity,
          transform: `translate3d(0, ${s3.translateY}px, 0)`,
          pointerEvents: s3.opacity > 0.1 ? "auto" : "none",
        }}
      >
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-widest uppercase mb-3">
          <span>02 / Craft</span>
          <Layers className="w-4 h-4" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          Bridging design and engineering.
        </h2>

        <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-6">
          Transforming complex computational concepts into tactile, intuitive digital interactions. Uncompromising attention to typography, spatial rhythm, and canvas render pipelines.
        </p>

        <div className="flex flex-wrap justify-end gap-2 max-w-md">
          {["Next.js 14", "Framer Motion", "Tailwind CSS", "Canvas 2D", "WebGL / GLSL", "TypeScript"].map((tech) => (
            <span
              key={tech}
              onMouseEnter={() => soundFx.playHover()}
              className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 4 (85% - 95% scroll): Lead-in to Project Showcase */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-transform duration-75 ease-out"
        style={{
          opacity: s4.opacity,
          transform: `translate3d(0, ${s4.translateY}px, 0)`,
          pointerEvents: s4.opacity > 0.1 ? "auto" : "none",
        }}
      >
        <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">
          <Code2 className="w-4 h-4" />
          <span>03 / Selected Works</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase mb-4">
          Featured Projects
        </h2>

        <p className="text-zinc-400 max-w-lg text-sm sm:text-base font-light mb-8">
          Explore curated case studies, generative experiments, and production design systems below.
        </p>

        <a
          href="#projects-section"
          onMouseEnter={() => soundFx.playHover()}
          onClick={() => soundFx.playClick()}
          className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white font-mono text-xs tracking-wider border border-white/15 hover:border-cyan-400/50 transition-all duration-300 shadow-glow-cyan"
        >
          <span>VIEW CASE STUDIES</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </div>
  );
}
