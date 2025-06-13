import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../types";

interface FeaturedPostsProps {
  posts: BlogPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  // Filter to only featured posts
  const featuredPosts = posts.filter((post) => post.featured);

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <div className="featured-posts mb-5">
      <h2 className="display-6 mb-4 border-start border-4 border-primary ps-3">
        <i className="bi bi-star-fill text-warning me-2"></i>
        Featured Posts
      </h2>
      <div className="row">
        {featuredPosts.length > 0 && (
          <div className="col-lg-7 mb-4 mb-lg-0">
            <div
              className="card border-0 shadow featured-card h-100"
              style={{
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(-5px)";
                target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget;
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div className="position-relative">
                <img
                  src={featuredPosts[0].thumbnail}
                  alt={featuredPosts[0].title}
                  className="card-img-top"
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <div className="position-absolute top-0 start-0 bg-primary text-white p-2 m-3 rounded-pill">
                  <i className="bi bi-star-fill me-1"></i> Featured
                </div>
                <div className="position-absolute top-0 end-0 m-3">
                  {featuredPosts[0].categories.map((category) => (
                    <span key={category} className="badge bg-primary me-1 p-2">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{featuredPosts[0].title}</h3>
                <p className="card-text text-muted flex-grow-1">
                  {featuredPosts[0].excerpt}
                </p>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={featuredPosts[0].authorAvatar}
                    alt={featuredPosts[0].author}
                    className="rounded-circle me-2"
                    width="30"
                    height="30"
                  />
                  <small className="text-muted">
                    {featuredPosts[0].author} •{" "}
                    {new Date(featuredPosts[0].date).toLocaleDateString()}
                  </small>
                </div>
                <Link
                  to={`/post/${featuredPosts[0].slug}`}
                  className="btn btn-primary"
                >
                  <i className="bi bi-book me-1"></i> Read Article
                </Link>
              </div>
            </div>
          </div>
        )}

        {featuredPosts.length > 1 && (
          <div className="col-lg-5">
            <div className="row h-100">
              {featuredPosts.slice(1, 3).map((post) => (
                <div
                  key={post.id}
                  className="col-12 mb-4"
                  style={{
                    height: featuredPosts.length === 2 ? "100%" : "50%",
                  }}
                >
                  <div
                    className="card border-0 shadow h-100"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      const target = e.currentTarget;
                      target.style.transform = "translateY(-5px)";
                      target.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
                    }}
                    onMouseOut={(e) => {
                      const target = e.currentTarget;
                      target.style.transform = "translateY(0)";
                      target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div className="row g-0 h-100">
                      <div className="col-md-5">
                        <div className="position-relative h-100">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="img-fluid h-100 w-100"
                            style={{ objectFit: "cover" }}
                          />
                          <div
                            className="position-absolute top-0 start-0 bg-primary text-white p-1 m-2 rounded-pill"
                            style={{ fontSize: "0.7rem" }}
                          >
                            <i className="bi bi-star-fill me-1"></i> Featured
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card-body d-flex flex-column h-100">
                          <h5 className="card-title">{post.title}</h5>
                          <p className="card-text small text-muted d-none d-md-block">
                            {post.excerpt.substring(0, 60)}...
                          </p>
                          <div className="mt-auto">
                            <Link
                              to={`/post/${post.slug}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
