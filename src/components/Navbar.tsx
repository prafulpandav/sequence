"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, Compass } from "lucide-react";
import { soundFx } from "@/lib/sound";

export default function Navbar() {
  const [soundActive, setSoundActive] = useState(false);
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const newState = soundFx.toggleSound();
    setSoundActive(newState);
  };

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 sm:px-8 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-6 px-6 py-3 rounded-full glass-panel border border-white/10 shadow-glass backdrop-blur-xl max-w-5xl w-full">
        {/* Brand / Logo */}
        <a
          href="#"
          onMouseEnter={() => soundFx.playHover()}
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-2.5 text-white font-bold tracking-tighter text-sm uppercase group"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-amber-500 flex items-center justify-center p-[1px]">
            <div className="w-full h-full rounded-full bg-[#08090c] flex items-center justify-center group-hover:bg-transparent transition-colors">
              <span className="text-[10px] font-mono text-cyan-400 group-hover:text-black font-black">
                IA
              </span>
            </div>
          </div>
          <span className="hidden sm:inline font-mono tracking-wider text-xs">
            IT'S AHESAN
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-zinc-400">
          <a
            href="#scrolly-container"
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-white transition-colors"
          >
            00 // EXPERIENCE
          </a>
          <a
            href="#projects-section"
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-white transition-colors"
          >
            01 // WORKS
          </a>
          <a
            href="#experience-section"
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-white transition-colors"
          >
            02 // TIMELINE
          </a>
          <a
            href="#contact-section"
            onMouseEnter={() => soundFx.playHover()}
            className="hover:text-white transition-colors"
          >
            03 // CONTACT
          </a>
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Live Status indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE</span>
          </div>

          {/* Clock */}
          {timeStr && (
            <div className="hidden sm:block text-zinc-400 text-[11px] px-2">
              {timeStr}
            </div>
          )}

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => soundFx.playHover()}
            aria-label="Toggle Synthesizer Sound"
            className={`p-2 rounded-full border transition-all duration-300 ${
              soundActive
                ? "bg-cyan-400/20 text-cyan-400 border-cyan-400/40 shadow-glow-cyan"
                : "bg-white/5 text-zinc-400 border-white/10 hover:text-white"
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
