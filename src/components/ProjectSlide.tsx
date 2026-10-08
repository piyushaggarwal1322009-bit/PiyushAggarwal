"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../data/projects";
import { ProjectPreview } from "./ProjectPreview";

type ProjectSlideProps = {
  project: Project;
  index: number;
};

export function ProjectSlide({ project, index }: ProjectSlideProps) {
  const reduceMotion = useReducedMotion();
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);

  return (
    <motion.article
      className={`project-slide accent-${project.accentTheme}`}
      aria-labelledby={`project-title-${project.id}`}
      initial={{ opacity: 0, x: 22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -22 }}
      transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-slide-info">
        <div className="project-slide-kicker">
          <span className="slide-accent-dot" />
          <span>{project.category}</span>
        </div>
        <h3 id={`project-title-${project.id}`}>{project.name}<i>.</i></h3>
        <p className="project-slide-description">{project.description}</p>

        {project.features.length > 0 && (
          <div className="slide-features">
            <span className="slide-detail-label">PROJECT DETAILS</span>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies.length > 0 && (
          <div className="slide-technology-group">
            <span className="slide-detail-label">TECHNOLOGIES</span>
            <div className="slide-technologies" aria-label={`${project.name} technologies`}>
              {project.technologies.map((technology) => (
                <button
                  key={technology}
                  type="button"
                  className={selectedTechnology === technology ? "is-selected" : ""}
                  aria-pressed={selectedTechnology === technology}
                  onClick={() =>
                    setSelectedTechnology((selected) => selected === technology ? null : technology)
                  }
                >
                  {technology}
                </button>
              ))}
            </div>
            {selectedTechnology && (
              <p className="selected-technology-note">
                {selectedTechnology} is part of the listed project stack.
              </p>
            )}
          </div>
        )}

        <div className="project-slide-links">
          {project.liveUrl && (
            <a
              className="slide-primary-link"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.id === "grillr" ? "Open Live App" : "Live Demo"}
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              className="slide-secondary-link"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={15} /> View Source <ArrowUpRight size={13} />
            </a>
          )}
          {project.id === "grillr" && !project.liveUrl && (
            <span className="slide-url-note">Live and source URLs not supplied</span>
          )}
        </div>
        <span className="slide-count-note">PROJECT 0{index + 1} / 03</span>
      </div>

      <ProjectPreview project={project} />
    </motion.article>
  );
}
