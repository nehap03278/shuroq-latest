import { useState } from "react";
import { t, tx } from "../i18n/translations";
import { useLang } from "../App";
import { useIntersection } from "../utils/helpers";
import { SvgIcon } from "./SvgIcon";
import { Counter } from "./Counter";
import { SectionLabel } from "./SectionLabel";

export default function About() {
  const [lang] = useLang();
  const [ref, visible] = useIntersection();

  const capabilities = [
    { icon: "ai", label: "AI Engineering", color: "#3B82C4" },
    { icon: "cloud", label: "Cloud Infra", color: "#0EA5C9" },
    { icon: "mobile", label: "Mobile Apps", color: "#10B981" },
    { icon: "gear", label: "DevOps", color: "#7C3AED" },
    { icon: "chat", label: "Chatbots", color: "#F5A623" },
    { icon: "code", label: "API Design", color: "#EC4899" },
    { icon: "brain", label: "ML Models", color: "#3B82C4" },
    { icon: "shield", label: "Security", color: "#EF4444" },
  ];

  return (
    <section id="about" style={{ background: "#fff", padding: "100px 5vw" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="ag" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left Content */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-28px)", transition: "all .8s ease" }}>
            <SectionLabel text={t(lang, "about", "label")} />
            <h2 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: 900,
              color: "#1B2D4F",
              lineHeight: 1.2,
              marginBottom: 20,
              textAlign: "left"
            }}>
              {t(lang, "about", "h2a")}<br />
              <span style={{
                background: "linear-gradient(135deg,#F5A623,#3B82C4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>{t(lang, "about", "h2b")}</span>
            </h2>
            <p style={{
              fontFamily: "'Nunito',sans-serif",
              color: "#6B84A3",
              fontSize: 15.5,
              lineHeight: 1.85,
              fontWeight: 600,
              marginBottom: 16
            }}>
              {t(lang, "about", "p1")}
            </p>
            <p style={{
              fontFamily: "'Nunito',sans-serif",
              color: "#6B84A3",
              fontSize: 15.5,
              lineHeight: 1.85,
              fontWeight: 600,
              marginBottom: 28
            }}>
              {t(lang, "about", "p2")}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Innovation-First", "AI-Native", "Startup-Friendly", "Enterprise-Grade"].map(tag => (
                <span key={tag} style={{
                  background: "#E8F0FB",
                  border: "1px solid #D6E4F7",
                  borderRadius: 8,
                  color: "#3B82C4",
                  fontFamily: "'Nunito',sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.8,
                  padding: "6px 14px"
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Right Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(28px)",
            transition: "all .8s ease .15s"
          }}>
            {[
              { icon: "eye", title: "Vision", desc: "Global benchmark for AI-native software engineering." },
              { icon: "target", title: "Mission", desc: "Empower businesses with intelligent, scalable software." },
              { icon: "brain", title: "AI-First", desc: "Intelligence at the core of every solution." },
              { icon: "rocket", title: "Speed", desc: "From concept to production in weeks." }
            ].map(card => (
              <div
                key={card.title}
                style={{
                  background: "#F8FAFD",
                  border: "1.5px solid #E8F0FB",
                  borderRadius: 14,
                  padding: "22px 18px",
                  transition: "all .3s",
                  cursor: "default"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#EAF2FD";
                  e.currentTarget.style.borderColor = "#3B82C4";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 28px rgba(59,130,196,0.13)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#F8FAFD";
                  e.currentTarget.style.borderColor = "#E8F0FB";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ marginBottom: 10, display: "flex" }}>
                  <SvgIcon name={card.icon} size={28} color="#3B82C4" sw={1.6} />
                </div>
                <div style={{
                  fontFamily: "'Nunito',sans-serif",
                  fontWeight: 800,
                  color: "#1B2D4F",
                  fontSize: 15,
                  marginBottom: 6
                }}>{card.title}</div>
                <div style={{
                  fontFamily: "'Nunito',sans-serif",
                  color: "#6B84A3",
                  fontSize: 13,
                  lineHeight: 1.65,
                  fontWeight: 600
                }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Section */}
        <div style={{ marginTop: 56, paddingTop: 44, borderTop: "1.5px solid #E8F0FB" }}>
          <h3 style={{
            fontFamily: "'Nunito',sans-serif",
            fontWeight: 900,
            color: "#1B2D4F",
            fontSize: 15,
            letterSpacing: 1.5,
            textAlign: "center",
            marginBottom: 28,
            textTransform: "uppercase"
          }}>{t(lang, "about", "caps")}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 14 }}>
            {capabilities.map((v, i) => {
              const [hov, setHov] = useState(false);
              return (
                <div
                  key={v.label}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${hov ? v.color + "66" : "#E8F0FB"}`,
                    borderRadius: 14,
                    padding: "18px 12px",
                    textAlign: "center",
                    transition: "all .3s",
                    boxShadow: hov ? `0 8px 24px ${v.color}22` : "0 2px 8px rgba(59,130,196,0.05)",
                    transform: hov ? "translateY(-4px)" : "none",
                    animation: `floatIcon ${3 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`
                  }}
                >
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                    <SvgIcon name={v.icon} size={28} color={v.color} sw={1.6} />
                  </div>
                  <div style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#1B2D4F",
                    lineHeight: 1.3
                  }}>{v.label}</div>
                  <div style={{
                    width: 24,
                    height: 3,
                    background: v.color,
                    borderRadius: 2,
                    margin: "8px auto 0"
                  }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="sg" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 18,
          marginTop: 52,
          paddingTop: 44,
          borderTop: "1.5px solid #E8F0FB"
        }}>
          {[
            { k: "s0", v: 50, s: "+" },
            { k: "s1", v: 40, s: "+" },
            { k: "s2", v: 18, s: "+" },
            { k: "s3", v: 49, s: "/50" }
          ].map((st, i) => (
            <div key={st.k} style={{
              textAlign: "center",
              background: "#F8FAFD",
              borderRadius: 14,
              padding: "22px 12px",
              border: "1px solid #E8F0FB"
            }}>
              <div style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "2rem",
                fontWeight: 900,
                background: "linear-gradient(135deg,#F5A623,#3B82C4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                <Counter target={st.v} suffix={st.s} />
              </div>
              <div style={{
                fontFamily: "'Nunito',sans-serif",
                color: "#6B84A3",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                marginTop: 7
              }}>{tx(lang, "stats", st.k).toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
