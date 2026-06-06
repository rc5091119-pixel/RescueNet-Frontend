import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES  (injected once into <head>)
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --green:      #22c55e;
  --green-lo:   rgba(34,197,94,0.12);
  --green-mid:  rgba(34,197,94,0.25);
  --green-glow: rgba(34,197,94,0.18);

  --bg:  #07110a;
  --bg2: #0b1a10;
  --bg3: #12281a;

  --text:  #EEF0F3;
  --muted: #94a3b8;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--display);
  overflow-x: hidden;
}

/* ── scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--bg3); border-radius: 2px; }

/* ── noise grain ── */
.rn-grain {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
}

/* ── grid bg ── */
.rn-grid {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 52px 52px;
}

/* ════════════════ NAVBAR ════════════════ */
.rn-nav {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  height: 64px;
  background: rgba(7,9,12,0.88);
  backdrop-filter: blur(14px) saturate(1.6);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s;
}

.rn-nav-logo {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: var(--text);
}

.rn-nav-logo-icon {
  width: 34px; height: 34px;
  background: var(--red);
  border-radius: 9px;
  display: grid; place-items: center;
  box-shadow: 0 0 20px var(--red-glow);
  font-size: 16px;
  flex-shrink: 0;
}

.rn-nav-logo-text {
  font-size: 18px; font-weight: 800;
  letter-spacing: -0.4px;
}

.rn-nav-logo-text span { color: var(--red); }

.rn-nav-links {
  display: flex; align-items: center; gap: 6px;
}

.rn-nav-link {
  padding: 7px 14px;
  font-size: 13px; font-weight: 600;
  color: var(--muted);
  text-decoration: none;
  border-radius: 7px;
  transition: color 0.15s, background 0.15s;
  cursor: pointer;
  background: none; border: none;
  font-family: var(--display);
}

.rn-nav-link:hover { color: var(--text); background: var(--bg3); }

.rn-nav-cta {
  display: flex; align-items: center; gap: 10px;
}

.rn-btn-outline {
  padding: 8px 20px;
  border: 1px solid var(--border-hi);
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-family: var(--display);
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.rn-btn-outline:hover { border-color: rgba(255,255,255,0.28); background: var(--bg3); }

.rn-btn-primary {
  padding: 9px 22px;
  border: none;
  border-radius: 8px;
  background: var(--red);
  color: #fff;
  font-family: var(--display);
  font-size: 13px; font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 18px var(--red-glow);
  transition: all 0.2s;
  letter-spacing: 0.2px;
}

.rn-btn-primary:hover { background: #C91D24; transform: translateY(-1px); box-shadow: 0 6px 26px rgba(232,34,42,0.32); }
.rn-btn-primary:active { transform: translateY(0); }

/* ════════════════ HERO ════════════════ */
.rn-hero {
  position: relative;
  min-height: 100vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  overflow: hidden;
  z-index: 1;
}

/* big radial glow behind hero */
.rn-hero::before {
  content: '';
  position: absolute;
  top: -10%; left: 50%;
  transform: translateX(-50%);
  width: 900px; height: 700px;
  background: radial-gradient(ellipse at center, rgba(232,34,42,0.10) 0%, transparent 70%);
  pointer-events: none;
}

.rn-hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px;
  background: var(--red-lo);
  border: 1px solid var(--red-mid);
  border-radius: 20px;
  font-family: var(--mono);
  font-size: 11px;
  color: #ff9090;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 28px;
  animation: fadeUp 0.5s 0.1s both;
}

.rn-hero-badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--red);
  animation: blink 1.4s ease-in-out infinite;
}

@keyframes blink {
  0%,100% { opacity:1; } 50% { opacity:0.2; }
}

.rn-hero-title {
  font-size: clamp(52px, 8vw, 92px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -3px;
  margin-bottom: 18px;
  animation: fadeUp 0.5s 0.2s both;
}

.rn-hero-title .accent { color: var(--red); }
.rn-hero-title .dim { color: var(--muted); }

.rn-hero-sub {
  font-size: clamp(15px, 2vw, 18px);
  color: var(--muted);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 44px;
  font-family: var(--mono);
  font-weight: 300;
  animation: fadeUp 0.5s 0.3s both;
}

.rn-hero-actions {
  display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;
  animation: fadeUp 0.5s 0.4s both;
}

.rn-hero-btn-main {
  padding: 15px 36px;
  background: var(--red);
  border: none; border-radius: 10px;
  color: #fff;
  font-family: var(--display);
  font-size: 15px; font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 30px var(--red-glow);
  transition: all 0.2s;
  display: flex; align-items: center; gap: 8px;
}

.rn-hero-btn-main:hover { background: #C91D24; transform: translateY(-2px); box-shadow: 0 10px 40px rgba(232,34,42,0.35); }

.rn-hero-btn-sec {
  padding: 15px 36px;
  background: transparent;
  border: 1px solid var(--border-hi);
  border-radius: 10px;
  color: var(--text);
  font-family: var(--display);
  font-size: 15px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.rn-hero-btn-sec:hover { border-color: rgba(255,255,255,0.3); background: var(--bg3); }

/* hero stats strip */
.rn-hero-stats {
  display: flex; align-items: center; gap: 0;
  margin-top: 64px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--bg2);
  overflow: hidden;
  animation: fadeUp 0.5s 0.5s both;
  width: fit-content;
  max-width: 100%;
}

.rn-stat {
  padding: 20px 36px;
  text-align: center;
  border-right: 1px solid var(--border);
}

.rn-stat:last-child { border-right: none; }

.rn-stat-val {
  font-size: 30px; font-weight: 800;
  color: var(--red); letter-spacing: -1px;
}

.rn-stat-label {
  font-size: 10px; font-family: var(--mono);
  color: var(--muted); text-transform: uppercase;
  letter-spacing: 1.2px; margin-top: 4px;
}

/* scroll indicator */
.rn-scroll-hint {
  margin-top: 48px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  color: var(--muted);
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 1.5px; text-transform: uppercase;
  animation: fadeUp 0.5s 0.6s both;
}

.rn-scroll-arrow {
  width: 1px; height: 36px;
  background: linear-gradient(to bottom, var(--muted), transparent);
  animation: scrollDrop 1.6s ease-in-out infinite;
}

@keyframes scrollDrop {
  0%,100% { transform: scaleY(1); opacity:0.5; }
  50%      { transform: scaleY(0.4); opacity:1; }
}

/* ════════════════ SECTION WRAPPER ════════════════ */
.rn-section {
  position: relative; z-index: 1;
  padding: 100px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.rn-section-tag {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--mono); font-size: 11px;
  color: var(--red); letter-spacing: 1.8px; text-transform: uppercase;
  margin-bottom: 16px;
}

.rn-section-tag::before {
  content: '';
  display: inline-block;
  width: 18px; height: 1px;
  background: var(--red);
}

.rn-section-title {
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 800;
  letter-spacing: -1.5px;
  margin-bottom: 16px;
  line-height: 1.1;
}

.rn-section-title .accent { color: var(--red); }

.rn-section-sub {
  font-size: 15px; font-family: var(--mono);
  color: var(--muted); line-height: 1.6;
  max-width: 520px;
  font-weight: 300;
}

/* ════════════════ HOW IT WORKS ════════════════ */
.rn-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 56px;
}

.rn-step {
  background: var(--bg2);
  padding: 36px 28px;
  position: relative;
  transition: background 0.2s;
}

.rn-step:hover { background: var(--bg3); }

.rn-step-num {
  font-family: var(--mono); font-size: 11px;
  color: var(--red); letter-spacing: 2px;
  margin-bottom: 20px;
}

.rn-step-icon {
  width: 52px; height: 52px;
  background: var(--red-lo);
  border: 1px solid var(--red-mid);
  border-radius: 14px;
  display: grid; place-items: center;
  font-size: 24px;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.rn-step:hover .rn-step-icon {
  transform: scale(1.08);
  box-shadow: 0 8px 24px var(--red-glow);
}

.rn-step-title {
  font-size: 17px; font-weight: 700;
  letter-spacing: -0.3px;
  margin-bottom: 10px;
}

.rn-step-text {
  font-size: 13px; font-family: var(--mono);
  color: var(--muted); line-height: 1.6; font-weight: 300;
}

/* connector arrow */
.rn-step::after {
  content: '→';
  position: absolute;
  top: 36px; right: -10px;
  color: var(--red); font-size: 16px;
  z-index: 2;
}

.rn-step:last-child::after { display: none; }

/* ════════════════ WHY RESCUENET ════════════════ */
.rn-why-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 56px;
}

.rn-why-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.rn-why-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--red), transparent);
  opacity: 0;
  transition: opacity 0.2s;
}

.rn-why-card:hover { border-color: var(--border-hi); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
.rn-why-card:hover::before { opacity: 1; }

.rn-why-header {
  display: flex; align-items: flex-start; gap: 16px;
  margin-bottom: 16px;
}

.rn-why-icon {
  width: 48px; height: 48px; flex-shrink: 0;
  background: var(--red-lo);
  border: 1px solid var(--red-mid);
  border-radius: 12px;
  display: grid; place-items: center;
  font-size: 22px;
}

.rn-why-title {
  font-size: 18px; font-weight: 700;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
}

.rn-why-tag {
  font-family: var(--mono); font-size: 10px;
  color: var(--red); letter-spacing: 1.5px; text-transform: uppercase;
}

.rn-why-text {
  font-family: var(--mono); font-size: 13px;
  color: var(--muted); line-height: 1.65; font-weight: 300;
}

/* ════════════════ TECH STRIP ════════════════ */
.rn-tech-strip {
  position: relative; z-index: 1;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--bg2);
  padding: 28px 24px;
  overflow: hidden;
}

.rn-tech-inner {
  display: flex; align-items: center; justify-content: center;
  gap: 40px; flex-wrap: wrap;
  max-width: 1000px; margin: 0 auto;
}

.rn-tech-item {
  display: flex; align-items: center; gap: 9px;
  font-family: var(--mono); font-size: 12px;
  color: var(--muted); letter-spacing: 0.5px;
}

.rn-tech-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--red); opacity: 0.7;
}

/* ════════════════ CTA BANNER ════════════════ */
.rn-cta {
  position: relative; z-index: 1;
  padding: 80px 24px;
  text-align: center;
  overflow: hidden;
}

.rn-cta-card {
  max-width: 800px; margin: 0 auto;
  background: var(--bg2);
  border: 1px solid var(--border-hi);
  border-radius: 24px;
  padding: 64px 40px;
  position: relative;
  overflow: hidden;
}

.rn-cta-card::before {
  content: '';
  position: absolute; top: -60px; left: 50%;
  transform: translateX(-50%);
  width: 500px; height: 300px;
  background: radial-gradient(ellipse, rgba(232,34,42,0.10) 0%, transparent 70%);
  pointer-events: none;
}

.rn-cta-label {
  font-family: var(--mono); font-size: 11px;
  color: var(--red); letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 18px;
}

.rn-cta-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 800; letter-spacing: -1.5px;
  line-height: 1.1; margin-bottom: 16px;
}

.rn-cta-title .accent { color: var(--red); }

.rn-cta-sub {
  font-family: var(--mono); font-size: 14px;
  color: var(--muted); line-height: 1.6;
  max-width: 460px; margin: 0 auto 36px; font-weight: 300;
}

.rn-cta-buttons {
  display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;
}

/* ════════════════ FOOTER ════════════════ */
.rn-footer {
  position: relative; z-index: 1;
  border-top: 1px solid var(--border);
  padding: 48px 40px 32px;
}

.rn-footer-top {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 40px; flex-wrap: wrap;
  margin-bottom: 40px;
  max-width: 1200px; margin-left: auto; margin-right: auto;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--border);
}

.rn-footer-brand { max-width: 300px; }

.rn-footer-logo {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 14px;
}

.rn-footer-logo-icon {
  width: 30px; height: 30px; background: var(--red);
  border-radius: 7px; display: grid; place-items: center;
  font-size: 14px;
}

.rn-footer-logo-text {
  font-size: 16px; font-weight: 800; letter-spacing: -0.3px;
}

.rn-footer-logo-text span { color: var(--red); }

.rn-footer-tagline {
  font-family: var(--mono); font-size: 12px;
  color: var(--muted); line-height: 1.6; font-weight: 300;
}

.rn-footer-col-title {
  font-size: 12px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--muted); margin-bottom: 14px;
}

.rn-footer-links { display: flex; flex-direction: column; gap: 10px; }

.rn-footer-link {
  font-family: var(--mono); font-size: 12px;
  color: var(--muted); text-decoration: none;
  transition: color 0.15s;
}

.rn-footer-link:hover { color: var(--text); }

.rn-footer-bottom {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
  max-width: 1200px; margin: 0 auto;
}

.rn-footer-copy {
  font-family: var(--mono); font-size: 11px;
  color: var(--muted); letter-spacing: 0.3px;
}

.rn-footer-copy span { color: var(--red); }

.rn-footer-status {
  display: flex; align-items: center; gap: 7px;
  font-family: var(--mono); font-size: 11px;
  color: #4ade80;
}

.rn-footer-status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #4ade80;
  animation: blink 2s ease-in-out infinite;
}

/* ════════════════ ANIMATIONS ════════════════ */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}

.rn-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}

.rn-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* stagger children */
.rn-stagger > *:nth-child(1) { transition-delay: 0.0s; }
.rn-stagger > *:nth-child(2) { transition-delay: 0.08s; }
.rn-stagger > *:nth-child(3) { transition-delay: 0.16s; }
.rn-stagger > *:nth-child(4) { transition-delay: 0.24s; }

/* ════════════════ RESPONSIVE ════════════════ */
@media (max-width: 900px) {
  .rn-nav-links { display: none; }
  .rn-steps { grid-template-columns: 1fr 1fr; }
  .rn-step::after { display: none; }
  .rn-why-grid { grid-template-columns: 1fr; }
  .rn-stat { padding: 18px 22px; }
  .rn-stat-val { font-size: 24px; }
}

@media (max-width: 600px) {
  .rn-nav { padding: 0 20px; }
  .rn-steps { grid-template-columns: 1fr; }
  .rn-hero-stats { flex-direction: column; width: 100%; }
  .rn-stat { border-right: none; border-bottom: 1px solid var(--border); }
  .rn-stat:last-child { border-bottom: none; }
  .rn-footer-top { flex-direction: column; }
  .rn-hero-title { letter-spacing: -2px; }
}
`;

/* ─────────────────────────────────────────────
   HOOK: intersection observer for reveal
───────────────────────────────────────────── */
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".rn-reveal");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
            { threshold: 0.12 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useReveal();

    return (
        <>
            <style>{CSS}</style>
            <div className="rn-grain" />
            <div className="rn-grid" />

            {/* ══════════ NAVBAR ══════════ */}
            <nav className="rn-nav">
                <a className="rn-nav-logo" href="#top">
                    <div className="rn-nav-logo-icon">🛡</div>
                    <div className="rn-nav-logo-text">Rescue<span>Net</span></div>
                </a>

                <div className="rn-nav-links">

                    {token && (
                        <button
                            className="rn-nav-link"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>
                    )}

                    {["How It Works", "Features", "About"].map((l) => (
                        <a
                            key={l}
                            className="rn-nav-link"
                            href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                        >
                            {l}
                        </a>
                    ))}
                </div>

                <div className="rn-nav-cta">

                    {token ? (
                        <button
                            className="rn-btn-primary"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard →
                        </button>
                    ) : (
                        <>
                            <button
                                className="rn-btn-outline"
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </button>

                            <button
                                className="rn-btn-primary"
                                onClick={() => navigate("/register")}
                            >
                                Join as Volunteer →
                            </button>
                        </>
                    )}

                </div>
            </nav>

            {/* ══════════ HERO ══════════ */}
            <section className="rn-hero" id="top">
                <div className="rn-hero-badge">
                    <span className="rn-hero-badge-dot" />
                    Emergency Response Network · Live
                </div>

                <h1 className="rn-hero-title">
                    When every second<br />
                    <span className="accent">matters</span>
                    <span className="dim">,</span><br />
                    we connect.
                </h1>

                <p className="rn-hero-sub">
                    Connect people in crisis with nearby volunteers through instant SOS alerts,
                    real-time location sharing, and coordinated rescue communication.
                </p>

                <div className="rn-hero-actions">
                    <button className="rn-hero-btn-main" onClick={() => navigate("/register")}>
                        🚑 Become a Volunteer
                    </button>
                    <button className="rn-hero-btn-sec" onClick={() => navigate("/login")}>
                        Sign In →
                    </button>
                </div>

                <div className="rn-hero-stats">
                    {[
                        { val: "500+", label: "Concurrent Users" },
                        { val: "<1 km", label: "Alert Radius" },
                        { val: "15", label: "Responders / SOS" },
                        { val: "35%", label: "Faster DB Queries" },
                    ].map((s) => (
                        <div className="rn-stat" key={s.label}>
                            <div className="rn-stat-val">{s.val}</div>
                            <div className="rn-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="rn-scroll-hint">
                    <span>Scroll to explore</span>
                    <div className="rn-scroll-arrow" />
                </div>
            </section>

            {/* ══════════ TECH STRIP ══════════ */}
            <div className="rn-tech-strip">
                <div className="rn-tech-inner">
                    {["Go (Golang)", "PostgreSQL", "JWT Auth", "Haversine Engine", "Goroutines", "React + Vite", "REST API"].map((t) => (
                        <div className="rn-tech-item" key={t}>
                            <span className="rn-tech-dot" />
                            {t}
                        </div>
                    ))}
                </div>
            </div>

            {/* ══════════ HOW IT WORKS ══════════ */}
            <div id="how-it-works">
                <div className="rn-section">
                    <div className="rn-reveal">
                        <div className="rn-section-tag">Process</div>
                        <h2 className="rn-section-title">
                            How <span className="accent">RescueNet</span> Works
                        </h2>
                        <p className="rn-section-sub">
                            From the moment you hit SOS — to when help arrives. Four steps, real time.
                        </p>
                    </div>

                    <div className="rn-steps rn-stagger rn-reveal">
                        {[
                            { num: "01", icon: "🚨", title: "Trigger Alert", text: "Tap SOS — your emergency is broadcast with GPS coordinates instantly to the server." },
                            { num: "02", icon: "📍", title: "Proximity Match", text: "Haversine algorithm scans all nearby users within 1 km and selects the closest 14 responders." },
                            { num: "03", icon: "👥", title: "Rescue Team Forms", text: "Nearby volunteers receive a push alert and can accept the mission in one tap." },
                            { num: "04", icon: "💬", title: "Live Coordination", text: "An auto-created group chat connects you and all responders until the crisis is resolved." },
                        ].map((s) => (
                            <div className="rn-step" key={s.num}>
                                <div className="rn-step-num">STEP {s.num}</div>
                                <div className="rn-step-icon">{s.icon}</div>
                                <div className="rn-step-title">{s.title}</div>
                                <p className="rn-step-text">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════ WHY RESCUENET ══════════ */}
            <div id="features">
                <div className="rn-section">
                    <div className="rn-reveal">
                        <div className="rn-section-tag">Capabilities</div>
                        <h2 className="rn-section-title">
                            Why <span className="accent">RescueNet?</span>
                        </h2>
                        <p className="rn-section-sub">
                            Built for real emergencies — not just demos. Every feature solves a life-critical problem.
                        </p>
                    </div>

                    <div className="rn-why-grid rn-stagger rn-reveal">
                        {[
                            {
                                icon: "⚡",
                                tag: "Response Time",
                                title: "Instant Alerts",
                                text: "Emergency notifications hit nearby responders in under a second — powered by Go's goroutine-based concurrency that handles 500+ simultaneous users without breaking a sweat.",
                            },
                            {
                                icon: "📍",
                                tag: "Navigation",
                                title: "Live Location Sharing",
                                text: "GPS coordinates are transmitted automatically on SOS. Responders see the exact location and can navigate directly — no manual address entry needed under pressure.",
                            },
                            {
                                icon: "👥",
                                tag: "Community",
                                title: "Volunteer Network",
                                text: "Community-driven response means there's always someone nearby. Volunteers are ranked by proximity so the closest help always gets dispatched first.",
                            },
                            {
                                icon: "💬",
                                tag: "Coordination",
                                title: "Group Communication",
                                text: "Auto-created group chat with the victim + up to 14 nearest responders. Persisted in PostgreSQL. Read-only after resolution for full incident audit trail.",
                            },
                        ].map((c) => (
                            <div className="rn-why-card" key={c.title}>
                                <div className="rn-why-header">
                                    <div className="rn-why-icon">{c.icon}</div>
                                    <div>
                                        <div className="rn-why-tag">{c.tag}</div>
                                        <div className="rn-why-title">{c.title}</div>
                                    </div>
                                </div>
                                <p className="rn-why-text">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════ CTA BANNER ══════════ */}
            <div className="rn-cta rn-reveal" id="about">
                <div className="rn-cta-card">
                    <div className="rn-cta-label">🚑 Ready to respond?</div>
                    <h2 className="rn-cta-title">
                        Be the help<br />someone <span className="accent">desperately</span> needs.
                    </h2>
                    <p className="rn-cta-sub">
                        Join RescueNet today. When an emergency happens near you, you'll be the first to know — and the first to help.
                    </p>
                    <div className="rn-cta-buttons">
                        <button className="rn-hero-btn-main" onClick={() => navigate("/register")}>
                            🛡 Become a Volunteer
                        </button>
                        <button className="rn-hero-btn-sec" onClick={() => navigate("/login")}>
                            I Have an Account →
                        </button>
                    </div>
                </div>
            </div>

            {/* ══════════ FOOTER ══════════ */}
            <footer className="rn-footer">
                <div className="rn-footer-top">
                    <div className="rn-footer-brand">
                        <div className="rn-footer-logo">
                            <div className="rn-footer-logo-icon">🛡</div>
                            <div className="rn-footer-logo-text">Rescue<span>Net</span></div>
                        </div>
                        <p className="rn-footer-tagline">
                            Emergency Response Coordination Platform.<br />
                            Real-time. Community-driven. Built for when it matters.
                        </p>
                    </div>

                    <div>
                        <div className="rn-footer-col-title">Platform</div>
                        <div className="rn-footer-links">
                            {["Register", "Login", "How It Works", "Features"].map((l) => (
                                <a key={l} className="rn-footer-link" href="#">{l}</a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="rn-footer-col-title">Tech Stack</div>
                        <div className="rn-footer-links">
                            {["Go Backend", "PostgreSQL", "JWT Auth", "React + Vite"].map((l) => (
                                <span key={l} className="rn-footer-link" style={{ cursor: "default" }}>{l}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="rn-footer-col-title">Project</div>
                        <div className="rn-footer-links">
                            <a className="rn-footer-link" href="https://github.com/rc5091119-pixel/RescueNet" target="_blank" rel="noreferrer">Backend Repo</a>
                            <a className="rn-footer-link" href="https://github.com/rc5091119-pixel/rescuenet-frontend" target="_blank" rel="noreferrer">Frontend Repo</a>
                            <span className="rn-footer-link" style={{ cursor: "default" }}>NIT Agartala</span>
                        </div>
                    </div>
                </div>

                <div className="rn-footer-bottom">
                    <p className="rn-footer-copy">
                        © 2026 <span>RescueNet</span> · Built by Ravindra Choudhary · NIT Agartala · B.Tech ECE
                    </p>
                    <div className="rn-footer-status">
                        <span className="rn-footer-status-dot" />
                        All Systems Operational
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Home;