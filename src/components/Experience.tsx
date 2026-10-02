"use client";

import React from "react";
import { EXPERIENCE_HISTORY } from "@/lib/constants";
import { Briefcase, ArrowUpRight } from "lucide-react";
import { soundFx } from "@/lib/sound";

export default function Experience() {
  return (
    <section
      id="experience-section"
      className="relative z-20 w-full bg-[#08090c] py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs tracking-widest uppercase mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Track Record</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase mb-16">
          Career &amp; Leadership
        </h2>

        <div className="space-y-6">
          {EXPERIENCE_HISTORY.map((exp, index) => (
            <div
              key={exp.period}
              onMouseEnter={() => soundFx.playHover()}
              className="glass-panel glass-panel-hover rounded-2xl p-8 transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="font-mono text-xs text-amber-400 font-medium">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                    {exp.role} <span className="text-zinc-500 font-light">// {exp.company}</span>
                  </h3>
                </div>
              </div>

              <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed mb-6 max-w-4xl">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
