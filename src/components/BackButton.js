import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BackButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => navigate(-1)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.button,
        ...(isHovered ? styles.buttonHover : {}),
      }}
    >
      ← Back
    </button>
  );
}

const styles = {
  button: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    padding: "8px 18px",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
    transition: "all 0.3s ease",
    marginBottom: "20px",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
  },
  buttonHover: {
    color: "#0f172a", // Darker text on hover
    borderColor: "#cbd5e1", // Slightly darker border
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transform: "translateX(-2px)", // Slight nudge to the left
  }
};

export default BackButton;