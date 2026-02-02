interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstCard: boolean;
  isLastCard: boolean;
  theme: any;
}

// ===== NAVIGATION COMPONENT =====
function Navigation({
  onPrevious,
  onNext,
  isFirstCard,
  isLastCard,
  theme,
}: NavigationProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "30px",
        gap: "10px",
      }}
    >
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={isFirstCard}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          background: isFirstCard
            ? theme.disabledButton || "#ccc"
            : theme.buttonBackground,
          color: theme.buttonText || "white",
          cursor: isFirstCard ? "not-allowed" : "pointer",
          fontWeight: "600",
          transition: "all 0.2s ease",
          opacity: isFirstCard ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isFirstCard) {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = `0 5px 15px ${theme.shadowColor || "rgba(0,0,0,0.2)"}`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        ← Previous
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isLastCard}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          background: isLastCard
            ? theme.disabledButton || "#ccc"
            : theme.buttonBackground,
          color: theme.buttonText || "white",
          cursor: isLastCard ? "not-allowed" : "pointer",
          fontWeight: "600",
          transition: "all 0.2s ease",
          opacity: isLastCard ? 0.5 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isLastCard) {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = `0 5px 15px ${theme.shadowColor || "rgba(0,0,0,0.2)"}`;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Next →
      </button>
    </div>
  );
}
export default Navigation;
