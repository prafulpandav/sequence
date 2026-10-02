"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Sparkles, Award, ArrowUpRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/constants";
import { soundFx } from "@/lib/sound";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const categories = ["ALL", "WEBGL & 3D", "DESIGN SYSTEMS", "SPATIAL UI"];

  const filteredProjects = activeFilter === "ALL"
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => {
        if (activeFilter === "WEBGL & 3D") return p.tags.includes("Three.js") || p.tags.includes("GLSL Shaders");
        if (activeFilter === "DESIGN SYSTEMS") return p.tags.includes("Design System") || p.category.includes("System");
        if (activeFilter === "SPATIAL UI") return p.category.includes("Spatial") || p.tags.includes("Canvas 2D");
        return true;
      });

  return (
    <section
      id="projects-section"
      className="relative z-20 w-full min-h-screen bg-[#08090c] py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-white/5"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
              Featured Case Studies
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(cat);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-white text-black border-white shadow-glow-cyan"
                    : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modern 2x2 Glassmorphic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => soundFx.playHover()}
              className="group relative rounded-3xl overflow-hidden glass-panel glass-panel-hover p-8 flex flex-col justify-between"
            >
              {/* Top Card Bar */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-zinc-400">0{idx + 1} //</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">{project.year}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-4 flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </h3>

                {/* Project Narrative */}
                <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Honors / Metrics Badge */}
                {project.stats && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono mb-6">
                    <Award className="w-3.5 h-3.5" />
                    <span>{project.stats}</span>
                  </div>
                )}
              </div>

              {/* Tags & Action Links */}
              <div>
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] border border-white/[0.06] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="inline-flex items-center gap-2 text-xs font-mono text-white hover:text-cyan-400 transition-colors uppercase tracking-wider"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Experience</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
