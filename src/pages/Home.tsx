import React, { useState, useEffect } from "react";
import { mockBlogPosts, categories, tags } from "../utils/Data";
import BlogCard from "../components/PostCard";
import FeaturedPosts from "../components/FeaturedPosts";
import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import StatsCounter from "../components/BlogCounter";
import { BlogPost } from "../types";
import { Link } from "react-router-dom";
import homeImage from "../images/home2.jpg";


const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Simulate initial loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Initialize with first batch of posts
    const sortedPosts = getSortedPosts(filteredPosts, sortOrder);
    setDisplayedPosts(sortedPosts.slice(0, postsPerPage));
  }, [filteredPosts, postsPerPage, sortOrder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPosts(query, selectedCategory, selectedTags, sortOrder);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
    filterPosts(
      searchQuery,
      category === selectedCategory ? "" : category,
      selectedTags,
      sortOrder
    );
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    filterPosts(searchQuery, selectedCategory, newTags, sortOrder);
  };

  const handleSortChange = (newSortOrder: "newest" | "oldest") => {
    setSortOrder(newSortOrder);
    filterPosts(searchQuery, selectedCategory, selectedTags, newSortOrder);
  };

  const getSortedPosts = (posts: BlogPost[], order: "newest" | "oldest") => {
    return [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  const filterPosts = (
    query: string,
    category: string,
    tags: string[],
    order: "newest" | "oldest"
  ) => {
    let filtered = [...mockBlogPosts];

    if (query) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (category) {
      filtered = filtered.filter((post) => post.categories.includes(category));
    }

    if (tags.length > 0) {
      filtered = filtered.filter((post) =>
        tags.every((tag) => post.tags.includes(tag))
      );
    }

    // Sort the filtered posts
    filtered = getSortedPosts(filtered, order);

    setFilteredPosts(filtered);
    setDisplayedPosts(filtered.slice(0, postsPerPage));
  };

  const loadMorePosts = () => {
    setLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextPosts = filteredPosts.slice(
        0,
        displayedPosts.length + postsPerPage
      );
      setDisplayedPosts(nextPosts);
      setLoading(false);
    }, 500);
  };

  const hasMorePosts = displayedPosts.length < filteredPosts.length;

  if (initialLoading) {
    return (
      <div className="container py-5 mt-5">
        <div className="placeholder-glow">
          <div
            className="placeholder col-12 mb-4"
            style={{ height: "300px" }}
          ></div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div
                className="placeholder col-12"
                style={{ height: "200px" }}
              ></div>
              <h4 className="placeholder col-8 mt-2"></h4>
              <p className="placeholder col-12"></p>
            </div>
            <div className="col-md-4 mb-4">
              <div
                className="placeholder col-12"
                style={{ height: "200px" }}
              ></div>
              <h4 className="placeholder col-8 mt-2"></h4>
              <p className="placeholder col-12"></p>
            </div>
            <div className="col-md-4 mb-4">
              <div
                className="placeholder col-12"
                style={{ height: "200px" }}
              ></div>
              <h4 className="placeholder col-8 mt-2"></h4>
              <p className="placeholder col-12"></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-0 pb-5 mt-0">
      <Breadcrumb />
      <div className="text-center rounded mb-2 ">
        <img src={homeImage} alt="Home Banner" 
        style={{ maxHeight: "70vh", maxWidth: "100%", width: "70%", borderRadius: "25px" }}
        className="img-fluid" />
      </div>

      <FeaturedPosts posts={mockBlogPosts} />

      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm mb-0">
            <div className="card-body text-center pt-3 pb-0">
              <h2 className="display-6 fw-bold mb-1">
                Discover Our{" "}
                <span className="text-primary">Extensive Articles</span>
              </h2>
              <p className="lead mb-0">
                Explore over 140 articles across Travel, Lifestyle, Food, Wellness, Travel Tips, Culture, and Adventure categories.
              </p>
              <StatsCounter showTitle={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search posts by title, content, tags or author..."
              value={searchQuery}
              onChange={handleSearch}
              aria-label="Search posts"
            />
            {searchQuery && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  filterPosts("", selectedCategory, selectedTags, sortOrder);
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
            <label className="me-2 text-nowrap">Sort by:</label>
            <div className="btn-group">
              <button
                className={`btn ${
                  sortOrder === "newest" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleSortChange("newest")}
              >
                <i className="bi bi-arrow-down me-1"></i> Newest
              </button>
              <button
                className={`btn ${
                  sortOrder === "oldest" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleSortChange("oldest")}
              >
                <i className="bi bi-arrow-up me-1"></i> Oldest
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="text-nowrap mt-1">Categories:</span>
            {categories.map((category) => (
              <button
                key={category}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-outline-primary"
                } btn-sm`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
            {selectedCategory && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  setSelectedCategory("");
                  filterPosts(searchQuery, "", selectedTags, sortOrder);
                }}
              >
                <i className="bi bi-x-lg me-1"></i> Clear
              </button>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle w-100"
              type="button"
              id="tagsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedTags.length === 0
                ? "Filter by tags"
                : `${selectedTags.length} tag(s) selected`}
            </button>
            <ul
              className="dropdown-menu p-3"
              aria-labelledby="tagsDropdown"
              style={{ width: "300px", maxHeight: "300px", overflowY: "auto" }}
            >
              <div className="d-flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div key={tag} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                    />
                    <label className="form-check-label" htmlFor={`tag-${tag}`}>
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <div className="mt-3">
                  <button
                    className="btn btn-outline-secondary btn-sm w-100"
                    onClick={() => {
                      setSelectedTags([]);
                      filterPosts(searchQuery, selectedCategory, [], sortOrder);
                    }}
                  >
                    <i className="bi bi-x-lg me-1"></i> Clear All Tags
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>

      {searchQuery || selectedCategory || selectedTags.length > 0 ? (
        <div className="alert alert-info mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <span>
              <i className="bi bi-funnel-fill me-2"></i>
              Showing {filteredPosts.length} results
              {searchQuery && (
                <span>
                  {" "}
                  for <strong>"{searchQuery}"</strong>
                </span>
              )}
              {selectedCategory && (
                <span>
                  {" "}
                  in <strong>{selectedCategory}</strong>
                </span>
              )}
              {selectedTags.length > 0 && (
                <span>
                  {" "}
                  with tags:{" "}
                  <strong>
                    {selectedTags.map((tag, index) => (
                      <span key={tag}>
                        {index > 0 && ", "}
                        {tag}
                      </span>
                    ))}
                  </strong>
                </span>
              )}
            </span>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedTags([]);
                filterPosts("", "", [], sortOrder);
              }}
            >
              <i className="bi bi-x-circle me-1"></i>
              Clear All Filters
            </button>
          </div>
        </div>
      ) : null}

      {filteredPosts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          No posts found matching your criteria. Try adjusting your filters.
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {displayedPosts.map((post, index) => (
              <div
                key={post.id}
                className="col fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: "0.5s",
                }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          {hasMorePosts && (
            <div className="text-center my-4">
              <button
                className="btn btn-primary px-4 py-2"
                onClick={loadMorePosts}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-2 "></i>
                    Load More Posts
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      <div className="list-group  ">
        <Link
          to="/"
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
            activeCategory === "all" ? "active" : ""
          }`}
          onClick={() => setActiveCategory("all")}
        >
          <div>
            <i className="bi bi-grid-fill me-2"></i> All Posts
          </div>
          <span className="badge bg-primary rounded-pill">
            {mockBlogPosts.length}
          </span>
        </Link>
        <Link
          to="/bookmarks"
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <div>
            <i className="bi bi-bookmark-heart-fill me-2"></i> My Bookmarks
          </div>
          <span className="badge bg-warning rounded-pill">
            <i className="bi bi-star"></i>
          </span>
        </Link>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Home;
