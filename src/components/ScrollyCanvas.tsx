"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { TOTAL_FRAMES, getFramePath } from "@/lib/constants";
import Overlay from "./Overlay";

interface ScrollyCanvasProps {
  onLoadComplete?: () => void;
}

export default function ScrollyCanvas({ onLoadComplete }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Framer Motion scroll tracker linked to the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isFlippedRef = useRef<boolean>(false);

  /**
   * Continuous 360° rotation mapping:
   * 0° - 90° (0.00 - 0.25): 0 -> 59 (turns Right)
   * 90° - 180° (0.25 - 0.50): 59 -> 0 (turns back to Center)
   * 180° - 270° (0.50 - 0.75): 0 -> 59 Mirrored (turns Left)
   * 270° - 360° (0.75 - 1.00): 59 -> 0 Mirrored (turns back to Center)
   */
  const calculate360 = (progress: number) => {
    const p = Math.max(0, Math.min(1, progress));
    const angle = Math.round(p * 360);
    let frameIndex = 0;
    let isFlipped = false;

    if (p <= 0.25) {
      const sub = p / 0.25;
      frameIndex = Math.round(sub * (TOTAL_FRAMES - 1));
      isFlipped = false;
    } else if (p <= 0.50) {
      const sub = (p - 0.25) / 0.25;
      frameIndex = Math.round((1 - sub) * (TOTAL_FRAMES - 1));
      isFlipped = false;
    } else if (p <= 0.75) {
      const sub = (p - 0.50) / 0.25;
      frameIndex = Math.round(sub * (TOTAL_FRAMES - 1));
      isFlipped = true;
    } else {
      const sub = (p - 0.75) / 0.25;
      frameIndex = Math.round((1 - sub) * (TOTAL_FRAMES - 1));
      isFlipped = true;
    }

    frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    return { angle, frameIndex, isFlipped };
  };

  /**
   * High performance Canvas draw function using object-fit: cover logic.
   * Handles Retina / HiDPI screens crisply via devicePixelRatio and horizontal mirror.
   */
  const renderFrame = useCallback((frameIndex: number, isFlipped: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    // Nearest loaded frame fallback
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    // Adjust canvas buffer to match physical device pixels
    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // object-fit: cover math
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const hRatio = displayWidth / imgWidth;
    const vRatio = displayHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderWidth = imgWidth * ratio;
    const renderHeight = imgHeight * ratio;
    const offsetX = (displayWidth - renderWidth) / 2;
    const offsetY = (displayHeight - renderHeight) / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    if (isFlipped) {
      ctx.translate(displayWidth, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

    ctx.restore();
    currentFrameRef.current = frameIndex;
    isFlippedRef.current = isFlipped;
  }, []);

  /**
   * Preload all sequence images into memory.
   * Renders the first frame immediately as soon as frame 0 is ready.
   */
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Primary path: /sequence/frame_XX_delay-0.067s.png
      const primarySrc = getFramePath(i, "/sequence");
      img.src = primarySrc;

      let attempts = 0;
      img.onerror = () => {
        attempts++;
        if (attempts === 1) {
          img.src = getFramePath(i, ""); // Try root/relative
        } else if (attempts === 2) {
          img.src = primarySrc.replace(".png", ".webp"); // Try webp
        } else {
          // If all failed, count as handled so preloader does not stall
          if (!isMounted) return;
          count++;
          setLoadedCount(count);
          if (count >= TOTAL_FRAMES) {
            setIsPreloaded(true);
            onLoadComplete?.();
          }
        }
      };

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);

        // Render frame 0 immediately to prevent any initial blank state
        if (i === 0) {
          renderFrame(0);
        }

        if (count >= TOTAL_FRAMES) {
          setIsPreloaded(true);
          onLoadComplete?.();
          renderFrame(currentFrameRef.current);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    // Safety timeout: If at least frame 0 is loaded, release loader after 3.5s
    const safetyTimer = setTimeout(() => {
      if (isMounted && count > 0) {
        setIsPreloaded(true);
        renderFrame(currentFrameRef.current);
      }
    }, 3500);

    // Window resize handler to maintain aspect ratio and prevent distortion
    const handleResize = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current);
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderFrame, onLoadComplete]);

  /**
   * Maps scroll progress (0 to 1) to image frame index (0 to TOTAL_FRAMES - 1).
   * Throttled via requestAnimationFrame for silky 60+ FPS scrub.
   */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    const { frameIndex, isFlipped } = calculate360(latest);

    if (frameIndex !== currentFrameRef.current || isFlipped !== isFlippedRef.current) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(frameIndex, isFlipped);
      });
    }
  });

  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#08090c]"
      id="scrolly-container"
    >
      {/* Sticky viewport container (top-0 h-screen w-full) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#08090c]">
        {/* HTML5 Canvas rendering the image sequence */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover select-none pointer-events-none"
          style={{ filter: "contrast(102%) brightness(100%)" }}
        />

        {/* Ambient radial glow blending seamlessly into the #08090c background */}
        <div className="canvas-vignette" />

        {/* Preloader overlay while initial frames are loading */}
        {!isPreloaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#08090c] transition-opacity duration-700">
            <div className="flex flex-col items-center max-w-xs w-full px-6">
              {/* Futuristic Spinner & Status */}
              <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
                <span className="font-mono text-xs text-cyan-400 font-medium">
                  {loadPercentage}%
                </span>
              </div>

              <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-amber-500 transition-all duration-200"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between w-full font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                <span>BUFFERING 360° SEQUENCE</span>
                <span>{loadedCount}/{TOTAL_FRAMES}</span>
              </div>
            </div>
          </div>
        )}

        {/* Component 2: The Parallax Overlay sitting on top (z-index 10) */}
        <Overlay scrollProgress={scrollProgress} angle={Math.round(scrollProgress * 360)} />
      </div>
    </div>
  );
}
