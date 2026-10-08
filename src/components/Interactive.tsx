"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const roles = ["Developer", "Builder", "AI Enthusiast"];

export function RoleTicker() {
  const reduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setActiveRole((active) => (active + 1) % roles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <span className="role-ticker" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[activeRole]}
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
        >
          {roles[activeRole]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

type MobileMenuProps = {
  items: Array<{ label: string; href: string }>;
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? X : Menu;

  return (
    <div className="mobile-navigation">
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-links"
        onClick={() => setIsOpen((open) => !open)}
      >
        <Icon size={20} />
      </button>
      {isOpen && (
        <nav
          className="mobile-menu-panel"
          id="mobile-navigation-links"
          aria-label="Mobile navigation"
        >
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}