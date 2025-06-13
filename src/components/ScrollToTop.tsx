import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="btn btn-primary rounded-circle position-fixed"
          style={{
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            zIndex: 1000,
            opacity: 0.8,
            transition: "opacity 0.3s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          aria-label="Scroll to top"
        >
          <i className="bi bi-arrow-up-short fs-4"></i>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
