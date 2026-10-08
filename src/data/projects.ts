export type Project = {
  id: "grillr" | "jal-dhara" | "ez-kwelez";
  name: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  previewUrl?: string;
  accentTheme: "violet" | "cyan" | "ice";
  previewMode: "iframe" | "visual";
};

const grillrUrl = process.env.NEXT_PUBLIC_GRILLR_URL?.trim() || undefined;

export const projects: Project[] = [
  {
    id: "grillr",
    name: "Grillr",
    category: "AI Mock Interview Platform",
    description:
      "An AI-powered mock-interview application for practicing interview conversations.",
    technologies: [],
    features: [],
    liveUrl: grillrUrl,
    previewUrl: grillrUrl,
    accentTheme: "violet",
    previewMode: "iframe",
  },
  {
    id: "jal-dhara",
    name: "JAL-DHARA",
    category: "Water Systems / Educational Simulation",
    description:
      "An illustrative, one-step simulation of connected tanks and channels for exploring water delivery and repair scenarios.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Flow",
      "Zod",
      "Vitest",
      "Groq",
    ],
    features: [
      "Adjust a scenario and run the water balance",
      "Explore channel failures and delivery changes",
      "Compare budget-limited repair options",
    ],
    githubUrl: "https://github.com/piyushaggarwal1322009-bit/JAL-DHARA",
    liveUrl: "https://jal-dhara.vercel.app/",
    previewUrl: "https://jal-dhara.vercel.app/",
    accentTheme: "cyan",
    previewMode: "iframe",
  },
  {
    id: "ez-kwelez",
    name: "EZ Kwelez",
    category: "Campus Operations / Decision Support",
    description:
      "A campus disruption-response and recovery platform that maps dependencies, assesses operational impact, and explores recovery options using simulated data.",
    technologies: ["Next.js", "TypeScript", "FastAPI"],
    features: [
      "Campus dependency mapping",
      "Incident impact and blast-radius analysis",
      "Recovery options and what-if simulation",
    ],
    githubUrl: "https://github.com/piyushaggarwal1322009-bit/EzKwelez",
    liveUrl: "https://ezkwelez.vercel.app/",
    previewUrl: "https://ezkwelez.vercel.app/",
    accentTheme: "ice",
    previewMode: "iframe",
  },
];