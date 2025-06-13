import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../types";

interface BlogCardProps {
  post: BlogPost;
}

// Category badge colors
const categoryColors: Record<string, string> = {
  
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Check if this post is already bookmarked
    const bookmarks = JSON.parse(
      localStorage.getItem("blog_bookmarks") || "[]"
    );
    setIsBookmarked(bookmarks.some((bookmark: any) => bookmark.id === post.id));
  }, [post.id]);

  return (
    <div
      className="card h-100 shadow-sm border-0"
      style={{
        transition: "all 0.3s ease",
        transform: "translateY(0)",
      }}
      onMouseOver={(e) => {
        const target = e.currentTarget;
        target.style.transform = "translateY(-5px)";
        target.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget;
        target.style.transform = "translateY(0)";
        target.style.boxShadow = "";
      }}
    >
      <div className="position-relative">
        <img
          src={post.thumbnail}
          className="card-img-top"
          alt={post.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        {post.featured && (
          <div
            className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark"
            style={{ opacity: "0.9" }}
          >
            <i className="bi bi-star-fill me-1"></i> Featured
          </div>
        )}
        <div
          className="position-absolute top-0 end-0 m-2"
          style={{ zIndex: 1 }}
        >
          {post.categories.slice(0, 2).map((category, index) => (
            <span
              key={category}
              className={`badge bg-${
                categoryColors[category] || "secondary"
              } me-1`}
              style={{ opacity: "0.9" }}
            >
              {category}
            </span>
          ))}
          {post.categories.length > 2 && (
            <span className="badge bg-dark" style={{ opacity: "0.9" }}>
              +{post.categories.length - 2}
            </span>
          )}
          {isBookmarked && (
            <span className="badge bg-warning ms-1" title="Bookmarked">
              <i className="bi bi-bookmark-fill"></i>
            </span>
          )}
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-muted flex-grow-1">{post.excerpt}</p>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center">
            {post.authorAvatar ? (
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="rounded-circle me-2"
                width="24"
                height="24"
              />
            ) : (
              <i className="bi bi-person-circle me-1"></i>
            )}
            <small className="text-muted">{post.author}</small>
          </div>
          <small className="text-muted">
            <i className="bi bi-calendar3 me-1"></i>
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </small>
        </div>

        {post.likes !== undefined && (
          <div className="mt-2 mb-1">
            <small className="text-muted">
              <i className="bi bi-heart me-1"></i> {post.likes} likes
              {post.comments && (
                <span className="ms-2">
                  <i className="bi bi-chat me-1"></i> {post.comments.length}{" "}
                  comments
                </span>
              )}
            </small>
          </div>
        )}

        <div className="mt-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="badge bg-light text-dark me-1 mb-1"
              style={{
                transition: "all 0.2s",
                cursor: "pointer",
                border: "1px solid #dee2e6",
              }}
              onMouseOver={(e) => {
                const target = e.currentTarget;
                target.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                const target = e.currentTarget;
                target.style.transform = "scale(1)";
              }}
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="badge bg-light text-dark mb-1">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
        <Link
          to={`/post/${post.slug}`}
          className="btn btn-outline-primary mt-3"
          style={{
            transition: "all 0.2s",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
          onMouseOver={(e) => {
            const target = e.currentTarget;
            target.style.color = "#fff";
            target.style.backgroundColor = "#0d6efd";
          }}
          onMouseOut={(e) => {
            const target = e.currentTarget;
            target.style.color = "#0d6efd";
            target.style.backgroundColor = "transparent";
          }}
        >
          <i className="bi bi-book me-1"></i> Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
