import React, { useState, useEffect } from "react";
import { mockBlogPosts, categories } from "../utils/Data";

interface StatsCounterProps {
  showTitle?: boolean;
}

const StatsCounter: React.FC<StatsCounterProps> = ({ showTitle = true }) => {
  const [counts, setCounts] = useState({
    total: 0,
    Travel: 0,
    Lifestyle: 0,
    Food: 0,
    Wellness: 0,
    Travel_Tips: 0,
    Culture: 0,
    Adventure: 0,
  });

  const [animatedCounts, setAnimatedCounts] = useState({
    total: 0,
    Travel: 0,
    Lifestyle: 0,
    Food: 0,
    Wellness: 0,
    Travel_Tips: 0,
    Culture: 0,
    Adventure: 0,
  });

  useEffect(() => {
    // Calculate actual counts
    const total = mockBlogPosts.length;
    const Travel = mockBlogPosts.filter((post) =>
      post.categories.includes("Travel")
    ).length;
    const Lifestyle = mockBlogPosts.filter((post) =>
      post.categories.includes("Lifestyle")
    ).length;
    const Food = mockBlogPosts.filter((post) =>
      post.categories.includes("Food")
    ).length;
    const Wellness = mockBlogPosts.filter((post) =>
      post.categories.includes("Wellness")
    ).length;
    const Travel_Tips = mockBlogPosts.filter((post) =>
      post.categories.includes("Travel Tips")
    ).length;
    const Culture = mockBlogPosts.filter((post) =>
      post.categories.includes("Culture")
    ).length;
     const Adventure = mockBlogPosts.filter((post) =>
      post.categories.includes("Adventure")
    ).length;

    setCounts({
      total,
      Travel, 
      Lifestyle, 
      Food, 
      Wellness, 
      Travel_Tips, 
      Culture,
      Adventure
    });

    // Animate the counters
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setAnimatedCounts({
        total: Math.ceil(total * progress),
        Travel: Math.ceil(Travel * progress),
        Lifestyle: Math.ceil(Lifestyle * progress),
        Food: Math.ceil(Food * progress),
        Wellness: Math.ceil(Wellness * progress),
        Travel_Tips: Math.ceil(Travel_Tips * progress),
        Culture: Math.ceil(Culture * progress),
        Adventure: Math.ceil(Adventure * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        {showTitle && (
          <h2 className="card-title h4 mb-4">
            <i className="bi bi-bar-chart-fill text-primary me-2"></i>
            Blog Statistics
          </h2>
        )}

        <div className="row row-cols-2 row-cols-sm-4 row-cols-md-4 row-cols-lg-7 g-4">
          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.total}+
              </div>
              <div className="small text-muted">Total Articles</div>
            </div>
          </div>

          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.Travel}
              </div>
              <div className="small text-muted">Travel</div>
            </div>
          </div>

          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.Lifestyle}
              </div>
              <div className="small text-muted">Lifestyle</div>
            </div>
          </div>

          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.Food}
              </div>
              <div className="small text-muted">Food</div>
            </div>
          </div>

          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.Wellness}
              </div>
              <div className="small text-muted">Wellness</div>
            </div>
          </div>

          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.Travel_Tips}
              </div>
              <div className="small text-muted">Travel Tips</div>
            </div>
          </div>

          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.Culture}
              </div>
              <div className="small text-muted">Culture</div>
            </div>
          </div>
          
          <div className="col">
            <div className="text-center">
              <div className="display-4 fw-bold text-primary mb-0">
                {animatedCounts.Adventure}
              </div>
              <div className="small text-muted">Adventure</div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
};

export default StatsCounter;
