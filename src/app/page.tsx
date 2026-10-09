import {
  ArrowUpRight,
  Code2,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import { profile, techStack } from "../data/profile";
import { FadeIn, MagneticLink, Reveal } from "../components/Motion";
import { GitHubActivity } from "../components/Interactive";
import { ProjectShowcase } from "../components/ProjectShowcase";
import { HeroNameSketch } from "../components/HeroNameSketch";

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a href="#top" className="brand">PA<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
          <a href="#projects">Projects</a>
          <a href="#philosophy">Philosophy</a>
          <a href="#contact">Contact</a>
        </div>
        <MagneticLink href={profile.github} target="_blank" rel="noreferrer" className="nav-github">
          <Github size={16} /> GitHub
        </MagneticLink>
      </nav>

      <section id="top" className="hero section">
        <div className="hero-grid">
          <div>
            <FadeIn>
              <div className="eyebrow"><span className="status-dot" /> Available to build & learn</div>
              <HeroNameSketch />
              <p className="hero-copy">{profile.tagline}</p>
              <div className="hero-actions">
                <a href="#projects" className="button primary">Explore my work <ArrowUpRight size={17} /></a>
                <a href="#contact" className="button ghost">Let&apos;s connect</a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="hero-card">
              <div className="terminal-top"><span /><span /><span /></div>
              <div className="terminal-content">
                <p><span className="muted">$</span> whoami</p>
                <p className="terminal-value">Piyush Aggarwal</p>
                <p><span className="muted">$</span> focus</p>
                <p className="terminal-value">Software × AI × Products</p>
                <p><span className="muted">$</span> location</p>
                <p className="terminal-value">Delhi, India</p>
                <p><span className="muted">$</span> education</p>
                <p className="terminal-value">SRM University, Sonepat</p>
                <p><span className="cursor">_</span></p>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section id="about" className="section split-section">
        <Reveal>
          <div className="section-label">01 / ABOUT</div>
          <h2>Not just learning tech.<br /><span>Building with it.</span></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="about-copy">
            <p>{profile.intro}</p>
            <p>I enjoy moving across the stack — from interfaces and APIs to databases and AI integrations — while keeping the end product at the center.</p>
            <div className="facts">
              <div><MapPin size={18} /><span>Delhi, India</span></div>
              <div><GraduationCap size={18} /><span>{profile.university}</span></div>
              <div><Code2 size={18} /><span>Full-stack + AI</span></div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="stack" className="section stack-section">
        <Reveal>
          <div className="section-label">02 / TECHNICAL ARSENAL</div>
          <div className="section-heading-row">
            <h2>A broad stack.<br /><span>One goal: ship.</span></h2>
            <p>I explore technologies across the software lifecycle, with particular interest in full-stack development and AI-powered products.</p>
          </div>
        </Reveal>

        <div className="stack-grid">
          {Object.entries(techStack).map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.05}>
              <div className="stack-card">
                <div className="stack-number">0{i + 1}</div>
                <h3>{category.replace("ai", "AI / ML").replace("other", "Ecosystem")}</h3>
                <div className="tags">
                  {items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <Reveal>
          <div className="section-label">03 / SELECTED WORK</div>
          <div className="section-heading-row">
            <h2>Ideas that became<br /><span>projects.</span></h2>
            <p>I care about the problem, the product and the engineering behind the interface.</p>
          </div>
        </Reveal>

        <ProjectShowcase />
      </section>

      <section className="section activity-section">
        <Reveal>
          <div className="section-label">03.5 / OPEN SOURCE TRAIL</div>
          <div className="section-heading-row">
            <h2>Code in motion.<br /><span>Progress over perfection.</span></h2>
            <p>A live GitHub contribution view gives visitors another way to explore the work behind the portfolio.</p>
          </div>
          <GitHubActivity />
        </Reveal>
      </section>

      <section id="education" className="section education-section">
        <Reveal>
          <div className="section-label">04 / EDUCATION</div>
          <h2>The journey<br /><span>so far.</span></h2>
        </Reveal>
        <div className="timeline">
          <div className="timeline-item current">
            <div className="timeline-marker" />
            <div>
              <span className="timeline-period">CURRENT</span>
              <h3>{profile.university}</h3>
              <p>University journey focused on developing a strong foundation in technology while building projects outside the classroom.</p>
            </div>
          </div>
          {profile.previousSchools.map((school) => (
            <div className="timeline-item" key={school.name}>
              <div className="timeline-marker" />
              <div>
                <span className="timeline-period">{school.period}</span>
                <h3>{school.name}</h3>
                <p>{school.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="philosophy" className="section philosophy-section">
        <Reveal>
          <div className="section-label">05 / PHILOSOPHY</div>
          <div className="philosophy-intro">
            <Sparkles size={22} />
            <h2>How I think<br /><span>about building.</span></h2>
          </div>
        </Reveal>
        <div className="philosophy-grid">
          {profile.philosophy.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="philosophy-card">
                <span>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section now-section">
        <Reveal>
          <div className="now-card">
            <div>
              <div className="section-label">CURRENTLY</div>
              <h2>Learning. Building.<br /><span>Iterating.</span></h2>
            </div>
            <div className="now-list">
              <div><Terminal size={17} /><span>Exploring full-stack engineering</span></div>
              <div><Sparkles size={17} /><span>Experimenting with AI-powered products</span></div>
              <div><Code2 size={17} /><span>Turning hackathon ideas into real projects</span></div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="section contact-section">
        <Reveal>
          <div className="section-label">06 / CONTACT</div>
          <h2>Have an idea?<br /><span>Let&apos;s build.</span></h2>
          <p className="contact-copy">I&apos;m always interested in interesting problems, ambitious projects and people who like building things.</p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="contact-button"><Mail size={18} /> {profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-button"><Github size={18} /> GitHub</a>
          </div>
        </Reveal>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} Piyush Aggarwal</span>
        <span>Built with curiosity & code.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}