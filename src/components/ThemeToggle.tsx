import React from "react";
import { useTheme } from "../utils/Theme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-sm rounded-circle ${
        theme === "light" ? "btn-dark" : "btn-light"
      }`}
      style={{
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        opacity: isTransitioning ? 0.7 : 1,
        transition: "all 0.3s ease",
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      disabled={isTransitioning}
    >
      {theme === "light" ? (
        <i className="bi bi-moon-stars-fill text-white"></i>
      ) : (
        <i className="bi bi-sun-fill text-warning"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
