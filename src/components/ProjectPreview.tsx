"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "../data/projects";

type ProjectPreviewProps = {
  project: Project;
};

type PreviewState = "loading" | "loaded" | "blocked" | "fallback";

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const [previewState, setPreviewState] = useState<PreviewState>(
    project.previewMode === "iframe" && project.previewUrl ? "loading" : "blocked",
  );
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (project.previewMode !== "iframe" || !project.previewUrl) return;

    timeout.current = setTimeout(() => setPreviewState("blocked"), 10000);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [project.previewMode, project.previewUrl]);

  const markLoaded = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setPreviewState("loaded");
  };

  const showFallback = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setPreviewState("fallback");
  };

  const isFallback = previewState === "blocked" || previewState === "fallback";

  return (
    <div className={`project-preview preview-${project.id}`}>
      <div className="preview-frame">
        <div className="preview-toolbar">
          <span className="preview-window-controls" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="preview-url">
            {project.previewUrl
              ? project.previewUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : "LIVE PREVIEW NOT CONFIGURED"}
          </span>
          {project.liveUrl ? (
            <a
              className="preview-external"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} in a new tab`}
            >
              <ExternalLink size={15} />
            </a>
          ) : (
            <span className="preview-external is-disabled" aria-hidden="true">
              <ExternalLink size={15} />
            </span>
          )}
        </div>

        <div className="preview-viewport">
          {project.previewUrl && !isFallback && (
            <iframe
              className={`project-iframe ${previewState === "loaded" ? "is-loaded" : ""}`}
              src={project.previewUrl}
              title={`${project.name} live application preview`}
              loading="eager"
              allow={project.id === "grillr" ? "microphone" : undefined}
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={markLoaded}
              onError={showFallback}
            />
          )}

          {previewState === "loading" && (
            <div className="project-preview-loading" role="status">
              <span className="preview-loader"><i /><i /><i /></span>
              <span>Connecting to {project.name}…</span>
            </div>
          )}

          {isFallback && (
            <div className="project-preview-fallback">
              <div className="preview-art" aria-hidden="true">
                <span className="preview-art-orbit preview-art-orbit-one" />
                <span className="preview-art-orbit preview-art-orbit-two" />
                <span className="preview-art-core">
                  {project.id === "grillr" ? (
                    <span className="preview-wave"><i /><i /><i /><i /><i /></span>
                  ) : project.id === "jal-dhara" ? (
                    <span className="preview-water-mark"><i /><i /><i /></span>
                  ) : (
                    <span className="preview-network-mark"><i /><i /><i /><i /></span>
                  )}
                </span>
              </div>
              <div className="preview-fallback-copy">
                <span className="preview-state-label">
                  {!project.previewUrl
                    ? "LIVE PREVIEW NOT CONFIGURED"
                    : "EMBED PREVIEW UNAVAILABLE"}
                </span>
                <h3>
                  {!project.previewUrl
                    ? "The live application will appear here."
                    : "This site may restrict embedded previews."}
                </h3>
                <p>
                  {!project.previewUrl
                    ? "Add the verified deployment URL to NEXT_PUBLIC_GRILLR_URL to enable this preview."
                    : "Open the live application directly to explore the full experience."}
                </p>
                {project.liveUrl && (
                  <a
                    className="preview-launch"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.id === "grillr" ? "Open Live App" : "Launch project"}
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="preview-footline">
        <span>
          {project.previewUrl
            ? "LIVE APPLICATION / EXTERNAL CONTENT"
            : "URL REQUIRED / LIVE PREVIEW NOT CONFIGURED"}
        </span>
        {project.previewUrl && !isFallback && (
          <button type="button" onClick={showFallback}>
            Preview not visible?
          </button>
        )}
      </div>
    </div>
  );
}
