interface FlashCardProps {
  card: any;
  theme: any;
  showAnswer: boolean;
  setShowAnswer: (value: boolean) => void;
  onMarkKnown: () => void;
  onMarkUnknown: () => void;
}

// ===== FLASHCARD COMPONENT =====
export default function FlashCard({ 
  card, 
  theme, 
  showAnswer, 
  setShowAnswer,
  onMarkKnown,
  onMarkUnknown 
}: FlashCardProps) {
  return (
    <>
      {/* 3D Flip Container */}
      <div
        style={{
          marginTop: "20px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1000px",
        }}
      >
        {/* The Card with 3D flip effect */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease-in-out",
            transform: showAnswer ? "rotateY(180deg)" : "rotateY(0deg)",
            cursor: "pointer",
          }}
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {/* Front side - Question */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: theme.cardBackground,
              padding: "40px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: theme.text,
              boxShadow: `0 10px 30px ${theme.shadowColor || "rgba(0,0,0,0.1)"}`,
              border: `2px solid ${theme.borderColor || "#333"}`,
              overflow: "auto",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
              {card.question}
            </h2>
            <div style={{
              position: "absolute",
              bottom: "10px",
              fontSize: "14px",
              color: theme.text,
              opacity: 0.6
            }}>
              👆 Click to flip
            </div>
          </div>

          {/* Back side - Answer */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: theme.cardBackgroundAlt || theme.cardBackground,
              padding: "40px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: theme.text,
              transform: "rotateY(180deg)",
              boxShadow: `0 10px 30px ${theme.shadowColor || "rgba(0,0,0,0.1)"}`,
              border: `2px solid ${theme.borderColor || "#333"}`,
              overflow: "auto",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
              {card.answer}
            </h2>
            <div style={{
              position: "absolute",
              bottom: "10px",
              fontSize: "14px",
              color: theme.text,
              opacity: 0.6
            }}>
              👆 Click to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Show Answer Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            borderRadius: "8px",
            border: `2px solid ${theme.buttonBorder || theme.buttonBackground}`,
            background: theme.buttonBackground,
            color: theme.buttonText || "white",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = `0 5px 15px ${theme.shadowColor || "rgba(0,0,0,0.2)"}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {showAnswer ? "👈 Show Question" : "Show Answer 👉"}
        </button>
      </div>

      {/* Mark as Known/Unknown Buttons - only show when answer is visible */}
      {showAnswer && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px"
        }}>
          <button
            onClick={onMarkKnown}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              background: theme.knownButton || "#4CAF50",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(76, 175, 80, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ✅ I Know This
          </button>
          
          <button
            onClick={onMarkUnknown}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              background: theme.unknownButton || "#f44336",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(244, 67, 54, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ❌ I Don't Know
          </button>
        </div>
      )}

      {/* Show if this card was already marked */}
      {card.known !== null && (
        <div style={{
          textAlign: "center",
          marginTop: "15px",
          fontSize: "14px",
          color: card.known ? theme.knownText || "#4CAF50" : theme.unknownText || "#f44336",
          opacity: 0.8,
          fontWeight: "500"
        }}>
          {card.known 
            ? "✓ Previously marked as Known" 
            : "✗ Previously marked as Unknown"}
        </div>
      )}
    </>
  );
}
