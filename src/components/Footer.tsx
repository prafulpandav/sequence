"use client";

import React, { useState } from "react";
import { Mail, Check, ArrowUp, Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { soundFx } from "@/lib/sound";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "ahesan4@gmail.com";

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact-section"
      className="relative z-20 w-full bg-[#08090c] pt-24 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">
        {/* Call to action headline */}
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] max-w-5xl mb-8">
            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-500">unforgettable.</span>
          </h2>

          <p className="text-zinc-400 text-lg sm:text-xl font-light max-w-2xl mb-12">
            Currently accepting select creative technology engagements, interactive design system consulting, and cinematic web experiences for 2026.
          </p>

          {/* Email Copy Trigger */}
          <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => soundFx.playHover()}
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl glass-panel glass-panel-hover border border-white/10 text-white font-mono text-sm tracking-wider uppercase group"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              className="flex items-center justify-center gap-2 px-8 py-5 rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300 font-mono text-sm font-semibold tracking-wider uppercase transition-all shadow-glow-cyan"
            >
              <span>Send Message</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-20 mt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} It's Ahesan &bull; Engineered with Next.js &amp; Framer Motion
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
