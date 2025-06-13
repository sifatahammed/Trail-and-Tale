import React from "react";
import { Link, useLocation } from "react-router-dom";

// Friendly names for paths
const categoryMap: Record<string, string> = {
  travel: "Travel",
  lifestyle: "Lifestyle",
  food: "Food",
  wellness: "Wellness",
  "travel-tips": "Travel Tips",
  culture: "Culture",
  adventure: "Adventure",
  post: "Articles",
};

// Optional: Icons per category using Bootstrap Icons
const iconMap: Record<string, string> = {
  travel: "bi-geo-alt-fill",
  lifestyle: "bi-person-heart",
  food: "bi-cup-straw",
  wellness: "bi-heart-pulse-fill",
  "travel-tips": "bi-signpost-split-fill",
  culture: "bi-globe-europe-africa",
  adventure: "bi-binoculars-fill",
  post: "bi-journal-richtext",
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="mt-4 pt-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/" className="text-decoration-none">
            <i className="bi bi-house-door-fill me-1"></i> Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const key = value.toLowerCase();

          // Get display name and icon
          const displayName = categoryMap[key] || value.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
          const iconClass = iconMap[key];

          return (
            <li
              key={to}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                <>
                  {iconClass && <i className={`bi ${iconClass} me-1`}></i>}
                  {displayName}
                </>
              ) : (
                <Link to={to} className="text-decoration-none">
                  {iconClass && <i className={`bi ${iconClass} me-1`}></i>}
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

