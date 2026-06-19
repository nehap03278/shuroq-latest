import { useState, useEffect } from "react";
import { t } from "../i18n/translations";
import { useLang } from "../App";
import { SvgIcon } from "./SvgIcon";
import heroBg from "../assets/hero-bg.png";
import ParticleField from "./ParticleField";
import AIBackground from "./AIBackground";

export default function Homepage() {
  const [lang] = useLang();
  const words = [
    t(lang, "hero", "w0"),
    t(lang, "hero", "w1"),
    t(lang, "hero", "w2"),
    t(lang, "hero", "w3")
  ];
  const [wi, setWi] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWi(i => (i + 1) % words.length);
        setFade(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <section id="home" className="homeHero" style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "#F4F7FC"
    }}>
      {/* Futuristic background image */}
      <img
        className="homeHeroImage"
        src={heroBg}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "right center",
          transform: "scaleX(-1)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="homeHeroOverlay" style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at center,rgba(244,247,252,0.78) 0%,rgba(244,247,252,0.62) 38%,rgba(244,247,252,0.34) 72%,rgba(244,247,252,0.16) 100%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 180,
        background: "linear-gradient(180deg,rgba(244,247,252,0),#F4F7FC 88%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <ParticleField />
      <AIBackground />

      {/* Floating decorative circles */}
      <div style={{
        position: "absolute",
        top: "-8%",
        right: "-4%",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(59,130,196,0.07) 0%,transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{
        position: "absolute",
        bottom: "8%",
        left: "-6%",
        width: 450,
        height: 450,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(245,166,35,0.06) 0%,transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Floating AI feature pills */}
      <div className="heroFloat" style={{
        position: "absolute",
        top: "20%",
        right: "3%",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        pointerEvents: "none"
      }}>
        {[
          { e: "ai", l: "AI Engine" },
          { e: "cloud", l: "Cloud Native" },
          { e: "code", l: "API-First" },
          { e: "shield", l: "Secure by Design" }
        ].map((v, i) => (
          <div key={v.l} style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid #D6E4F7",
            borderRadius: 12,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 4px 16px rgba(59,130,196,0.1)",
            animation: `floatIcon ${3 + i * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.9}s`
          }}>
            <SvgIcon name={v.e} size={18} color="#3B82C4" />
            <span style={{
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 800,
              fontSize: 12,
              color: "#1B2D4F"
            }}>{v.l}</span>
          </div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="homeHeroContent" style={{
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "150px 5vw 80px",
        maxWidth: 1160,
        width: "100%",
        margin: "0 auto"
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(59,130,196,0.24)",
          borderRadius: 40,
          padding: "7px 20px",
          marginBottom: 24,
          boxShadow: "0 8px 30px rgba(59,130,196,0.08)"
        }}>
          <span style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#0EA5C9",
            display: "inline-block",
            animation: "pulse 2s infinite"
          }} />
          <span style={{
            fontFamily: "'Nunito',sans-serif",
            fontWeight: 900,
            fontSize: 11.5,
            color: "#3B82C4",
            letterSpacing: 2.2
          }}>{t(lang, "hero", "badge")}</span>
        </div>

        {/* Hero Heading */}
        <h1 style={{
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: "clamp(2.25rem,5.2vw,4.75rem)",
          fontWeight: 900,
          color: "#1B2D4F",
          lineHeight: 1.08,
          margin: "0 auto 10px",
          maxWidth: 820,
          textShadow: "0 2px 18px rgba(255,255,255,0.75)"
        }}>
          {t(lang, "hero", "h1a")}{" "}
          <span style={{
            background: "linear-gradient(135deg,#F5A623 0%,#3B82C4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: fade ? 1 : 0,
            transition: "opacity .35s ease",
            display: "inline-block"
          }}>{words[wi]}</span>
          <br />{t(lang, "hero", "h1b")}
        </h1>

        {/* Hero Subtitle */}
        <p style={{
          fontFamily: "'Nunito',sans-serif",
          fontSize: "clamp(.98rem,1.6vw,1.15rem)",
          fontWeight: 700,
          color: "#526F91",
          lineHeight: 1.85,
          maxWidth: 640,
          margin: "20px auto 38px",
          textShadow: "0 1px 16px rgba(255,255,255,0.9)"
        }}>
          {t(lang, "hero", "sub").split('\n')[0]}<br />
          {t(lang, "hero", "sub").split('\n')[1]}
        </p>

        {/* CTA Buttons */}
        <div className="homeHeroActions" style={{
          display: "flex",
          gap: 14,
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "linear-gradient(135deg,#3B82C4,#0EA5C9)",
              border: "none",
              borderRadius: 11,
              color: "#fff",
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 900,
              fontSize: 15,
              padding: "14px 38px",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(59,130,196,0.34)",
              transition: "transform .2s,box-shadow .2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,130,196,0.45)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(59,130,196,0.34)";
            }}>
            {t(lang, "hero", "cta1")}
          </button>

          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#fff",
              border: "1.5px solid #D6E4F7",
              borderRadius: 11,
              color: "#1B2D4F",
              fontFamily: "'Nunito',sans-serif",
              fontWeight: 800,
              fontSize: 15,
              padding: "14px 38px",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(59,130,196,0.09)",
              transition: "all .25s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#3B82C4";
              e.currentTarget.style.color = "#3B82C4";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#D6E4F7";
              e.currentTarget.style.color = "#1B2D4F";
            }}>
            {t(lang, "hero", "cta2")}
          </button>
        </div>

        {/* Hero Stats */}
        <div className="homeHeroStats" style={{
          display: "flex",
          gap: 14,
          justifyContent: "center",
          marginTop: 50,
          flexWrap: "wrap"
        }}>
          {[
            ["50+", t(lang, "hero", "stat1")],
            ["98%", t(lang, "hero", "stat2")],
            ["24/7", t(lang, "hero", "stat3")],
            ["4.9★", t(lang, "hero", "stat4")]
          ].map(([v, l]) => (
            <div key={l} style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(214,228,247,0.9)",
              borderRadius: 14,
              padding: "14px 20px",
              boxShadow: "0 8px 26px rgba(59,130,196,0.11)"
            }}>
              <div style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                fontWeight: 900,
                color: "#3B82C4"
              }}>{v}</div>
              <div style={{
                fontFamily: "'Nunito',sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: "#6B84A3",
                letterSpacing: 1.1,
                marginTop: 3
              }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
