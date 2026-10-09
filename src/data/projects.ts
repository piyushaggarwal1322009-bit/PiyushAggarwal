export type Project = {
  name: string;
  eyebrow: string;
  description: string;
  problem: string;
  value: string;
  status: string;
  stack: string[];
  highlights: string[];
  github: string;
  live?: string;
  previewKey?: string;
  previewLabel?: string;
};

export const projects: Project[] = [
  {
    name: "Grillr",
    eyebrow: "Voice interview coach",
    description:
      "A voice-first interview practice app that asks role-specific questions, transcribes answers, and returns structured coaching.",
    problem: "Interview practice is hard to repeat and difficult to assess without a consistent interviewer.",
    value: "A guided answer-to-feedback loop makes practice more focused and repeatable.",
    status: "In development",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Supabase",
      "WebSockets",
      "Web Audio API"
    ],
    highlights: [
      "Role-specific behavioral, technical, and HR interviews",
      "Speech transcription, communication analysis, and follow-up questions",
      "Structured answer evaluation with retry and improvement tracking"
    ],
    github: "https://github.com/Sarthak-madan334/Grillr",
    previewKey: "grillr",
    previewLabel: "Grillr · Interview coach",
  },
  {
    name: "JAL-DHARA",
    eyebrow: "Water systems · Decision support",
    description:
      "An educational water-network simulator for testing how channel disruptions and repair choices affect downstream village delivery.",
    problem: "A broken link in a connected tank-and-channel network can leave downstream demand unmet.",
    value: "Compare a baseline, disruption, and budgeted repair using an explicit one-step water balance.",
    status: "Interactive demo",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Flow",
      "Zod",
      "Vitest"
    ],
    highlights: [
      "Adjust rainfall, demand rules, and channel condition",
      "Compare water delivery and evaluate repair combinations within a budget",
      "Illustrative inputs only; not a field survey or hydraulic design"
    ],
    github: "https://github.com/piyushaggarwal1322009-bit/JAL-DHARA",
    live: "https://jal-dhara.vercel.app/",
    previewKey: "jal-dhara",
    previewLabel: "JAL-DHARA · Water intelligence"
  },
  {
    name: "EZ Kwelex",
    eyebrow: "Campus operations · Incident response",
    description:
      "A campus operations platform that connects incident reporting, dependency impact analysis, and recovery planning in one decision workflow.",
    problem: "Campus disruptions can cascade across connected rooms, services, and infrastructure.",
    value: "Map the affected systems, assess impact, and compare constraint-aware recovery options before acting.",
    status: "Product prototype",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Supabase",
      "PostgreSQL"
    ],
    highlights: [
      "Incident registry with lifecycle and affected-entity tracking",
      "Campus dependency graph and blast-radius analysis",
      "Recovery plan comparison and human review"
    ],
    github: "https://github.com/piyushaggarwal1322009-bit/EzKwelez",
    live: "https://ezkwelez.vercel.app/",
    previewKey: "ezykwelez",
    previewLabel: "EzyKwelez · Command center"
  },
  {
    name: "Migration Y",
    eyebrow: "Database engineering · Migration rehearsal",
    description: "A local PostgreSQL migration rehearsal prototype that runs a schema change against generated data and compares a representative query before and after.",
    problem: "A migration can pass on clean fixtures yet change query performance or behavior on messy, production-shaped data.",
    value: "A repeatable rehearsal exposes data-shape risks and makes before-and-after query latency visible.",
    status: "Python CLI prototype",
    stack: ["Python", "PostgreSQL", "Docker", "SQL"],
    highlights: ["Generates a 50,000-row sample with null-heavy data", "Applies a sample migration and compares a representative query", "Phase 0 runs locally and requires Docker Compose"],
    github: "https://github.com/Sarthak-madan334/MigrationY",
    previewKey: "migration-y",
    previewLabel: "Migration Y · Rehearsal report"
  }
];