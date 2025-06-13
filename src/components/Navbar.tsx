import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Check if navbar should be transparent or solid based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${
        isScrolled ? "bg-dark shadow" : "bg-dark bg-opacity-75"
      } fixed-top`}
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <div className="container mb-1">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          style={{ transition: "transform 0.3s" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.10)")}
        >
          <i className="bi bi-luggage-fill me-2"></i>
          Trail & Tale
        </Link>

        {/* Theme toggle button outside collapse - visible in mobile */}
        <div className="d-lg-none ms-auto me-2 theme-toggle-wrapper">
          <ThemeToggle />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
                style={{ transition: "all 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/categories" ? "active" : ""
                }`}
                to="/categories"
                style={{ transition: "all 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                <i className="bi bi-grid me-1"></i> Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/bookmarks" ? "active" : ""
                }`}
                to="/bookmarks"
                style={{ transition: "all 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                <i className="bi bi-bookmark-heart me-1"></i> Bookmarks
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
                style={{ transition: "all 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                <i className="bi bi-info-circle me-1"></i> About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
                to="/contact"
                style={{ transition: "all 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                <i className="bi bi-envelope me-1"></i> Contact
              </Link>
            </li>
            {/* Theme toggle button in desktop view */}
            <li className="nav-item ms-2 d-none d-lg-flex align-items-center">
              <div className="theme-toggle-wrapper ms-lg-3 my-2 my-lg-0">
                <ThemeToggle />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
