import { t } from "../i18n/translations";
import { useLang } from "../App";
import { SvgIcon } from "./SvgIcon";
import LOGO from "../assets/logo.png";

const WA_NUM = "918983140094";
const LINKEDIN_URL = "https://www.linkedin.com/company/shuroq/";
const INSTAGRAM_URL = "https://www.instagram.com/shuroq_technologies?igsh=MjRzbDF4NWNnZGtl";

export default function Footer() {
  const [lang] = useLang();

  return (
    <footer style={{ background: "#1B2D4F", padding: "60px 5vw 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Footer Grid */}
        <div className="fg" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 36,
          marginBottom: 44
        }}>
          {/* Company Info */}
          <div>
            {/* Logo */}
            <div style={{
              marginBottom: 18,
              display: "inline-block",
              background: "rgba(255,255,255,0.96)",
              borderRadius: 12,
              padding: "8px 16px",
              lineHeight: 0
            }}>
              <img
                src={LOGO}
                alt="Shuroq"
                style={{
                  height: "clamp(44px,6vw,56px)",
                  width: "auto",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "'Nunito',sans-serif",
              color: "rgba(255,255,255,0.45)",
              fontSize: 13.5,
              lineHeight: 1.78,
              maxWidth: 270,
              fontWeight: 600
            }}>
              {t(lang, "footer", "tagline")}
            </p>

            {/* Social Links */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all .2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#0077B5";
                  e.currentTarget.style.borderColor = "#0077B5";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: 16,
                  transition: "all .2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "linear-gradient(135deg,#f09433,#dc2743)";
                  e.currentTarget.style.borderColor = "#dc2743";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <SvgIcon name="camera" size={16} color="#fff" sw={1.8} />
              </a>

              <a
                href={`https://wa.me/${WA_NUM}`}
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all .2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#25D366";
                  e.currentTarget.style.borderColor = "#25D366";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <SvgIcon name="whatsapp" size={16} color="#fff" sw={1.8} />
              </a>

              <a
                href="mailto:contact@shuroq.com"
                title="Email"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all .2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#3B82C4";
                  e.currentTarget.style.borderColor = "#3B82C4";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <SvgIcon name="email" size={16} color="#fff" sw={1.8} />
              </a>

              <a
                href="tel:+918983140094"
                title="Call"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all .2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#0EA5C9";
                  e.currentTarget.style.borderColor = "#0EA5C9";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                <SvgIcon name="phone" size={16} color="#fff" sw={1.8} />
              </a>
            </div>
          </div>

          {/* Footer Links Columns */}
          {[
            {
              label: t(lang, "footer", "company"),
              links: [
                [t(lang, "nav", "about"), "#about"],
                [t(lang, "nav", "services"), "#services"],
                [t(lang, "nav", "portfolio"), "#portfolio"],
                [t(lang, "nav", "contact"), "#contact"]
              ]
            },
            {
              label: t(lang, "footer", "services"),
              links: [
                ["AI Development", "#services"],
                ["Mobile Apps", "#services"],
                ["Web Development", "#services"],
                ["DevOps", "#services"]
              ]
            },
            {
              label: t(lang, "footer", "connect"),
              links: [
                ["LinkedIn", LINKEDIN_URL, true],
                ["Instagram", INSTAGRAM_URL, true],
                ["WhatsApp", `https://wa.me/${WA_NUM}`, true],
                ["Email", "mailto:contact@shuroq.com", true],
                ["Call Support", "tel:+918983140094", true]
              ]
            }
          ].map(col => (
            <div key={col.label}>
              <div style={{
                fontFamily: "'Nunito',sans-serif",
                fontWeight: 900,
                color: "#fff",
                fontSize: 12.5,
                letterSpacing: 2,
                marginBottom: 18
              }}>{col.label.toUpperCase()}</div>
              {col.links.map(([label, href, external]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        color: "rgba(255,255,255,0.42)",
                        fontSize: 13.5,
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: "color .2s",
                        textDecoration: "none",
                        display: "block"
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#F5A623"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.42)"}
                    >
                      {label}
                    </a>
                  ) : (
                    <span
                      onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })}
                      style={{
                        fontFamily: "'Nunito',sans-serif",
                        color: "rgba(255,255,255,0.42)",
                        fontSize: 13.5,
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: "color .2s",
                        display: "block"
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#F5A623"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.42)"}
                    >
                      {label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 22,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10
        }}>
          <span style={{
            fontFamily: "'Nunito',sans-serif",
            color: "rgba(255,255,255,0.28)",
            fontSize: 13,
            fontWeight: 600
          }}>{t(lang, "footer", "copyright")}</span>
          <span style={{
            fontFamily: "'Nunito',sans-serif",
            color: "rgba(255,255,255,0.28)",
            fontSize: 13,
            fontWeight: 600
          }}>{t(lang, "footer", "tag")}</span>
        </div>
      </div>
    </footer>
  );
}
