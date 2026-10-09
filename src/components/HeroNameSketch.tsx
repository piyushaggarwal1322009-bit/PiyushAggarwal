"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroNameSketch() {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1450);
    return () => window.clearTimeout(timer);
  }, []);
  const isReady = ready;

  return <h1 className={`sketch-name ${isReady ? "is-ready" : ""}`} aria-label="Piyush Aggarwal">
    <motion.span className="sketch-line sketch-first" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: reducedMotion ? 0 : 0.75, ease: "easeInOut" }}>Piyush</motion.span>
    <motion.em className="sketch-line sketch-last" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.45, ease: "easeInOut" }}>Aggarwal.</motion.em>
    {!isReady && <span className="sketch-sweep" aria-hidden="true"/>}
  </h1>;
}
