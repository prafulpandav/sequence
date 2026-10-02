# High-End "Scrollytelling" Personal Portfolio Website

An Awwwards-caliber creative developer portfolio website engineered with **Next.js 14 (App Router)**, **TypeScript**, **Framer Motion**, and high-performance **HTML5 Canvas** scroll scrubbing.

---

## ⚡ Architecture & Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark Obsidian `#08090c` design system)
- **Animation:** Framer Motion (`useScroll`, `useMotionValueEvent`, `useSpring`)
- **Rendering Engine:** HTML5 Canvas (High-DPI Retina aware, `object-fit: cover` math)
- **Micro-interactions:** Zero-dependency synthesized Web Audio API sound effects

---

## 📁 Project Structure

```
c:\Users\USER\Desktop\sequence\
├── frame_00_delay-0.067s.png ... frame_59_delay-0.067s.png (60 high-res sequence frames)
├── index.html                               # Instant standalone browser preview
├── package.json                             # Next.js 14, Framer Motion, Tailwind dependencies
├── tsconfig.json                            # TypeScript config with @/ path aliases
├── next.config.mjs                          # Next.js config
├── tailwind.config.ts                       # Curated dark slate & cyber cyan/amber theme
├── postcss.config.mjs                       # Tailwind PostCSS configuration
├── scripts/
│   ├── copy-assets.js                       # Node asset sync to public/sequence/
│   └── setup-assets.ps1                     # PowerShell asset sync to public/sequence/
├── src/
│   ├── types/
│   │   └── index.ts                         # TypeScript interfaces (Project, Experience)
│   ├── lib/
│   │   ├── constants.ts                     # Sequence path resolver & project data
│   │   └── sound.ts                         # Web Audio API futuristic sound effects
│   ├── components/
│   │   ├── ScrollyCanvas.tsx                # 500vh sticky HTML5 Canvas scroll scrubber
│   │   ├── Overlay.tsx                      # Parallax-linked kinetic text sections (0%, 30%, 60%, 90%)
│   │   ├── Projects.tsx                     # Glassmorphic case studies grid
│   │   ├── Navbar.tsx                       # Floating glass pill nav, live clock, sound toggle
│   │   ├── Experience.tsx                   # Career track record & leadership timeline
│   │   ├── Footer.tsx                       # Call-to-action, one-click email copy, social links
│   │   └── CustomCursor.tsx                 # Smooth spring-physics magnetic cursor
│   └── app/
│       ├── layout.tsx                       # Root layout with noise grain, SEO metadata
│       ├── page.tsx                         # Page orchestration
│       └── globals.css                      # Reset, #08090c palette, glassmorphism, vignette
```

---

## 🎬 Core Mechanics Explained

### 1. The Sticky Scroller (`ScrollyCanvas.tsx`)
- Container is sized to `500vh` to grant a silky, controlled cinematic scroll distance.
- Uses a `sticky top-0 h-screen w-full` viewport.
- Uses HTML5 Canvas instead of heavy `<video>` elements to eliminate buffering stutters, mobile video player overlays, and OS-level decode latency.
- Implements `object-fit: cover` calculation across all aspect ratios (mobile portrait to 4K ultra-wide).
- High-DPI handling via `window.devicePixelRatio` prevents blurriness on Retina displays.
- In-memory preloading of all 60 frames with progress counter and smooth fade-in to prevent any white flashes.

### 2. The Parallax Overlay (`Overlay.tsx`)
- Sits above the canvas (`z-index: 10`) with `pointer-events-none` on containers and `pointer-events-auto` on interactive triggers.
- Driven by scroll progress:
  - **Section 1 (0% scroll):** Center hero: *"Alex Rivera // Creative Developer & Technical Director"* with kinetic mouse pill cue.
  - **Section 2 (30% scroll):** Left-aligned: *"I build digital experiences."* with 60 FPS & award metrics.
  - **Section 3 (60% scroll):** Right-aligned: *"Bridging design and engineering."* with interactive tech stack pills.
  - **Section 4 (90% scroll):** Centered prompt leading smoothly into the Work Grid.

### 3. The Work Grid (`Projects.tsx`)
- Sits immediately following the 500vh scroll container.
- Glassmorphism cards with `backdrop-blur-md`, subtle cyan/amber glow borders, tags, external links, and Awwwards honors.

### 4. Zero-Dependency Haptic Audio (`sound.ts`)
- Features an integrated Web Audio synthesizer generating subtle futuristic clicks and chimes without requiring external audio files.

---

## 🚀 Running the Project

### Option A: Instant Browser Preview (Zero Install Required)
Simply open `index.html` in Chrome, Edge, or Brave:
- Open File Explorer to `c:\Users\USER\Desktop\sequence\`
- Double click `index.html`
- Scroll down to experience the complete 60-frame scrub and project showcase!

### Option B: Run via Next.js
1. Ensure the frames are copied to `public/sequence/`:
   ```bash
   node scripts/copy-assets.js
   # or run:
   powershell -ExecutionPolicy Bypass -File scripts\setup-assets.ps1
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).
