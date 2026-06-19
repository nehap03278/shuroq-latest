import { useState } from "react";
import { t, tx } from "../i18n/translations";
import { useLang } from "../App";
import { useIntersection } from "../utils/helpers";
import { SvgIcon } from "./SvgIcon";
import { SectionLabel } from "./SectionLabel";
import { PORTFOLIO } from "../constants";

export default function Portfolio() {
  const [lang] = useLang();
  const [ref, visible] = useIntersection();

  return (
    <section id="portfolio" style={{ background: "#fff", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionLabel text={t(lang, "portfolio", "label")} />
          <h2 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
            fontWeight: 900,
            color: "#1B2D4F"
          }}>
            {t(lang, "portfolio", "h2a")} <span style={{
              background: "linear-gradient(135deg,#F5A623,#3B82C4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>{t(lang, "portfolio", "h2b")}</span>
          </h2>
        </div>

        <div ref={ref} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
          gap: 20
        }}>
          {PORTFOLIO.map((p, i) => <ProjectCard key={p.title} proj={p} idx={i} lang={lang} delay={i * 70} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ proj, idx, lang, delay, visible }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? (h ? "translateY(-6px)" : "none") : "translateY(24px)",
        transition: `opacity .7s ease ${delay}ms,transform .3s ease,box-shadow .3s`,
        boxShadow: h ? "0 14px 40px rgba(59,130,196,0.14)" : "0 2px 12px rgba(59,130,196,0.06)",
        border: `1.5px solid ${h ? proj.accent + "55" : "#E8F0FB"}`
      }}
    >
      {/* Image Section */}
      <div style={{
        height: 180,
        background: `linear-gradient(135deg,${proj.accent}18 0%,#EAF2FD 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `${proj.accent}22`,
          border: `2px solid ${proj.accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform .3s",
          transform: h ? "scale(1.12)" : "scale(1)"
        }}>
          <SvgIcon name={proj.icon} size={32} color={proj.accent} sw={1.5} />
        </div>
        <div style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "#fff",
          border: `1px solid ${proj.accent}44`,
          borderRadius: 7,
          padding: "4px 10px",
          fontFamily: "'Nunito',sans-serif",
          fontSize: 11,
          fontWeight: 800,
          color: proj.accent,
          letterSpacing: 0.8
        }}>{tx(lang, "pfol", `p${idx}c`).toUpperCase()}</div>
      </div>

      {/* Content Section */}
      <div style={{ background: "#fff", padding: "18px 20px 22px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display',serif",
          fontWeight: 800,
          fontSize: 19,
          color: "#1B2D4F",
          marginBottom: 7
        }}>{proj.title}</h3>
        <p style={{
          fontFamily: "'Nunito',sans-serif",
          color: "#6B84A3",
          fontSize: 13.5,
          lineHeight: 1.65,
          fontWeight: 600
        }}>{tx(lang, "pfol", `p${idx}d`)}</p>
      </div>
    </div>
  );
}
