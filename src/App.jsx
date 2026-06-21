import { useState, useEffect, useRef } from "react";

/* ─── Tailwind inline styles helper ─── */
const G = {
  navy: "#060B18",
  navyL: "#0D1526",
  cyan: "#00D4FF",
  purple: "#7B4FFF",
  white: "#F0F4FF",
  muted: "#8892A4",
};

/* ─── Data ─── */
const roles = ["Full Stack Developer", "React Specialist", "UI/UX Enthusiast", "Problem Solver"];

const skills = [
  { name: "React / Next.js", pct: 90, color: G.cyan },
  { name: "JavaScript / TypeScript", pct: 88, color: G.purple },
  { name: "Node.js / Express", pct: 80, color: "#00FF88" },
  { name: "Tailwind CSS", pct: 92, color: "#F59E0B" },
  { name: "MongoDB / Firebase", pct: 75, color: "#FF6B6B" },
  { name: "Git & DevOps", pct: 78, color: G.cyan },
];

const projects = [
  {
    title: "Hostel OutForm Management",
    desc: "A hostel management system that helps students submit outing requests and enables administrators to manage approvals efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    emoji: "🏠",
    color: G.cyan,
    link: "https://kasc-hostel.web.app/",
  },
  {
    title: "Video Streaming Platform",
    desc: "A YouTube-inspired video streaming application with video browsing, playback, search functionality, and responsive design.",
    tech: ["React", "Firebase", "Tailwind CSS", "YouTube API"],
    emoji: "🎥",
    color: G.purple,
    link: "https://cloneyt-ec267.web.app/",
  },
  {
    title: "Food Cart",
    desc: "An online food ordering application featuring menu browsing, cart management, and a seamless user experience.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    emoji: "🍔",
    color: "#F59E0B",
    link: "https://fooddocart.web.app/",
  },
  {
  title: "Personal Portfolio",
  desc: "A modern developer portfolio showcasing my projects, technical skills, experience, and contact information with a responsive and interactive user interface.",
  tech: ["React", "JavaScript", "CSS3", "Firebase"],
  emoji: "💼",
  color: "#00FF88",
  link: "https://karthick-k-portfolio.web.app/",
}
];

/* ─── Typewriter hook ─── */
function useTypewriter(words, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && charIdx === current.length) delay = 1600;
    if (deleting && charIdx === 0) delay = 400;

    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed]);

  return displayed;
}

/* ─── Scroll reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Skill Bar ─── */
function SkillBar({ name, pct, color, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: G.white, fontWeight: 600, fontSize: 14 }}>{name}</span>
        <span style={{ color, fontWeight: 700, fontSize: 13 }}>{pct}%</span>
      </div>
      <div style={{ background: "#1A2540", borderRadius: 8, height: 8, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 8,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            width: visible ? `${pct}%` : "0%",
            transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${delay}s`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, idx }) {
  const [flipped, setFlipped] = useState(false);
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      onClick={() => setFlipped((f) => !f)}
      style={{
        perspective: 1200,
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${idx * 0.15}s, transform 0.6s ease ${idx * 0.15}s`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "120%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            background: G.navyL,
            border: `1px solid ${project.color}33`,
            borderRadius: 20,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: `0 0 30px ${project.color}22`,
          }}
        >
          <div style={{ fontSize: 52 }}>{project.emoji}</div>
          <div>
            <div style={{ color: project.color, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
              Project
            </div>
            <div style={{ color: G.white, fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>
              {project.title}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tech.map((t) => (
                <span key={t} style={{ background: `${project.color}18`, color: project.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ color: G.muted, fontSize: 12, marginTop: 12 }}>Tap to reveal →</div>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${project.color}22, ${G.navyL})`,
            border: `1px solid ${project.color}55`,
            borderRadius: 20,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: G.white, fontSize: 16, lineHeight: 1.7 }}>{project.desc}</div>
          <a
            href={project.link}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "inline-block",
              background: `linear-gradient(90deg, ${project.color}, ${project.color}bb)`,
              color: G.navy,
              padding: "12px 28px",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              textAlign: "center",
              boxShadow: `0 6px 20px ${project.color}44`,
            }}
          >
            View Project ↗
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating particle ─── */
function Particle({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ─── Avatar Card (interactive) ─── */
const badgeData = [
  { emoji: "⚛️", label: "React", angle: -125, color: G.cyan, dur: 3.4, delay: 0 },
  { emoji: "🚀", label: "Next.js", angle: -35, color: G.purple, dur: 3.9, delay: 0.4 },
  { emoji: "🎨", label: "UI/UX", angle: 50, color: "#F59E0B", dur: 3.6, delay: 0.8 },
  { emoji: "🔥", label: "Node.js", angle: 145, color: "#00FF88", dur: 4.1, delay: 0.2 },
];

function AvatarCard() {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [activeBadge, setActiveBadge] = useState(null);

  const handleMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 18, y: -py * 18 });
  };
  const reset = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  // Radius (in px) at which badges orbit around the avatar center
  const R = 148;

  return (
    <div
      ref={wrapRef}
      className="hero-avatar-wrap"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{
        flex: "0 0 360px",
        height: 360,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Orbiting dashed ring */}
      <div style={{
        position: "absolute",
        width: 320,
        height: 320,
        borderRadius: "50%",
        border: `1px dashed ${G.cyan}33`,
        animation: "spin 20s linear infinite",
        transition: "border-color 0.3s",
        borderColor: hovered ? `${G.cyan}66` : `${G.cyan}33`,
      }} />
      <style>{`@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }`}</style>

      {/* Tilt stage — perfectly centered, perspective-driven */}
      <div
        style={{
          position: "relative",
          width: 260,
          height: 260,
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.04 : 1})`,
          transition: "transform 0.25s ease-out",
        }}
      >
        {/* Avatar container */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${G.cyan}33, ${G.purple}33)`,
          border: `3px solid ${G.cyan}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 100,
          animation: "float 4s ease-in-out infinite",
          boxShadow: hovered
            ? `0 0 80px ${G.cyan}55, 0 0 140px ${G.purple}33`
            : `0 0 60px ${G.cyan}33, 0 0 120px ${G.purple}22`,
          transition: "box-shadow 0.3s",
        }}>
          👨‍💻
        </div>

        {/* Floating badges — evenly placed around the avatar, perfectly centered via translate(-50%,-50%) */}
        {badgeData.map((b) => {
          const rad = (b.angle * Math.PI) / 180;
          const bx = Math.cos(rad) * R;
          const by = Math.sin(rad) * R;
          const active = activeBadge === b.label;
          return (
            <div
              key={b.label}
              onMouseEnter={() => setActiveBadge(b.label)}
              onMouseLeave={() => setActiveBadge(null)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                background: active ? `${b.color}22` : G.navyL,
                border: `1px solid ${b.color}${active ? "bb" : "55"}`,
                borderRadius: 12,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                color: b.color,
                whiteSpace: "nowrap",
                boxShadow: active ? `0 6px 26px ${b.color}55` : `0 4px 20px ${b.color}22`,
                zIndex: active ? 4 : 2,
                cursor: "default",
                transformOrigin: "center",
                transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                transform: `translate(-50%, -50%) translate(${bx}px, ${by}px) scale(${active ? 1.15 : 1})`,
                animation: `float ${b.dur}s ease-in-out infinite ${b.delay}s`,
              }}
            >
              <span>{b.emoji}</span> {b.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function Nav({ active }) {
  const links = ["Home", "About", "Skills", "Projects", "Contact"];
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="navbar">
        <a href="#home" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22, textDecoration: "none" }}>
          <span style={{ color: G.cyan }}>K</span>
          <span style={{ color: G.white }}>arthick K</span>
          <span style={{ color: G.purple }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", gap: 32 }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                color: active === l.toLowerCase() ? G.cyan : G.muted,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 0.5,
                transition: "color 0.2s",
                borderBottom: active === l.toLowerCase() ? `2px solid ${G.cyan}` : "2px solid transparent",
                paddingBottom: 2,
              }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Burger button — only visible on mobile via CSS */}
        <button
          className={`burger-btn ${open ? "burger-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? "drawer-open" : ""}`}>
        <div className="mobile-drawer-glow" />
        {links.map((l, i) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            onClick={() => setOpen(false)}
            className="mobile-link"
            style={{
              color: active === l.toLowerCase() ? G.cyan : G.white,
              transitionDelay: open ? `${i * 0.06 + 0.1}s` : "0s",
            }}
          >
            <span className="mobile-link-index">0{i + 1}</span>
            {l}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: 24 }}>
          Say Hello 👋
        </a>
      </div>

      {/* Backdrop */}
      <div className={`mobile-backdrop ${open ? "backdrop-open" : ""}`} onClick={() => setOpen(false)} />
    </>
  );
}

/* ─── Main App ─── */
export default function App() {
  const typed = useTypewriter(roles);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [cursorVisible, setCursorVisible] = useState(false);

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const leave = () => setCursorVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const [aboutRef, aboutVisible] = useReveal();
  const [contactRef, contactVisible] = useReveal();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: G.navy, color: G.white, minHeight: "100vh", overflowX: "hidden" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${G.navy}; }
        ::-webkit-scrollbar-thumb { background: ${G.cyan}44; border-radius: 3px; }
        ::selection { background: ${G.cyan}44; color: ${G.white}; }
        
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2);opacity:0} }
        @keyframes orbit { 0%{transform:rotate(0deg) translateX(120px)} 100%{transform:rotate(360deg) translateX(120px)} }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        
        .glow-text { 
          background: linear-gradient(135deg, ${G.cyan}, ${G.purple}, #FF6B6B, ${G.cyan});
          background-size: 300% 300%;
          animation: gradient-shift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,212,255,0.15);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, ${G.cyan}, ${G.purple});
          color: ${G.navy};
          padding: 14px 36px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 15px;
          text-decoration: none;
          display: inline-block;
          letter-spacing: 0.5px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 8px 32px rgba(0,212,255,0.3);
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 14px 40px rgba(0,212,255,0.45);
        }
        
        .btn-outline {
          background: transparent;
          color: ${G.cyan};
          padding: 13px 34px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          display: inline-block;
          border: 2px solid ${G.cyan}55;
          transition: all 0.2s;
          cursor: pointer;
        }
        .btn-outline:hover {
          border-color: ${G.cyan};
          background: ${G.cyan}11;
          transform: translateY(-2px);
        }
        
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${G.cyan};
          margin-bottom: 12px;
        }
        
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          color: ${G.white};
          line-height: 1.15;
          margin-bottom: 16px;
        }
        
        .stat-card {
          background: ${G.navyL};
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          transition: border-color 0.3s, transform 0.3s;
        }
        .stat-card:hover {
          border-color: ${G.cyan}66;
          transform: translateY(-4px);
        }
        
        .contact-input {
          width: 100%;
          background: ${G.navyL};
          border: 1px solid rgba(0,212,255,0.15);
          border-radius: 14px;
          padding: 16px 20px;
          color: ${G.white};
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-input:focus {
          border-color: ${G.cyan}88;
          box-shadow: 0 0 0 3px ${G.cyan}18;
        }
        .contact-input::placeholder { color: ${G.muted}; }
        
        /* ─── Navbar ─── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 48px;
          background: rgba(6,11,24,0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(0,212,255,0.08);
        }

        /* ─── Burger button ─── */
        .burger-btn {
          display: none;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid ${G.cyan}33;
          background: ${G.navyL};
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          padding: 0;
          z-index: 200;
        }
        .burger-btn span {
          width: 18px;
          height: 2px;
          border-radius: 2px;
          background: ${G.cyan};
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .burger-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .burger-open span:nth-child(2) { opacity: 0; }
        .burger-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ─── Mobile drawer ─── */
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0;
          height: 100vh;
          width: min(78vw, 320px);
          background: ${G.navyL};
          border-left: 1px solid ${G.cyan}22;
          z-index: 150;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: 0 36px;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(.4,0,.2,1);
          overflow: hidden;
        }
        .mobile-drawer.drawer-open { transform: translateX(0); }
        .mobile-drawer-glow {
          position: absolute;
          width: 260px; height: 260px;
          background: radial-gradient(circle, ${G.cyan}22 0%, transparent 70%);
          top: -60px; right: -80px;
          pointer-events: none;
        }
        .mobile-link {
          display: flex;
          align-items: baseline;
          gap: 12px;
          text-decoration: none;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          padding: 14px 0;
          border-bottom: 1px solid ${G.cyan}11;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.35s ease, transform 0.35s ease, color 0.2s;
        }
        .drawer-open .mobile-link { opacity: 1; transform: translateX(0); }
        .mobile-link-index {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: ${G.cyan};
          font-weight: 600;
        }
        .mobile-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6,11,24,0.6);
          backdrop-filter: blur(2px);
          z-index: 120;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.35s ease;
        }
        .mobile-backdrop.backdrop-open { opacity: 1; visibility: visible; }

        /* ─── Responsive breakpoints ─── */
        @media (max-width: 1024px) {
          .navbar { padding: 16px 32px; }
          .hero-section, .section-pad { padding-left: 32px !important; padding-right: 32px !important; }
        }

        @media (max-width: 768px) {
          .navbar { padding: 14px 24px; }
          .nav-links { display: none !important; }
          .burger-btn { display: flex !important; }

          .section-pad { padding: 80px 24px !important; }
          .hero-section { padding-left: 24px !important; padding-right: 24px !important; }

          .hero-grid { flex-direction: column !important; gap: 56px !important; text-align: center; }
          .hero-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
          .hero-cta { justify-content: center !important; }
          .hero-socials { justify-content: center !important; }

          .about-grid { flex-direction: column !important; gap: 40px !important; }
          .about-grid > div:first-child { flex: 1 1 auto !important; width: 100%; max-width: 420px; }

          .projects-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 12px !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .hero-name { font-size: clamp(40px, 11vw, 64px) !important; }
          .hero-avatar-wrap { transform: scale(0.82); margin: -30px 0 -20px; }
          .contact-grid-2 { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 480px) {
          .section-pad { padding: 64px 18px !important; }
          .hero-section { padding-left: 18px !important; padding-right: 18px !important; }
          .stat-card { padding: 18px 10px !important; }
          .navbar { padding: 12px 16px; }
        }
      `}</style>

      {/* Custom cursor */}
      <div style={{
        position: "fixed",
        left: mousePos.x - 12,
        top: mousePos.y - 12,
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: `2px solid ${G.cyan}`,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: cursorVisible ? 0.8 : 0,
        transition: "left 0.08s ease, top 0.08s ease, opacity 0.2s",
        mixBlendMode: "screen",
      }} />
      <div style={{
        position: "fixed",
        left: mousePos.x - 4,
        top: mousePos.y - 4,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: G.cyan,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: cursorVisible ? 1 : 0,
        transition: "left 0.03s ease, top 0.03s ease, opacity 0.2s",
      }} />

      <Nav active={activeSection} />

      {/* ── HERO ── */}
      <section id="home" className="hero-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80, paddingLeft: 48, paddingRight: 48 }}>
        {/* Background particles */}
        {[...Array(18)].map((_, i) => (
          <Particle key={i} style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            background: i % 3 === 0 ? G.cyan : i % 3 === 1 ? G.purple : "#fff",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: 0.3 + Math.random() * 0.4,
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 3}s`,
          }} />
        ))}

        {/* Big gradient orb */}
        <div style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${G.cyan}18 0%, ${G.purple}10 40%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", width: "100%", position: "relative", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 80 }}>
            {/* Left */}
            <div style={{ flex: 1 }}>
              <div style={{ color: G.cyan, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF88", boxShadow: "0 0 8px #00FF88", animation: "twinkle 1.5s ease-in-out infinite" }} />
                Available for opportunities
              </div>

              <h1 className="hero-name" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(48px, 7vw, 82px)", fontWeight: 800, lineHeight: 1.08, marginBottom: 12 }}>
                Hi, I'm <br />
                <span className="glow-text">Karthick K</span>
              </h1>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(16px, 2.5vw, 22px)", color: G.muted, marginBottom: 32, minHeight: 36, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: G.cyan }}>{">"}</span>
                <span style={{ color: G.white }}>{typed}</span>
                <span style={{ color: G.cyan, animation: "twinkle 0.8s step-end infinite" }}>|</span>
              </div>

              <p style={{ color: G.muted, fontSize: 17, lineHeight: 1.8, maxWidth: 520, marginBottom: 44 }}>
                I craft seamless digital experiences — turning ideas into fast, beautiful, and scalable web applications. Passionate about clean code and intuitive interfaces.
              </p>

              <div className="hero-cta" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#projects" className="btn-primary">View My Work</a>
                <a href="#contact" className="btn-outline">Let's Talk</a>
              </div>

              <div className="hero-socials" style={{ display: "flex", gap: 20, marginTop: 48 }}>
               {[
  { name: "GitHub", href: "https://github.com/Karthick1717" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/karthickk2004" },
  { name: "Email", href: "mailto:tapasya.professional@gmail.com" },
].map((s) => (
  <a
    key={s.name}
    href={s.href}
    target={s.name !== "Email" ? "_blank" : undefined}
    rel="noopener noreferrer"
    style={{
      color: G.muted,
      textDecoration: "none",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: 0.5,
      transition: "color 0.2s",
      padding: "8px 0",
      borderBottom: `1px solid transparent`,
    }}
    onMouseEnter={(e) => {
      e.target.style.color = G.cyan;
      e.target.style.borderBottomColor = G.cyan;
    }}
    onMouseLeave={(e) => {
      e.target.style.color = G.muted;
      e.target.style.borderBottomColor = "transparent";
    }}
  >
    {s.name} ↗
  </a>
))}
              </div>
            </div>

            {/* Right - Avatar/Visual */}
            <AvatarCard />
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ color: G.muted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${G.cyan}, transparent)`, animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ padding: "120px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div ref={aboutRef} className="about-grid" style={{ display: "flex", gap: 80, alignItems: "center" }}>
          {/* Code block */}
          <div style={{
            flex: "0 0 420px",
            background: G.navyL,
            border: `1px solid ${G.cyan}22`,
            borderRadius: 24,
            overflow: "hidden",
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            boxShadow: `0 0 40px ${G.cyan}18`,
          }}>
            {/* Window chrome */}
            <div style={{ background: "#0D1526", padding: "14px 20px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${G.cyan}11` }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
              <span style={{ color: G.muted, fontSize: 12, marginLeft: 8, fontFamily: "JetBrains Mono, monospace" }}>about.js</span>
            </div>
            <div style={{ padding: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 2 }}>
              {[
                { k: "name", v: '"Karthick K"', c: G.cyan },
                { k: "role", v: '"Full Stack Developer"', c: G.cyan },
                { k: "location", v: '"India 🇮🇳"', c: "#00FF88" },
                { k: "experience", v: '"2+ Years"', c: "#F59E0B" },
                { k: "education", v: '"B.E. Computer Science"', c: G.purple },
                { k: "status", v: '"Open to Work ✨"', c: "#FF6B6B" },
                { k: "passion", v: '["React", "NodeJS", "UI/UX"]', c: G.cyan },
              ].map(({ k, v, c }) => (
                <div key={k}>
                  <span style={{ color: G.purple }}>{k}</span>
                  <span style={{ color: G.muted }}>: </span>
                  <span style={{ color: c }}>{v}</span>
                  <span style={{ color: G.muted }}>,</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div style={{
            flex: 1,
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            <div className="section-label">Who I Am</div>
            <h2 className="section-title">Crafting Digital<br /><span style={{ color: G.cyan }}>Experiences</span> with Passion</h2>
            <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.9, marginBottom: 24 }}>
              I'm a dedicated Full Stack Developer based in India with a deep love for building web applications that are both powerful and delightful to use. I believe great software is born at the intersection of clean architecture and thoughtful design.
            </p>
            <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.9, marginBottom: 40 }}>
              When I'm not coding, I'm exploring new technologies, contributing to open source, and finding ways to make the web more accessible and beautiful for everyone.
            </p>

            {/* Stats */}
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { num: "5+", label: "Projects Built" },
                { num: "2+", label: "Years Experience" },
                { num: "100%", label: "Client Satisfaction" },
              ].map(({ num, label }) => (
                <div key={label} className="stat-card">
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, color: G.cyan, lineHeight: 1 }}>{num}</div>
                  <div style={{ color: G.muted, fontSize: 13, marginTop: 6, fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section-pad" style={{ padding: "120px 48px", background: `${G.navyL}88` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="section-label">What I Know</div>
            <h2 className="section-title">My <span style={{ color: G.cyan }}>Technical</span> Expertise</h2>
            <p style={{ color: G.muted, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
              A continuously growing toolkit — always learning, always building.
            </p>
          </div>

          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 80px" }}>
            {skills.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.1} />
            ))}
          </div>

          {/* Tech pills */}
          <div style={{ marginTop: 60, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "Firebase", "Tailwind", "Git", "Docker", "Figma", "REST APIs", "GraphQL"].map((t) => (
              <span key={t} style={{
                background: `${G.navyL}`,
                border: `1px solid ${G.cyan}22`,
                color: G.muted,
                padding: "8px 18px",
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s",
                cursor: "default",
              }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = G.cyan + "88";
                  e.target.style.color = G.white;
                  e.target.style.background = G.cyan + "11";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = G.cyan + "22";
                  e.target.style.color = G.muted;
                  e.target.style.background = G.navyL;
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-pad" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="section-label">What I've Built</div>
            <h2 className="section-title">Featured <span style={{ color: G.cyan }}>Projects</span></h2>
            <p style={{ color: G.muted, fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
              Tap a card to flip it and explore the details.
            </p>
          </div>

          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} idx={i} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <a href="#" className="btn-outline">View All Projects on GitHub ↗</a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ padding: "120px 48px", background: `${G.navyL}88` }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }} ref={contactRef}>
          <div style={{
            textAlign: "center",
            marginBottom: 60,
            opacity: contactVisible ? 1 : 0,
            transform: contactVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Let's <span style={{ color: G.cyan }}>Work Together</span></h2>
            <p style={{ color: G.muted, fontSize: 16, lineHeight: 1.8 }}>
              Have a project in mind or just want to chat? I'm always open to new opportunities and collaborations.
            </p>
          </div>

          <div style={{
            background: G.navyL,
            border: `1px solid ${G.cyan}22`,
            borderRadius: 28,
            padding: 48,
            opacity: contactVisible ? 1 : 0,
            transform: contactVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            boxShadow: `0 0 60px ${G.cyan}0D`,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="contact-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ color: G.muted, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Name</label>
                  <input className="contact-input" placeholder="Your Name" />
                </div>
                <div>
                  <label style={{ color: G.muted, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Email</label>
                  <input className="contact-input" placeholder="your@email.com" type="email" />
                </div>
              </div>
              <div>
                <label style={{ color: G.muted, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Subject</label>
                <input className="contact-input" placeholder="Project Inquiry" />
              </div>
              <div>
                <label style={{ color: G.muted, fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>Message</label>
                <textarea className="contact-input" placeholder="Tell me about your project..." rows={5} style={{ resize: "vertical" }} />
              </div>
              <button className="btn-primary" style={{ alignSelf: "flex-start", fontFamily: "'Inter', sans-serif" }}>
                Send Message ✈️
              </button>
            </div>
          </div>

          {/* Social links */}
          <div className="hero-socials" style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
            {[
              { label: "karthiabd1717@gmail.com", icon: "📧" },
              { label: "github.com/kkarthick2004", icon: "🐙" },
              { label: "linkedin.com/in/karthickk2004", icon: "💼" },
            ].map(({ label, icon }) => (
              <a key={label} href="#" style={{
                color: G.muted,
                textDecoration: "none",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 16px",
                borderRadius: 12,
                border: `1px solid ${G.cyan}22`,
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = G.cyan + "66";
                  e.currentTarget.style.color = G.white;
                  e.currentTarget.style.background = G.cyan + "0D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = G.cyan + "22";
                  e.currentTarget.style.color = G.muted;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {icon} {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${G.cyan}11`, padding: "32px 48px", textAlign: "center" }}>
        <p style={{ color: G.muted, fontSize: 13 }}>
          Designed & Built with <span style={{ color: "#FF6B6B" }}></span> by{" "}
          <span style={{ color: G.cyan, fontWeight: 700 }}>Karthick K</span>
          {" "}· {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
