export function SectionLabel({ text }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "linear-gradient(135deg,#EAF3FF,#F4F9FF)",
      border: "1px solid rgba(59,130,196,0.18)",
      borderRadius: 40,
      padding: "6px 16px",
      marginBottom: 16,
      fontFamily: "'Nunito',sans-serif",
      fontSize: 10.5,
      fontWeight: 900,
      color: "#3B82C4",
      letterSpacing: 2.2,
      textTransform: "uppercase"
    }}>
      <span style={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "#F5A623",
        display: "inline-block"
      }} />
      {text}
    </div>
  );
}
