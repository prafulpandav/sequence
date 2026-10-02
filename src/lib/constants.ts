import { Project, ExperienceItem } from "@/types";

export const TOTAL_FRAMES = 60; // 00 through 59

/**
 * Returns formatted image URL for a given frame index.
 * Follows: frame_XX_delay-0.067s.png (or webp)
 */
export const getFramePath = (index: number, folder = "/sequence"): string => {
  const padIndex = String(Math.max(0, Math.min(TOTAL_FRAMES - 1, index))).padStart(2, "0");
  const prefix = folder ? (folder.endsWith("/") ? folder.slice(0, -1) : folder) : "";
  return prefix ? `${prefix}/frame_${padIndex}_delay-0.067s.png` : `frame_${padIndex}_delay-0.067s.png`;
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "aetheria-hyperdrive",
    title: "Aetheria Hyperdrive",
    category: "Interactive WebGL & Audio Engine",
    description: "Real-time generative particle universe featuring custom compute shaders, spatial audio synesthesia, and 120 FPS physics rendering.",
    year: "2026",
    stats: "Site of the Day // FWA of the Month",
    tags: ["Three.js", "GLSL Shaders", "Web Audio API", "Next.js 14", "Framer Motion"],
    link: "https://example.com/aetheria",
    github: "https://github.com/example/aetheria",
    featured: true,
  },
  {
    id: "chronos-design-system",
    title: "Chronos Kinetic System",
    category: "Design System & Micro-Interactions",
    description: "Production-grade kinetic interaction framework engineered for Tier-1 fintech platforms with sub-pixel spring physics and tactile feedback.",
    year: "2025",
    stats: "2.4M npm Downloads // Design Award Winner",
    tags: ["TypeScript", "Tailwind CSS", "Spring Physics", "Micro-Interactions"],
    link: "https://example.com/chronos",
    github: "https://github.com/example/chronos",
    featured: true,
  },
  {
    id: "neuromorphic-spatial-ui",
    title: "Neuromorphic Spatial UI",
    category: "Experimental Spatial Computing",
    description: "Browser-based spatial computing interface exploring visionOS parallax glassmorphism, gesture tracking, and adaptive luminance.",
    year: "2025",
    stats: "Awwwards Developer Award // Innovation",
    tags: ["Next.js", "Canvas 2D", "Parallax Shaders", "MediaPipe AI"],
    link: "https://example.com/spatial",
    featured: true,
  },
  {
    id: "obsidian-flagship",
    title: "Obsidian Studio",
    category: "Cinematic E-Commerce Experience",
    description: "Editorial luxury ecommerce platform with liquid scroll transformations, 3D product visualizer, and instant headless checkout.",
    year: "2024",
    stats: "Awwwards Site of the Year Nominee",
    tags: ["Next.js 14", "Shopify Storefront", "Framer Motion", "Lenis Scroll"],
    link: "https://example.com/obsidian",
    github: "https://github.com/example/obsidian",
    featured: false,
  },
];

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    period: "2024 — PRESENT",
    role: "Lead Creative Developer",
    company: "Studio Monolith // Tokyo & Remote",
    description: "Directing the interaction engineering team on bespoke web experiences for global brands. Pioneered in-house scroll-scrubbing canvas pipeline reducing bundle payload by 65%.",
    technologies: ["Next.js", "WebGL", "Framer Motion", "Canvas 2D", "GLSL"],
  },
  {
    period: "2022 — 2024",
    role: "Senior Interaction Engineer",
    company: "Kinetic Labs // San Francisco",
    description: "Architected high-conversion immersive landing pages and kinetic design systems. Won 6 Awwwards SOTD and 4 FWA of the Day honors.",
    technologies: ["TypeScript", "Tailwind CSS", "GSAP", "Three.js", "React"],
  },
  {
    period: "2020 — 2022",
    role: "Creative Technologist",
    company: "Future Forma // London",
    description: "Explored experimental generative graphics, interactive sound design, and bespoke microsites for high-profile cultural institutions.",
    technologies: ["JavaScript", "HTML5 Canvas", "Web Audio API", "CSS3 3D"],
  },
];
