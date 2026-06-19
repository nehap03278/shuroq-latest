import { useState } from "react";
import { t } from "../i18n/translations";
import { useLang } from "../App";
import { useIntersection, buildWALink, buildMailLink, submitLead } from "../utils/helpers";
import { SvgIcon } from "./SvgIcon";
import { SectionLabel } from "./SectionLabel";
import { SERVICES } from "../constants";

export default function Contact() {
  const [lang] = useLang();
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState({});
  const [ref, visible] = useIntersection();

  const inp = f => ({
    width: "100%",
    background: "#F8FAFD",
    border: `1.5px solid ${focused[f] ? "#3B82C4" : "#D6E4F7"}`,
    borderRadius: 10,
    padding: "13px 15px",
    color: "#1B2D4F",
    fontFamily: "'Nunito',sans-serif",
    fontSize: 14,
    fontWeight: 600,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .25s"
  });

  const submit = e => {
    e.preventDefault();
    submitLead({ name: form.name, email: form.email, service: form.service, message: form.message });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", service: "", message: "" });
  };

  const sendEmail = e => {
    e.preventDefault();
    window.open(buildMailLink(form), "_blank");
  };

  return (
    <section id="contact" style={{ background: "#fff", padding: "100px 5vw" }}>
      <div ref={ref} style={{
        maxWidth: 940,
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(22px)",
        transition: "all .8s ease"
      }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <SectionLabel text={t(lang, "contact", "label")} />
          <h2 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
            fontWeight: 900,
            color: "#1B2D4F"
          }}>
            {t(lang, "contact", "h2a")} <span style={{
              background: "linear-gradient(135deg,#F5A623,#3B82C4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>{t(lang, "contact", "h2b")}</span>
          </h2>
          <p style={{
            fontFamily: "'Nunito',sans-serif",
            color: "#6B84A3",
            fontSize: 15,
            fontWeight: 600,
            marginTop: 10
          }}>{t(lang, "contact", "sub")}</p>
        </div>

        <div className="cg" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.7fr",
          gap: 44,
          alignItems: "start"
        }}>
          {/* Contact Info */}
          <div>
            {[
              { icon: "email", label: t(lang, "contact", "email"), val: "contact@shuroq.com" },
              { icon: "phone", label: "WHATSAPP / PHONE", val: "+91 8983140094" },
              { icon: "clock", label: t(lang, "contact", "response"), val: t(lang, "contact", "within") },
              {
                icon: "pin",
                label: "OUR OFFICE",
                val: "Level 1, Phase 2, N-Heights, Awfis,\nPlot No 38, Siddiq Nagar,\nGachibowli, Hyderabad,\nTelangana 500081"
              },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 22 }}>
                <div style={{
                  width: 42,
                  height: 42,
                  background: "#E8F0FB",
                  border: "1px solid #D6E4F7",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <SvgIcon name={item.icon} size={18} color="#3B82C4" sw={1.8} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontWeight: 800,
                    color: "#6B84A3",
                    fontSize: 11,
                    letterSpacing: 1.5
                  }}>{item.label.toUpperCase()}</div>
                  <div style={{
                    fontFamily: "'Nunito',sans-serif",
                    color: "#1B2D4F",
                    fontSize: 14,
                    fontWeight: 700,
                    marginTop: 2,
                    whiteSpace: "pre-line"
                  }}>{item.val}</div>
                </div>
              </div>
            ))}

            {/* Dashboard Card */}
            <div style={{
              background: "linear-gradient(135deg,#EAF2FD,#F4F7FC)",
              border: "1.5px solid #D6E4F7",
              borderRadius: 16,
              padding: "22px 20px"
            }}>
              <div style={{
                fontFamily: "'Playfair Display',serif",
                fontWeight: 800,
                color: "#1B2D4F",
                fontSize: 17,
                marginBottom: 4
              }}>{t(lang, "contact", "dashboard")}</div>
              <div style={{
                fontFamily: "'Nunito',sans-serif",
                color: "#6B84A3",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16
              }}>AI · Analytics · Automation</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["98%", "Accuracy"], ["24/7", "Support"]].map(([v, l]) => (
                  <div key={l}>
                    <div style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 900,
                      fontSize: 26,
                      color: "#3B82C4"
                    }}>{v}</div>
                    <div style={{
                      fontFamily: "'Nunito',sans-serif",
                      color: "#6B84A3",
                      fontSize: 12,
                      fontWeight: 700
                    }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: "#F8FAFD",
            border: "1.5px solid #E8F0FB",
            borderRadius: 18,
            padding: "34px 30px"
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
                  <SvgIcon name="check" size={52} color="#10B981" sw={1.5} />
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 22,
                  color: "#3B82C4",
                  marginBottom: 8
                }}>{t(lang, "contact", "successH")}</h3>
                <p style={{
                  fontFamily: "'Nunito',sans-serif",
                  color: "#6B84A3",
                  fontSize: 14,
                  fontWeight: 600
                }}>{t(lang, "contact", "successP")}</p>
              </div>
            ) : (
              <div>
                {/* Form Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{
                      fontFamily: "'Nunito',sans-serif",
                      fontSize: 11,
                      color: "#6B84A3",
                      letterSpacing: 1.2,
                      fontWeight: 800
                    }}>{t(lang, "contact", "name")}</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused({ ...focused, name: true })}
                      onBlur={() => setFocused({ ...focused, name: false })}
                      placeholder="John Doe"
                      style={{ ...inp("name"), marginTop: 6 }}
                    />
                  </div>
                  <div>
                    <label style={{
                      fontFamily: "'Nunito',sans-serif",
                      fontSize: 11,
                      color: "#6B84A3",
                      letterSpacing: 1.2,
                      fontWeight: 800
                    }}>{t(lang, "contact", "emailL")}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused({ ...focused, email: true })}
                      onBlur={() => setFocused({ ...focused, email: false })}
                      placeholder="you@company.com"
                      style={{ ...inp("email"), marginTop: 6 }}
                    />
                  </div>
                </div>

                {/* Service Select */}
                <div style={{ marginBottom: 14 }}>
                  <label style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: 11,
                    color: "#6B84A3",
                    letterSpacing: 1.2,
                    fontWeight: 800
                  }}>{t(lang, "contact", "service")}</label>
                  <select
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    onFocus={() => setFocused({ ...focused, service: true })}
                    onBlur={() => setFocused({ ...focused, service: false })}
                    style={{ ...inp("service"), marginTop: 6 }}
                  >
                    <option value="">{t(lang, "contact", "servicePH")}</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>

                {/* Message Textarea */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{
                    fontFamily: "'Nunito',sans-serif",
                    fontSize: 11,
                    color: "#6B84A3",
                    letterSpacing: 1.2,
                    fontWeight: 800
                  }}>{t(lang, "contact", "message")}</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused({ ...focused, message: true })}
                    onBlur={() => setFocused({ ...focused, message: false })}
                    rows={4}
                    placeholder={t(lang, "contact", "msgPH")}
                    style={{ ...inp("message"), marginTop: 6, resize: "vertical" }}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="contactActions">
                  <button
                    onClick={submit}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg,#3B82C4,#0EA5C9)",
                      border: "none",
                      borderRadius: 10,
                      color: "#fff",
                      fontFamily: "'Nunito',sans-serif",
                      fontWeight: 900,
                      fontSize: 15,
                      padding: "15px",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(59,130,196,0.28)",
                      transition: "transform .2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      marginBottom: 12
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "none"}
                  >
                    <SvgIcon name="whatsapp" size={18} color="#fff" />
                    <span>{t(lang, "contact", "send")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=contact@shuroq.com&su=Contact%20Shuroq', '_blank')}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg,#3B82C4,#0EA5C9)",
                      border: "none",
                      borderRadius: 10,
                      color: "#fff",
                      fontFamily: "'Nunito',sans-serif",
                      fontWeight: 900,
                      fontSize: 15,
                      padding: "15px",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(59,130,196,0.28)",
                      transition: "transform .2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 8px 26px rgba(59,130,196,0.34)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(59,130,196,0.28)";
                    }}
                  >
                    <span>Email</span>
                    <SvgIcon name="email" size={18} color="#fff" sw={1.8} />
                  </button>
                </div>

                <p style={{
                  fontFamily: "'Nunito',sans-serif",
                  color: "#6B84A3",
                  fontSize: 12,
                  fontWeight: 600,
                  textAlign: "center",
                  marginTop: 10
                }}>{t(lang, "contact", "hint")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
