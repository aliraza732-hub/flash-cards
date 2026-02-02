import { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import FlashCard from "./components/FlashCard";
import Navigation from "./components/Navigation";

// ===== TYPE DEFINITIONS =====
interface Card {
  question: string;
  answer: string;
  known: boolean | null; // null = not answered yet
}





// ===== MAIN APP COMPONENT =====
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [cards, setCards] = useState<Card[]>([
    {
      question: "What are the different data types in JavaScript?",
      answer: "String, Number, Boolean, Undefined, Null, Symbol, BigInt, and Object",
      known: null,
    },
    {
      question: "What is closure in JavaScript?",
      answer: "A closure is a function that has access to variables in its outer scope, even after the outer function has returned",
      known: null,
    },
    {
      question: "What is the difference between let and const?",
      answer: "let allows reassignment, const does not allow reassignment (but objects/arrays can still be mutated)",
      known: null,
    },
    {
      question: "What is the difference between == and ===?",
      answer: "== compares values with type coercion, === compares values and types without coercion",
      known: null,
    },
    {
      question: "What is the purpose of async/await?",
      answer: "async/await provides a cleaner syntax for working with promises, making asynchronous code look synchronous",
      known: null,
    },
    {
      question: "What is the DOM?",
      answer: "The Document Object Model (DOM) is a programming interface for HTML documents, representing the page as a tree of objects",
      known: null,
    },
    {
      question: "What is event bubbling?",
      answer: "Event bubbling is when an event starts from the target element and bubbles up to parent elements in the DOM tree",
      known: null,
    },
    {
      question: "What is the difference between null and undefined?",
      answer: "undefined means a variable has been declared but not assigned a value. null is an explicit assignment representing 'no value'",
      known: null,
    },
    {
      question: "What is a promise in JavaScript?",
      answer: "A Promise is an object representing the eventual completion or failure of an asynchronous operation",
      known: null,
    },
    {
      question: "What is the spread operator (...)?",
      answer: "The spread operator expands an array or object into individual elements, useful for copying or merging",
      known: null,
    },
  ]);

  // Dark mode state with system preference detection
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Enhanced theme with gradient and shadow support
  const theme = {
    // Background colors
    background: isDarkMode 
      ? "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" 
      : "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
    cardBackground: isDarkMode ? "#2d2d2d" : "#ffffff",
    cardBackgroundAlt: isDarkMode ? "#3a3a3a" : "#f8f9fa",

    // Text colors
    text: isDarkMode ? "#ffffff" : "#000000",

    // Button colors
    buttonBackground: isDarkMode ? "#444" : "#333",
    buttonText: "white",
    buttonBorder: isDarkMode ? "#666" : "#444",
    disabledButton: isDarkMode ? "#555" : "#ccc",

    // Special buttons
    knownButton: isDarkMode ? "#2e7d32" : "#4CAF50",
    unknownButton: isDarkMode ? "#c62828" : "#f44336",
    knownText: isDarkMode ? "#81c784" : "#4CAF50",
    unknownText: isDarkMode ? "#ef9a9a" : "#f44336",

    // Progress bar colors
    progressBarBackground: isDarkMode ? "#333" : "#f0f0f0",
    progressFill: isDarkMode 
      ? "linear-gradient(90deg, #4a9eff 0%, #2979ff 100%)" 
      : "linear-gradient(90deg, #ffb3ba 0%, #ff6b6b 100%)",
    borderColor: isDarkMode ? "#555" : "#333",

    // Shadows
    shadowColor: isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)",
  };

  function toggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  const currentCard = cards[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === cards.length - 1;

  const goNext = () => {
    if (!isLastCard) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const goPrevious = () => {
    if (!isFirstCard) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const restart = () => {
    if (window.confirm("Are you sure you want to restart? All progress will be lost!")) {
      setCards(prevCards => 
        prevCards.map(card => ({ ...card, known: null }))
      );
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const markAsKnown = () => {
    setCards(prevCards =>
      prevCards.map((card, index) =>
        index === currentIndex
          ? { ...card, known: true }
          : card
      )
    );
  };

  const markAsUnknown = () => {
    setCards(prevCards => 
      prevCards.map((card, index) => 
        index === currentIndex 
          ? { ...card, known: false }
          : card
      )
    );
  }

  // Calculate statistics
  const knownCount = cards.filter(card => card.known === true).length;
  const unknownCount = cards.filter(card => card.known === false).length;
  const unansweredCount = cards.filter(card => card.known === null).length;
  const totalAnswered = knownCount + unknownCount;
  const percentageKnown = totalAnswered > 0 
    ? Math.round((knownCount / totalAnswered) * 100) 
    : 0;

  return (
    <div
      style={{
        padding: "40px 40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
        minHeight: "100vh",
        background: theme.background,
        position: "relative",
        transition: "all 0.3s ease",
      }}
    >
      {/* Dark mode toggle and action buttons */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          // marginBottom: "10px",
          right: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={toggleTheme}
          style={{
            cursor: "pointer",
            background: theme.buttonBackground,
            padding: "10px 15px",
            borderRadius: "15px",
            border: "none",
            color: theme.buttonText,
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        
        <button
          onClick={restart}
          style={{
            cursor: "pointer",
            background: theme.buttonBackground,
            padding: "10px 15px",
            borderRadius: "15px",
            border: "none",
            color: theme.buttonText,
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          🔄 Restart
        </button>

        <button
          onClick={shuffleCards}
          style={{
            cursor: "pointer",
            background: theme.buttonBackground,
            padding: "10px 15px",
            borderRadius: "15px",
            border: "none",
            color: theme.buttonText,
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          🎲 Shuffle Cards
        </button>
      </div>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
          color: theme.text,
          fontSize: "2.5rem",
          fontWeight: "700",
          background: isDarkMode 
            ? 'linear-gradient(45deg, #bbb, #eee)'
            : "linear-gradient(45deg, #333, #666)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        JavaScript Flashcards
      </h1>

      {/* Statistics Display */}
      <div style={{
        textAlign: "center",
        padding: "20px",
        background: theme.cardBackground,
        borderRadius: "15px",
        marginBottom: "20px",
        color: theme.text,
        boxShadow: `0 5px 20px ${theme.shadowColor}`,
        border: `1px solid ${theme.borderColor}`,
      }}>
        <p style={{ margin: "5px 0", fontSize: "20px", fontWeight: "bold" }}>
          📊 Your Progress
        </p>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "30px", 
          margin: "15px 0",
          flexWrap: "wrap" 
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#4CAF50" }}>
              {knownCount}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>✅ Known</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#f44336" }}>
              {unknownCount}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>❌ Unknown</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontWeight: "bold", opacity: 0.6 }}>
              {unansweredCount}
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>⏳ Unanswered</div>
          </div>
        </div>
        {totalAnswered > 0 && (
          <p style={{ margin: "10px 0", fontSize: "18px", fontWeight: "600" }}>
            Score: <span style={{ color: percentageKnown > 70 ? "#4CAF50" : "#ff9800" }}>
              {percentageKnown}%
            </span> ({knownCount}/{totalAnswered})
          </p>
        )}
      </div>

      {/* Progress Bar Component */}
      <ProgressBar
        current={currentIndex + 1}
        total={cards.length}
        theme={theme}
      />

      {/* FlashCard Component */}
      <FlashCard 
        card={currentCard}
        theme={theme}
        showAnswer={showAnswer}
        setShowAnswer={setShowAnswer}
        onMarkKnown={markAsKnown}
        onMarkUnknown={markAsUnknown}
      />

      {/* Navigation Component */}
      <Navigation
        onPrevious={goPrevious}
        onNext={goNext}
        isFirstCard={isFirstCard}
        isLastCard={isLastCard}
        theme={theme}
      />

     
    </div>
  );
}

export default App;