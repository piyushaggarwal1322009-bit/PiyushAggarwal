export type Project = {
  name: string;
  eyebrow: string;
  description: string;
  status: string;
  stack: string[];
  highlights: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "Grillr",
    eyebrow: "AI • Mock Interviews",
    description:
      "A mock-interview web application designed to conduct interviews, transcribe answers, score responses and provide structured feedback.",
    status: "Building",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Groq",
      "Supabase",
      "Web Speech API"
    ],
    highlights: [
      "Browser-native speech recognition and speech synthesis",
      "AI-driven interview evaluation and structured feedback",
      "Designed around free-tier infrastructure"
    ],
    github: "https://github.com/piyushaggarwal1322009-bit",
  },
  {
    name: "JAL-DHARA",
    eyebrow: "Civic Tech • Sustainability • AI",
    description:
      "A digital water-intelligence concept inspired by traditional Indian water systems, using simulation and optimization to explore restoration decisions.",
    status: "Prototype / Hackathon",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Flow",
      "Zod",
      "Vitest",
      "Groq"
    ],
    highlights: [
      "Network-based water-flow simulation",
      "Budget-constrained repair optimization",
      "Documentation-first engineering approach"
    ],
    github: "https://github.com/piyushaggarwal1322009-bit/JAL-DHARA",
    live: "https://jal-dhara.vercel.app/"
  },
  {
    name: "EZ Kwelez",
    eyebrow: "Product • Web",
    description:
      "A project from my wider experimentation with building practical web products and turning an idea into a usable interface.",
    status: "Project",
    stack: [
      "Web Development",
      "JavaScript",
      "UI Engineering",
      "API Integration"
    ],
    highlights: [
      "Product-oriented development",
      "Focus on usability and interaction",
      "Built as part of my broader project journey"
    ],
    github: "https://github.com/piyushaggarwal1322009-bit"
  }
];