import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Mail,
  MapPin,
} from "lucide-react";
import { MobileMenu, RoleTicker } from "../components/Interactive";
import { FadeIn, Reveal } from "../components/Motion";
import { ProjectSlider } from "../components/ProjectSlider";
import { WelcomeBot } from "../components/WelcomeBot";
import { profile, techStack } from "../data/profile";
import { projects } from "../data/projects";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const techGroups = [
  ["Programming languages", techStack.languages],
  ["Frontend development", techStack.frontend],
  ["Backend development", techStack.backend],
  ["AI / ML", techStack.ai],
  ["Databases", techStack.databases],
  ["Frameworks & APIs", techStack.frameworksApis],
  ["Development ecosystem", techStack.ecosystem],
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Piyush Aggarwal, home">
          PA<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="header-github"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="Visit Piyush on GitHub"
        >
          <Github size={17} />
          <span>GitHub</span>
          <ArrowUpRight size={14} />
        </a>
        <MobileMenu items={navigation} />
      </header>

      <section id="top" className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy-column">
          <FadeIn>
            <div className="hero-kicker">
              <span className="kicker-rule" />
              Student developer <span className="kicker-divider">/</span> Delhi, India
            </div>
            <WelcomeBot />
            <h1 id="hero-title">
              Piyush
              <span>Aggarwal</span>
            </h1>
            <div className="hero-role-line">
              <span>Student /</span> <RoleTicker />
            </div>
            <p className="hero-positioning">{profile.tagline}</p>
            <p className="hero-supporting">
              Student at {profile.university}. Exploring ideas, engineering
              products, and learning by building.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore projects <ArrowDown size={16} />
              </a>
              <a className="button button-text" href={`mailto:${profile.email}`}>
                Get in touch <ArrowUpRight size={16} />
              </a>
              <a
                className="hero-github-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} /> GitHub <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="hero-location">
              <MapPin size={15} strokeWidth={1.7} />
              <span>{profile.location}</span>
              <span className="location-divider" />
              <span className="focus-indicator" />
              <span>Currently exploring full-stack + AI</span>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.12}>
          <div className="hero-art" aria-hidden="true">
            <div className="art-topline">
              <span>IDEAS INTO USEFUL THINGS</span>
              <span>01 / 04</span>
            </div>
            <div className="art-grid" />
            <div className="art-orbit art-orbit-outer" />
            <div className="art-orbit art-orbit-inner" />
            <div className="art-core">
              <span>MAKE</span>
              <strong>useful.</strong>
            </div>
            <div className="art-node art-node-one">
              <span>01</span>
              <strong>Curiosity</strong>
            </div>
            <div className="art-node art-node-two">
              <span>02</span>
              <strong>Engineering</strong>
            </div>
            <div className="art-node art-node-three">
              <span>03</span>
              <strong>Iteration</strong>
            </div>
            <div className="art-bottomline">
              <span>LEARN / MAKE / REFINE</span>
              <span className="art-cross">+</span>
            </div>
          </div>
        </FadeIn>
        <a className="hero-scroll" href="#about" aria-label="Scroll to about">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
      </section>

      <section id="about" className="section page-width about-section">
        <div className="section-rail">
          <span className="section-index">01</span>
          <span className="section-name">A little about me</span>
        </div>
        <div className="about-layout">
          <Reveal>
            <h2 className="display-heading">
              Curiosity,
              <br />
              <em>made practical.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about-body">
              <p>{profile.intro}</p>
              <p>
                I enjoy moving between interfaces, application logic, and AI
                integrations while keeping the real-world use of a product in
                view. <strong>Build, learn, iterate</strong> is a useful way to
                make progress without pretending to have every answer.
              </p>
              <div className="about-details">
                <span>{profile.location}</span>
                <span>{profile.university}</span>
                <span>Full-stack development / AI</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section page-width projects-section">
        <div className="section-rail">
          <span className="section-index">02</span>
          <span className="section-name">Selected projects</span>
        </div>
        <Reveal>
          <div className="section-heading">
            <h2 className="display-heading">
              Work in
              <br />
              <em>progress.</em>
            </h2>
            <p>
              Projects are where curiosity meets constraints: a question to
              explore, an approach to test, and something new to learn.
            </p>
          </div>
        </Reveal>

        <ProjectSlider projects={projects} />
        <div className="github-note">
          <Github size={19} />
          <p>
            More experiments and source code live on GitHub.
            <a href={profile.github} target="_blank" rel="noreferrer">
              Browse the profile <ArrowUpRight size={14} />
            </a>
          </p>
        </div>
      </section>

      <section id="stack" className="section page-width stack-section">
        <div className="section-rail">
          <span className="section-index">03</span>
          <span className="section-name">Tools & technologies</span>
        </div>
        <Reveal>
          <div className="section-heading">
            <h2 className="display-heading">
              A growing
              <br />
              <em>toolkit.</em>
            </h2>
            <p>
              Technologies I’m exploring or have used across projects. This is
              a map of interests, not a proficiency ranking.
            </p>
          </div>
        </Reveal>
        <div className="tech-list">
          {techGroups.map(([category, items], index) => (
            <Reveal key={category} delay={index * 0.025}>
              <div className="tech-row">
                <span className="tech-index">0{index + 1}</span>
                <h3>{category}</h3>
                <p>{items.join(", ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="education" className="section page-width education-section">
        <div className="section-rail">
          <span className="section-index">04</span>
          <span className="section-name">Education</span>
        </div>
        <div className="education-layout">
          <Reveal>
            <h2 className="display-heading">
              Learning,
              <br />
              <em>step by step.</em>
            </h2>
          </Reveal>
          <div className="education-list">
            {profile.previousSchools.map((school, index) => (
              <Reveal key={school.name} delay={index * 0.04}>
                <article className="education-item">
                  <span className="education-number">0{index + 1}</span>
                  <div>
                    <span className="education-level">{school.period}</span>
                    <h3>{school.name}</h3>
                    <p>{school.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.08}>
              <article className="education-item education-current">
                <span className="education-number">03</span>
                <div>
                  <span className="education-level">CURRENT</span>
                  <h3>{profile.university}</h3>
                  <p>Currently studying.</p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="philosophy" className="section page-width principles-section">
        <div className="section-rail">
          <span className="section-index">05</span>
          <span className="section-name">How I approach building</span>
        </div>
        <Reveal>
          <h2 className="display-heading principles-heading">
            Make things.<br /><em>Learn what matters.</em>
          </h2>
        </Reveal>
        <div className="principle-list">
          {profile.philosophy.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.04}>
              <article className="principle-row">
                <span>0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="focus-band">
        <div className="page-width focus-layout">
          <div>
            <span className="section-index">06</span>
            <p className="focus-label">Current direction</p>
          </div>
          <ul>
            <li>Exploring full-stack engineering</li>
            <li>Building AI-powered applications</li>
            <li>Experimenting with ideas through projects</li>
            <li>Improving product thinking and technical execution</li>
          </ul>
        </div>
      </section>

      <section id="contact" className="section page-width contact-section">
        <div className="section-rail">
          <span className="section-index">07</span>
          <span className="section-name">Get in touch</span>
        </div>
        <Reveal>
          <p className="contact-kicker">A thoughtful problem is a good place to start.</p>
          <h2 className="contact-heading">
            Have an interesting
            <br />
            <em>problem in mind?</em>
          </h2>
          <div className="contact-footer">
            <a className="contact-email" href={`mailto:${profile.email}`}>
              <Mail size={18} /> {profile.email} <ArrowUpRight size={17} />
            </a>
            <a
              className="contact-github"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> GitHub profile <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer page-width">
        <span>© {new Date().getFullYear()} Piyush Aggarwal</span>
        <span>Curiosity, practice, and useful software.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}