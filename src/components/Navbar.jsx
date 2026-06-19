import { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "../constants";
import LOGO from "../assets/logo.png";
import { SvgIcon } from "./SvgIcon";
import { tx } from "../i18n/translations";
import { useLang } from "../App";

function LangSwitcher({ compact = false }) {
  const [lang, setLang] = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const LANGS = require("../constants").LANGS;
  const current = LANGS.find(l => l.code === lang) || LANGS[0];
  const isRTL = current.dir === "rtl";

  useEffect(() => {
    document.documentElement.dir = current.dir;
    document.documentElement.lang = lang;
  }, [lang, current.dir]);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const choose = (code) => { setLang(code); setOpen(false); };

  return (
    <div ref={ref} style={{ position: "relative", zIndex: 300, flexShrink: 0 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: compact ? 4 : 6, background: "#F4F7FC", border: "1.5px solid #D6E4F7", borderRadius: 9, padding: compact ? "7px 9px" : "8px 13px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: compact ? 12 : 13, color: "#1B2D4F", transition: "all .2s", whiteSpace: "nowrap" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#3B82C4"; e.currentTarget.style.background = "#EAF2FD"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#D6E4F7"; e.currentTarget.style.background = "#F4F7FC"; }}>
        <span style={{ fontSize: compact ? 14 : 16 }}>{current.flag}</span>
        {!compact && <span>{current.name}</span>}
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ opacity: .5, transform: open ? "rotate(180deg)" : "none", transition: "transform .25s", marginLeft: 2 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="#1B2D4F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", border: "1.5px solid #D6E4F7", borderRadius: 14, boxShadow: "0 12px 40px rgba(27,45,79,0.14)", minWidth: 188, maxHeight: 360, overflowY: "auto", animation: "slideUp .2s ease", zIndex: 400 }}>
          {LANGS.map(l => (
            <button key={l.code} onClick={() => choose(l.code)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: l.code === lang ? "#EAF2FD" : "transparent", border: "none", borderBottom: "1px solid #F0F4FA", padding: "11px 16px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: l.code === lang ? 800 : 600, fontSize: 13.5, color: l.code === lang ? "#3B82C4" : "#1B2D4F", textAlign: "left", transition: "background .15s", direction: "ltr" }}
              onMouseEnter={e => { if (l.code !== lang) e.currentTarget.style.background = "#F4F7FC"; }}
              onMouseLeave={e => { if (l.code !== lang) e.currentTarget.style.background = "transparent"; }}>
              <span style={{ fontSize: 20, lineHeight: 1 }}>{l.flag}</span>
              <span style={{ flex: 1 }}>{l.name}</span>
              {l.code === lang && <span style={{ color: "#3B82C4", fontSize: 14 }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ active }) {
  const [lang] = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = id => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const navKeys = ["home", "about", "services", "technologies", "portfolio"];
  const navLabels = navKeys.map(k => tx(lang, "nav", k));

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid #E8F0FB", boxShadow: scrolled ? "0 2px 24px rgba(59,130,196,0.10)" : "none", transition: "all .35s ease" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", height: 92 }}>
        <div onClick={() => go("Home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", lineHeight: 0, flexShrink: 0 }}>
          <img src={LOGO} alt="Shuroq" style={{ height: "clamp(44px,6vw,56px)", width: "auto", objectFit: "contain", display: "block" }} />
        </div>

        <div className="nd" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {navKeys.map((k, i) => (
            <button key={k} onClick={() => go(NAV_LINKS[i])} style={{ background: "none", border: "none", cursor: "pointer", color: active === NAV_LINKS[i].toLowerCase() ? "#3B82C4" : "#1B2D4F", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 16, padding: "4px 0", position: "relative", transition: "color .25s" }}>
              {navLabels[i]}
              <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#F5A623,#3B82C4)", borderRadius: 2, transform: active === NAV_LINKS[i].toLowerCase() ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .3s ease" }} />
            </button>
          ))}
          <button onClick={() => go("Contact")} style={{ background: "linear-gradient(135deg,#3B82C4,#0EA5C9)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 15, padding: "9px 24px", cursor: "pointer", boxShadow: "0 4px 16px rgba(59,130,196,0.32)", transition: "transform .2s,box-shadow .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 7px 22px rgba(59,130,196,0.42)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(59,130,196,0.32)"; }}>
            {tx(lang, "nav", "cta")}
          </button>
          <LangSwitcher />
        </div>

        <div className="nh" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <LangSwitcher compact />
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#1B2D4F", fontSize: 24, cursor: "pointer" }}>{open ? "✕" : "☰"}</button>
        </div>
      </div>

      {open && (
        <div style={{ background: "#fff", padding: "16px 5vw", borderTop: "1px solid #E8F0FB" }}>
          {navKeys.map((k, i) => <button key={k} onClick={() => go(NAV_LINKS[i])} style={{ display: "block", width: "100%", background: "none", border: "none", color: "#1B2D4F", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 16, textAlign: "left", padding: "12px 0", cursor: "pointer", borderBottom: "1px solid #EEF3FA" }}>{navLabels[i]}</button>)}
          <button onClick={() => go("Contact")} style={{ marginTop: 12, width: "100%", background: "linear-gradient(135deg,#3B82C4,#0EA5C9)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 15, padding: "13px", cursor: "pointer" }}>{tx(lang, "nav", "cta")}</button>
        </div>
      )}
    </nav>
  );
}
