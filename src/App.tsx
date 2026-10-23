import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "./content";
import { Sculpture, type SceneState } from "./Sculpture";
gsap.registerPlugin(ScrollTrigger);
const Arrow = () => (
  <svg
    className="arrow-icon"
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
function ProjectArt({ id }: { id: string }) {
  if (id === "veloura")
    return (
      <div className="architecture" aria-hidden="true">
        <div className="architecture-orbit" />
        <div className="stack stack-one">
          <span>01 / ACCESS</span>
          <b>Identity</b>
          <i>JWT · AUTHENTICATION</i>
        </div>
        <div className="stack stack-two">
          <span>02 / LOGIC</span>
          <b>Application</b>
          <i>CQRS · MEDIATR</i>
        </div>
        <div className="stack stack-three">
          <span>03 / PERSISTENCE</span>
          <b>Data</b>
          <i>EF CORE · SQL SERVER</i>
        </div>
        <div className="art-mark">V.</div>
      </div>
    );
  if (id === "university")
    return (
      <div className="campus" aria-hidden="true">
        <div className="campus-circle" />
        <div className="campus-word">
          OPEN
          <br />
          <em>possibilities.</em>
        </div>
        <div className="campus-building">
          {Array.from({ length: 7 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <span className="campus-note">
          A PLACE TO LEARN.
          <br />A SPACE TO GROW.
        </span>
      </div>
    );
  return (
    <div className="identity-art" aria-hidden="true">
      <div className="identity-frame">
        <span>MOHAMED EL-TAHER</span>
        <b>
          ME
          <Arrow />
        </b>
        <div>
          DEVELOPER
          <br />
          IN THE MAKING.
        </div>
      </div>
      <span className="identity-outline">&lt;/&gt;</span>
    </div>
  );
}
export function App() {
  const root = useRef<HTMLDivElement>(null);
  const scene = useRef<SceneState>({ progress: 0, reduced: false });
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const reduced = !!context.conditions?.reduced;
        scene.current.reduced = reduced;
        scene.current.progress = 0;
        if (reduced) return;
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .from(".hero-title span", {
            yPercent: 105,
            stagger: 0.12,
            duration: 1,
          })
          .from(".portrait", { y: 32, duration: 1 }, 0.15);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: () => `+=${innerHeight * 1.65}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });
        tl.to(scene.current, { progress: 1, duration: 1 }, 0)
          .fromTo(
            ".portrait",
            { opacity: 1, scale: 1, filter: "grayscale(0) brightness(1)" },
            {
              opacity: 0,
              scale: 0.92,
              filter: "grayscale(1) brightness(1.5)",
              duration: 0.24,
            },
            0.08,
          )
          .fromTo(
            ".sculpture",
            { opacity: 0 },
            { opacity: 1, duration: 0.23 },
            0.1,
          )
          .to(
            ".hero-title",
            { yPercent: -18, opacity: 0, scale: 1.04, duration: 0.28 },
            0.06,
          )
          .fromTo(
            ".hero-meta, .hero-bottom, .hero-stamp",
            { autoAlpha: 1, y: 0 },
            { autoAlpha: 0, y: -20, duration: 0.15 },
            0.05,
          )
          .to(".hero", { backgroundColor: "#181e19", duration: 0.25 }, 0.32)
          .to(".hero-grid", { opacity: 0.12, duration: 0.2 }, 0.32)
          .fromTo(
            ".transition-copy",
            { autoAlpha: 0, y: 55 },
            { autoAlpha: 1, y: 0, duration: 0.15 },
            0.58,
          )
          .to(".sculpture", { opacity: 0.2, duration: 0.15 }, 0.85)
          .to(".sequence-progress", { scaleX: 1, duration: 1 }, 0);
        gsap.utils
          .toArray<HTMLElement>(".project-art")
          .forEach((el) =>
            gsap.fromTo(
              el.querySelector(":scope > div"),
              { y: 35 },
              {
                y: -35,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            ),
          );
        gsap.utils
          .toArray<HTMLElement>(".reveal")
          .forEach((el) =>
            gsap.from(el, {
              y: 35,
              opacity: 0.15,
              duration: 0.9,
              scrollTrigger: {
                trigger: el,
                start: "top 94%",
                toggleActions: "play none none reverse",
              },
            }),
          );
      },
      root,
    );
    return () => mm.revert();
  }, []);
  return (
    <div ref={root}>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Mohamed El-Taher, home">
          ME
          <Arrow />
        </a>
        <a className="header-location" href="#about">
          MOHAMED EL-TAHER <span>CAIRO, EG</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">
            Selected work <span>03</span>
          </a>
          <a className="contact-nav" href="#contact">
            Let’s connect <Arrow />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero" id="top" aria-label="Introduction">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true" />
          <h1 className="hero-title" aria-label={profile.name}>
            <span aria-hidden="true">MOHAMED</span>
            <span aria-hidden="true">EL–TAHER</span>
          </h1>
          <div className="portrait">
            <img
              src={profile.portrait}
              alt="Mohamed El-Taher in a black suit"
              fetchPriority="high"
              width="1143"
              height="1376"
            />
          </div>
          <Sculpture state={scene} />
          <div className="hero-meta">
            <span className="eyebrow">
              <i /> ALWAYS BUILDING. ALWAYS LEARNING.
            </span>
            <p>
              Aspiring .NET
              <br />
              <strong>Backend Developer.</strong>
            </p>
            <span className="micro">C# / ASP.NET CORE / SQL SERVER</span>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>THOUGHTFUL CODE</span>
            <Arrow />
            <span>MEANINGFUL SYSTEMS</span>
          </div>
          <div className="hero-bottom">
            <a className="explore" href="#work">
              Explore my work <span>↓</span>
            </a>
            <span className="scroll-note">
              SCROLL TO DISCOVER
              <br />
              <span>THE THINKING BEHIND THE CODE</span>
            </span>
            <span className="edition">PORTFOLIO — 2026</span>
          </div>
          <div className="transition-copy">
            <span className="eyebrow">01 / THE THINKING BEHIND THE CODE</span>
            <h2>
              Good systems.
              <br />
              Built from
              <br />
              <em>the inside out.</em>
            </h2>
            <p>{profile.introduction}</p>
            <a href="#about">
              A little about me <span>↓</span>
            </a>
          </div>
          <div className="sequence-progress" aria-hidden="true" />
        </section>
        <section className="about section-pad" id="about">
          <div className="section-kicker">
            <span>01 / ABOUT & EXPERTISE</span>
            <span>STRUCTURE BEFORE COMPLEXITY.</span>
          </div>
          <div className="about-intro reveal">
            <div>
              <h2>
                Curious by nature.
                <br />
                <span>Backend by choice.</span>
              </h2>
              <figure className="about-portrait">
                <img
                  src="/assets/portrait.jpg"
                  alt="Mohamed El-Taher in Cairo"
                  width="851"
                  height="1024"
                  loading="lazy"
                />
                <figcaption>
                  MOHAMED EL-TAHER
                  <br />
                  CAIRO, EGYPT
                </figcaption>
              </figure>
            </div>
            <div>
              <p>{profile.introduction}</p>
              <p className="muted">
                My focus is the work behind the interface: clear structure,
                reliable data flow, and code that makes sense to the next person
                who reads it.
              </p>
              <a
                className="text-link"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                Follow the work on GitHub <Arrow />
              </a>
            </div>
          </div>
          <div className="expertise">
            {profile.expertise.map((group, i) => (
              <div className="expertise-row reveal" key={group.title}>
                <span className="micro">0{i + 1}</span>
                <h3>{group.title}</h3>
                <div>
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="work section-pad" id="work">
          <div className="section-kicker">
            <span>02 / SELECTED WORK</span>
            <span>A FEW THINGS I’VE BUILT.</span>
          </div>
          <div className="work-heading reveal">
            <h2>
              From idea
              <br />
              to <em>implementation.</em>
            </h2>
            <span className="work-count">(03)</span>
          </div>
          {profile.projects.map((project) => (
            <article
              className={`project project-${project.id}`}
              key={project.id}
            >
              <div className="project-topline">
                <span>
                  {project.number} / {project.category}
                </span>
                <span>SELECTED PROJECT</span>
              </div>
              <div className="project-layout">
                <div className="project-art">
                  <ProjectArt id={project.id} />
                  <span className="art-caption">{project.artLabel}</span>
                </div>
                <div className="project-info">
                  <span className="project-number">/{project.number}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="contribution">{project.contribution}</p>
                  <ul className="tags" aria-label="Technologies">
                    {project.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a
                    className="project-link"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explore repository <Arrow />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="contact section-pad" id="contact">
          <div className="section-kicker">
            <span>03 / WHAT’S NEXT?</span>
            <span>CAIRO, EGYPT ↗ EVERYWHERE</span>
          </div>
          <span className="eyebrow">
            HAVE AN IDEA, AN OPPORTUNITY, OR JUST A HELLO?
          </span>
          <h2>
            Let’s build
            <br />
            <em>something good.</em>
            <span className="contact-star" aria-hidden="true">
              ✳
            </span>
          </h2>
          <div className="contact-links">
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
          </div>
          <footer>
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <a href="/assets/credits.txt" target="_blank" rel="noreferrer">
              Visual credits ↗
            </a>
            <a href="#top">Back to top ↑</a>
          </footer>
        </section>
      </main>
    </div>
  );
}
