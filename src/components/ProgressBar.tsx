interface ProgressBarProps {
  current: number;
  total: number;
  theme: any;
}

// ===== PROGRESS BAR COMPONENT =====
export default function ProgressBar({ current, total, theme }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Progress bar container */}
      <div
        style={{
          width: "100%",
          height: "40px",
          background: theme.progressBarBackground || "#f0f0f0",
          borderRadius: "20px",
          overflow: "hidden",
          border: `2px solid ${theme.borderColor || "#333"}`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Filled portion */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${percentage}%`,
            background: theme.progressFill || "#ffb3ba",
            transition: "width 0.3s ease",
            borderRadius: "18px",
          }}
        />

        {/* Percentage text (on top of the bar) */}
        <span
          style={{
            position: "relative",
            zIndex: 1,
            fontWeight: "bold",
            fontSize: "16px",
            color: theme.text,
          }}
        >
          {percentage}%
        </span>
      </div>

      {/* Card counter below the bar */}
      <p
        style={{
          textAlign: "right",
          fontSize: "18px",
          fontWeight: "bold",
          marginTop: "10px",
          marginBottom: "0",
          color: theme.text,
        }}
      >
        {current} of {total}
      </p>
    </div>
  );
}