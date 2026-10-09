"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";

export function ProjectShowcase() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const wheelLock = useRef(false);
  const wheelTimer = useRef<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const project = projects[index];

  const move = useCallback((delta: number) => {
    setDirection(delta);
    setIndex((current) => (current + delta + projects.length) % projects.length);
  }, []);

  useEffect(() => () => {
    if (wheelTimer.current !== null) window.clearTimeout(wheelTimer.current);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && (event.target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))) return;
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 45 || wheelLock.current) return;
    if (event.cancelable) event.preventDefault();
    wheelLock.current = true;
    move(delta > 0 ? 1 : -1);
    if (wheelTimer.current !== null) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => { wheelLock.current = false; }, 700);
  };

  return (
    <section className="showcase-shell" aria-label="Selected projects" aria-roledescription="carousel" tabIndex={0} onKeyDown={onKeyDown}>
      <div className="showcase-topline"><span>SELECTED WORK / BUILT WITH INTENT</span><span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
      <div className="showcase-stage" onWheel={onWheel} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current; if (Math.abs(distance) > 55) move(distance < 0 ? 1 : -1); touchStart.current = null; }}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.article key={project.name} className="showcase-project" custom={direction}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 36 }}
            animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -28 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.38, ease: [0.22, 1, 0.36, 1] }}>
            <div className="showcase-copy">
              <div className="showcase-project-meta"><span>PROJECT {String(index + 1).padStart(2, "0")}</span><span>{project.status}</span></div>
              <h3>{project.name}</h3>
              <p className="showcase-eyebrow">{project.eyebrow}</p>
              <p className="showcase-description">{project.description}</p>
              <div className="project-context">
                <p><span>Problem</span>{project.problem}</p>
                <p><span>Value</span>{project.value}</p>
              </div>
              <ul className="showcase-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              <div className="showcase-tags">{project.stack.slice(0, 6).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="showcase-actions">
                {project.live ? <a className="button primary" href={project.live} target="_blank" rel="noreferrer">View live <ArrowUpRight size={17} /></a> : <span className="project-unavailable">Live demo unavailable</span>}
                {project.github ? <a className="button ghost" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> Source</a> : <span className="project-unavailable">Source unavailable</span>}
              </div>
            </div>
            <div className={`showcase-preview preview-${project.previewKey ?? "generic"}`}>
              <div className="preview-window-bar"><div className="preview-dots"><i/><i/><i/></div><span>{project.previewLabel ?? project.name}</span><ExternalLink size={14}/></div>
              <div className="preview-content">
                {project.previewKey === "grillr" ? <GrillrPreview /> : project.previewKey === "jal-dhara" ? <WaterPreview /> : project.previewKey === "ezykwelez" ? <CampusPreview /> : <MigrationPreview />}
              </div>
              <div className="preview-bottom"><span>PRODUCT PREVIEW</span><span>{project.stack[0] ?? "PROJECT"}</span></div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="showcase-controls"><span className="showcase-hint">SCROLL OR SWIPE TO EXPLORE</span><div className="showcase-progress">{projects.map((item, i) => <button key={item.name} aria-label={`Show ${item.name}`} aria-current={i === index ? "step" : undefined} className={i === index ? "active" : ""} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }} />)}</div><div className="showcase-arrows"><button aria-label="Previous project" onClick={() => move(-1)}><ArrowLeft size={17}/></button><button aria-label="Next project" onClick={() => move(1)}><ArrowRight size={17}/></button></div></div>
    </section>
  );
}

function GrillrPreview() { return <div className="mock-app grillr-mock"><div className="mock-app-head"><span className="mock-app-icon">G</span><div><strong>Grillr</strong><small>Interview practice</small></div><span className="mock-live">PREVIEW</span></div><div className="mock-app-columns"><div className="mock-question"><small>BEHAVIORAL · QUESTION 04</small><h4>Tell me about a time you solved a difficult problem.</h4><div className="waveform" aria-label="Illustrative audio waveform">{Array.from({length: 30}, (_, i) => <i key={i} style={{height: `${10 + ((i * 17) % 28)}px`, animationDelay: `${i * 25}ms`}} />)}</div><small>Illustrative transcription interface</small></div><div className="mock-analysis"><small>ILLUSTRATIVE FEEDBACK</small><strong>Answer review</strong><div className="mock-meter"><i/></div><p>Structure feedback</p><p>Specificity feedback</p></div></div><div className="mock-app-foot">Preview only <span>No live interview results</span></div></div>; }
function WaterPreview() { return <div className="water-mock"><div className="water-title"><small>JAL-DHARA / WATER INTELLIGENCE</small><strong>Map the flow.<br/>Restore the source.</strong><p>Explore water networks and restoration decisions.</p></div><div className="water-network"><svg viewBox="0 0 400 230" role="img" aria-label="Illustrative water network preview"><path d="M20 120 C80 30 120 200 190 105 S290 25 380 95"/><path d="M20 120 C110 130 130 35 220 160 S320 200 380 95"/><path d="M20 120 L100 55 L190 105 L270 60 L380 95"/>{[[20,120],[100,55],[190,105],[270,60],[380,95],[220,160],[320,190]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="7"/>)}</svg><div className="water-legend"><span>● Network nodes</span><span>↗ Flow paths</span></div></div></div>; }
function CampusPreview() { return <div className="campus-mock"><div className="campus-heading"><div><small>EZYKWELEZ / OPERATIONS</small><strong>Command center</strong></div><span>ILLUSTRATIVE DATA</span></div><div className="campus-metrics"><div><small>OPERATING STATE</small><strong>Operational</strong><span>Campus services normal</span></div><div><small>ACTIVE DISRUPTIONS</small><strong>02</strong><span>Decision workflows</span></div><div><small>RECOVERY OPTIONS</small><strong>04</strong><span>Ready for review</span></div></div><div className="campus-flow"><span>Report disruption</span><i/><span>Map impact</span><i/><span>Compare recovery</span></div><div className="campus-map"><div className="campus-map-lines"/><span className="campus-node node-a">Power</span><span className="campus-node node-b">Network</span><span className="campus-node node-c">Library</span><span className="campus-node node-d">Labs</span><small>DEPENDENCY GRAPH · REPRESENTATIVE VIEW</small></div><small className="campus-note">UI composition · no live campus data</small></div>; }
function MigrationPreview() { return <div className="migration-mock"><div className="migration-heading"><span>PHASE 0 / LOCAL CLI</span><strong>Migration rehearsal</strong><small>PostgreSQL · sample dataset</small></div><div className="migration-steps"><div><span>01</span><strong>Generate dataset</strong><small>50,000 sample orders</small><b>PREVIEW</b></div><div><span>02</span><strong>Apply migration</strong><small>Sample SQL change</small><b>PREVIEW</b></div><div><span>03</span><strong>Compare query</strong><small>Before / after latency</small><b>PREVIEW</b></div></div><div className="migration-report"><span>REPORT PREVIEW</span><strong>Query comparison</strong><div><i/><i/></div><small>Illustrative layout · no live run or results</small></div></div>; }
