import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockBlogPosts } from "../utils/Data";
import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import Comments from "../components/Comments";
import SocialShare from "../components/Share";
import BookmarkButton from "../components/Bookmark";
import ReadingProgressBar from "../components/ReadingProgress";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find((p) => p.slug === slug);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [slug]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Initialize likes
  useEffect(() => {
    if (post) {
      setLikes(post.likes || 0);

      // Check if user has liked this post before
      const likedPosts = JSON.parse(
        localStorage.getItem("blog_liked_posts") || "[]"
      );
      setHasLiked(likedPosts.includes(post.id));
    }
  }, [post]);

  const handleLike = () => {
    if (!hasLiked && post) {
      // Update likes
      setLikes((prev) => prev + 1);
      setHasLiked(true);

      // Save to localStorage
      const likedPosts = JSON.parse(
        localStorage.getItem("blog_liked_posts") || "[]"
      );
      localStorage.setItem(
        "blog_liked_posts",
        JSON.stringify([...likedPosts, post.id])
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 mt-5">
        <Breadcrumb />
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="placeholder-glow">
                  <div
                    className="placeholder col-12 rounded"
                    style={{ height: "300px" }}
                  ></div>
                  <h1 className="placeholder col-8 mt-4" aria-hidden="true"></h1>
                  <div className="d-flex align-items-center my-3">
                    <div
                      className="placeholder rounded-circle me-2"
                      style={{ width: "40px", height: "40px" }}
                    ></div>
                    <div>
                      <p className="placeholder col-8"></p>
                      <p className="placeholder col-4"></p>
                    </div>
                  </div>
                  <p className="placeholder col-12"></p>
                  <p className="placeholder col-12"></p>
                  <p className="placeholder col-12"></p>
                  <p className="placeholder col-10"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-5 mt-5">
        <Breadcrumb />
        <div className="alert alert-danger mt-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> Post not
          found
        </div>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = mockBlogPosts
    .filter((p) => p.id !== post.id)
    .filter(
      (p) =>
        p.tags.some((tag) => post.tags.includes(tag)) ||
        p.categories.some((category) => post.categories.includes(category))
    )
    .slice(0, 3);

  return (
    <>
      <ReadingProgressBar />
      <div className="container py-4 mt-0">
        <Breadcrumb />

        <article className="blog-post mt-4">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="position-relative mb-4">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="img-fluid rounded shadow"
                  style={{
                    maxHeight: "500px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="position-absolute top-0 end-0 m-3">
                  {post.categories.map((category) => (
                    <span key={category} className="badge bg-primary me-1 p-2">
                      {category}
                    </span>
                  ))}
                </div>
                {post.featured && (
                  <div className="position-absolute top-0 start-0 bg-warning text-dark p-2 m-3 rounded-pill">
                    <i className="bi bi-star-fill me-1"></i> Featured
                  </div>
                )}
              </div>

              <h1 className="display-4 mb-3 fw-bold">{post.title}</h1>

              <div className="d-flex align-items-center mb-4">
                <img
                  src={
                    post.authorAvatar ||
                    `https://randomuser.me/api/portraits/${
                      post.author.includes("Jane") ? "women" : "men"
                    }/1.jpg`
                  }
                  alt={post.author}
                  className="rounded-circle me-2"
                  width="50"
                  height="50"
                />
                <div>
                  <span className="fw-bold">{post.author}</span>
                  {post.authorBio && (
                    <p className="text-muted small mb-0">{post.authorBio}</p>
                  )}
                  <div className="text-muted small">
                    <i className="bi bi-calendar-event me-1"></i>
                    {new Date(post.date).toLocaleDateString()} •
                    <i className="bi bi-clock ms-2 me-1"></i>
                    {Math.ceil(post.content.length / 1000)} min read
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mb-4">
                <button
                  className={`btn ${
                    hasLiked ? "btn-danger" : "btn-outline-danger"
                  }`}
                  onClick={handleLike}
                  disabled={hasLiked}
                >
                  <i
                    className={`bi ${
                      hasLiked ? "bi-heart-fill" : "bi-heart"
                    } me-2`}
                  ></i>
                  {likes} {likes === 1 ? "Like" : "Likes"}
                </button>

                <BookmarkButton postId={post.id} postTitle={post.title} />
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="blog-content">
                    {post.content.split("\n\n").map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4 pt-2">
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="mb-3 mb-md-0">
                      <h6 className="mb-2">Tags</h6>
                      <div>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="badge bg-secondary me-1 p-2"
                            style={{
                              transition: "all 0.2s",
                              cursor: "pointer",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <SocialShare
                      title={post.title}
                      url={`/post/${post.slug}`}
                    />
                  </div>
                </div>
              </div>

              <Comments postId={post.id} comments={post.comments || []} />
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-5">
            <h2 className="text-center mb-4">
              <i className="bi bi-arrow-return-right me-2"></i>
              Related Posts
            </h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="col fade-in">
                  <div
                    className="card h-100 shadow-sm border-0"
                    style={{
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0,0,0,0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <img
                      src={relatedPost.thumbnail}
                      className="card-img-top"
                      alt={relatedPost.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{relatedPost.title}</h5>
                      <p className="card-text text-muted">
                        {relatedPost.excerpt}
                      </p>
                      <Link
                        to={`/post/${relatedPost.slug}`}
                        className="btn btn-primary"
                      >
                        <i className="bi bi-book me-2"></i>Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <ScrollToTop />
      </div>
    </>
  );
};

export default BlogPost;
