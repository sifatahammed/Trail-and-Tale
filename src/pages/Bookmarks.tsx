import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import { mockBlogPosts } from "../utils/Data";
import { BlogPost } from "../types";

interface BookmarkItem {
  id: string;
  title: string;
  date: string;
}

const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "alphabetical">(
    "newest"
  );

  useEffect(() => {
    // Load bookmarks from localStorage
    const loadBookmarks = () => {
      const storedBookmarks = JSON.parse(
        localStorage.getItem("blog_bookmarks") || "[]"
      );
      setBookmarks(storedBookmarks);

      // Find the full post data for each bookmark
      const posts = storedBookmarks
        .map((bookmark: BookmarkItem) => {
          return mockBlogPosts.find((post) => post.id === bookmark.id);
        })
        .filter(
          (post: BlogPost | undefined) => post !== undefined
        ) as BlogPost[];

      setBookmarkedPosts(posts);
      setIsLoading(false);
    };

    loadBookmarks();
  }, []);

  const removeBookmark = (id: string) => {
    // Remove from state
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    setBookmarkedPosts(bookmarkedPosts.filter((post) => post.id !== id));

    // Update localStorage
    localStorage.setItem("blog_bookmarks", JSON.stringify(updatedBookmarks));
  };

  const clearAllBookmarks = () => {
    if (window.confirm("Are you sure you want to remove all bookmarks?")) {
      setBookmarks([]);
      setBookmarkedPosts([]);
      localStorage.setItem("blog_bookmarks", JSON.stringify([]));
    }
  };

  // Filter bookmarks based on search term
  const filteredBookmarks = bookmarkedPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort bookmarks
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="container py-2">
      <Breadcrumb />

      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h2 mb-0">
                  <i className="bi bi-bookmark-heart-fill text-primary me-2"></i>
                  My Bookmarks
                </h1>
                {bookmarks.length > 0 && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={clearAllBookmarks}
                  >
                    <i className="bi bi-trash me-1"></i> Clear All
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : bookmarks.length === 0 ? (
                <div className="text-center py-5">
                  <div className="display-1 text-muted">
                    <i className="bi bi-bookmark"></i>
                  </div>
                  <h3 className="mt-3">No bookmarks yet</h3>
                  <p className="text-muted">
                    Start bookmarking posts you like to read them later
                  </p>
                  <Link to="/" className="btn btn-primary mt-3">
                    <i className="bi bi-house-door me-1"></i> Browse Posts
                  </Link>
                </div>
              ) : (
                <>
                  {/* Search and Filter */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text bg-primary text-white">
                          <i className="bi bi-search"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search your bookmarks..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text bg-primary text-white">
                          <i className="bi bi-sort-down"></i>
                        </span>
                        <select
                          className="form-select"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="alphabetical">A-Z</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {filteredBookmarks.length === 0 ? (
                    <div className="alert alert-info">
                      No bookmarks match your search.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th style={{ width: "60px" }}>Thumbnail</th>
                            <th>Title</th>
                            <th style={{ width: "120px" }}>Date</th>
                            <th style={{ width: "180px" }}>Category</th>
                            <th style={{ width: "120px" }} aria-label="Actions">
                              <span className="d-flex align-items-center">
                                <i className="bi bi-gear me-1"></i>
                                <span>Actions</span>
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedBookmarks.map((post) => (
                            <tr key={post.id} className="fade-in">
                              <td>
                                <img
                                  src={post.thumbnail}
                                  alt={post.title}
                                  className="img-fluid rounded"
                                  width="50"
                                  height="50"
                                  style={{ objectFit: "cover" }}
                                />
                              </td>
                              <td>
                                <Link
                                  to={`/post/${post.slug}`}
                                  className="text-decoration-none"
                                >
                                  <h5 className="mb-0">{post.title}</h5>
                                  <small className="text-muted">
                                    by {post.author}
                                  </small>
                                </Link>
                              </td>
                              <td>
                                <small className="text-muted">
                                  {new Date(post.date).toLocaleDateString()}
                                </small>
                              </td>
                              <td>
                                {post.categories.map((category) => (
                                  <span
                                    key={category}
                                    className="badge bg-primary me-1"
                                  >
                                    {category}
                                  </span>
                                ))}
                              </td>
                              <td>
                                <div className="btn-group" role="group">
                                  <Link
                                    to={`/post/${post.slug}`}
                                    className="btn btn-sm btn-outline-primary"
                                    title="Read"
                                  >
                                    <i className="bi bi-book"></i>
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeBookmark(post.id)}
                                    title="Remove bookmark"
                                  >
                                    <i className="bi bi-bookmark-x"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Bookmarks;
