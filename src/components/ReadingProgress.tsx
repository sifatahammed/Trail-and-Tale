import React, { useState, useEffect } from "react";

const ReadingProgressBar: React.FC = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateProgressBar = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Calculate scroll percentage
      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      // Set width based on scroll percentage, capping at 100%
      setWidth(Math.min(scrollPercentage, 100));
    };

    // Add scroll event listener
    window.addEventListener("scroll", updateProgressBar);

    // Initial calculation
    updateProgressBar();

    // Clean up
    return () => window.removeEventListener("scroll", updateProgressBar);
  }, []);

  return (
    <div
      className="reading-progress-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        zIndex: 1030,
      }}
    >
      <div
        className="reading-progress-bar"
        style={{
          height: "100%",
          backgroundColor: "#0d6efd",
          width: `${width}%`,
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
};

export default ReadingProgressBar;
