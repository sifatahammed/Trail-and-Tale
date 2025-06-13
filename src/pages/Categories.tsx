import React, { useState, useEffect, useRef } from "react";
import { mockBlogPosts, categories } from "../utils/Data";
import BlogCard from "../components/PostCard";
import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import StatsCounter from "../components/BlogCounter";
import { BlogPost } from "../types";
import Image from "../images/6.jpg";

// Category icons mapping
const categoryIcons: Record<string, string> = {
  Travel: "bi-geo-alt-fill",
  Lifestyle: "bi-house-heart",
  Food: "bi-cup-straw",
  Wellness: "bi-heart-pulse",
  "Travel Tips": "bi-signpost-2",
  Culture: "bi-globe-europe-africa",
  Adventure: "bi-binoculars",
};


type SortOption = "newest" | "oldest" | "popular";

const Categories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // Filter posts when category or search query changes
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      let newFilteredPosts = mockBlogPosts;

      // Filter by category
      if (activeCategory !== "All") {
        newFilteredPosts = newFilteredPosts.filter((post) =>
          post.categories.includes(activeCategory)
        );
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        newFilteredPosts = newFilteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.author.toLowerCase().includes(query) ||
            post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      // Sort posts
      newFilteredPosts = sortPosts(newFilteredPosts, sortOption);

      setFilteredPosts(newFilteredPosts);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300); // Simulate loading delay
  }, [activeCategory, searchQuery, sortOption]);

  // Update displayed posts when filtered posts or page changes
  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setDisplayedPosts(filteredPosts.slice(indexOfFirstPost, indexOfLastPost));

    // Calculate total pages
    setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
  }, [filteredPosts, currentPage, postsPerPage]);

  // Sort posts based on selected option
  const sortPosts = (posts: BlogPost[], option: SortOption): BlogPost[] => {
    const sortedPosts = [...posts];

    switch (option) {
      case "newest":
        return sortedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "oldest":
        return sortedPosts.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "popular":
        return sortedPosts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      default:
        return sortedPosts;
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setSearchQuery(""); // Reset search when category changes
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  // Navigate to specific page
  const middleSectionRef = useRef<HTMLDivElement | null>(null);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    middleSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Count posts per category
  const getCategoryCount = (category: string) => {
    if (category === "All") return mockBlogPosts.length;
    return mockBlogPosts.filter((post) => post.categories.includes(category))
      .length;
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <li
        key="prev"
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          aria-label="Previous page"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      </li>
    );

    // Show first page
    if (currentPage > 3) {
      items.push(
        <li key={1} className="page-item">
          <button className="page-link" onClick={() => paginate(1)}>
            1
          </button>
        </li>
      );

      // Show ellipsis if needed
      if (currentPage > 4) {
        items.push(
          <li key="ellipsis1" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    // Show pages around current page
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      items.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => paginate(i)}>
            {i}
          </button>
        </li>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <li key="ellipsis2" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Show last page
    if (currentPage < totalPages - 1 && totalPages > 3) {
      items.push(
        <li key={totalPages} className="page-item">
          <button className="page-link" onClick={() => paginate(totalPages)}>
            {totalPages}
          </button>
        </li>
      );
    }

    // Next button
    items.push(
      <li
        key="next"
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          aria-label="Next page"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </li>
    );

    return items;
  };

  return (
    <div className="container pt-2 pb-2 mt-0">
      <Breadcrumb />

      <div
        className="d-flex justify-content-center align-items-center"
      >
        <section
          className="py-2 text-center rounded shadow-sm mb-3"
          style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '750px',
            height: '400px',
            color: 'white',
          }}
        >
          <div className="row py-1 rounded bg-opacity-25 mx-auto"
          style={{ 
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            height: "100%",
            width: '98%',
             }}>
            <div className="col-lg-10 mx-auto my-auto">
              <h1 className="display-5 fw-bold mb-2 text-white"
              style={{ 
                textShadow: `
                -2px -2px 0 black,  
                2px -2px 0 black,
                -2px  2px 0 black,
                2px  2px 0 black`,
            }}>
            Categories</h1>
              <p className="lead mb-4 text-white fw-bold"
              style={{ 
                fontSize: "23px",
                textShadow: `
                -1px -1px 0 black,  
                1px -1px 0 black,
                -1px  1px 0 black,
                1px  1px 0 black`,
              }}>
               Whether you're planning your next adventure, exploring new wellness habits, 
            or looking for inspiration on Travel, Culture, and food, through our carefully 
            curated categories discover stories,
             tips, and guides tailored to your interests—all in one place.
              </p>
            </div>
          </div>
        </section>
      </div>

      <StatsCounter />

      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
                <div className="col">
                  <button
                    className={`btn btn-lg w-100 h-100 ${
                      activeCategory === "All"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => handleCategoryClick("All")}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <i className="bi bi-grid-3x3-gap-fill fs-4 d-block mb-2"></i>
                    All
                    <span className="badge bg-white text-primary ms-2">
                      {getCategoryCount("All")}
                    </span>
                  </button>
                </div>

                {categories.map((category) => (
                  <div className="col" key={category}>
                    <button
                      className={`btn btn-lg w-100 h-100 ${
                        activeCategory === category
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleCategoryClick(category)}
                      style={{ transition: "all 0.3s ease" }}
                    >
                      <i
                        className={`bi ${
                          categoryIcons[category] || "bi-folder"
                        } fs-4 d-block mb-2`}
                      ></i>
                      {category}
                      <span className="badge bg-white text-primary ms-2">
                        {getCategoryCount(category)}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-7">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={`Search in ${
                activeCategory === "All" ? "all categories" : activeCategory
              }...`}
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label={`Search in ${
                activeCategory === "All" ? "all categories" : activeCategory
              }`}
            />
            {searchQuery && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-md-5">
          <div className="d-flex justify-content-md-end mt-3 mt-md-0">
            <div className="btn-group">
              <button
                className={`btn ${
                  sortOption === "newest"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleSortChange("newest")}
              >
                <i className="bi bi-arrow-down me-1"></i> Newest
              </button>
              <button
                className={`btn ${
                  sortOption === "oldest"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleSortChange("oldest")}
              >
                <i className="bi bi-arrow-up me-1"></i> Oldest
              </button>
              <button
                className={`btn ${
                  sortOption === "popular"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => handleSortChange("popular")}
              >
                <i className="bi bi-heart me-1"></i> Popular
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="card-title h4 mb-0">
                    <i
                      className={`bi ${
                        activeCategory !== "All"
                          ? categoryIcons[activeCategory] || "bi-folder"
                          : "bi-grid-3x3-gap-fill"
                      } me-2`}
                    ></i>
                    {activeCategory === "All" ? "All Posts" : activeCategory}
                  </h2>
                  <p className="text-muted mb-0">
                    {filteredPosts.length}{" "}
                    {filteredPosts.length === 1 ? "post" : "posts"} found
                  </p>
                </div>
                <div ref={middleSectionRef}  className="d-none d-md-block">
                  <span className="text-muted">
                    Showing{" "}
                    {filteredPosts.length > 0
                      ? (currentPage - 1) * postsPerPage + 1
                      : 0}{" "}
                    to{" "}
                    {Math.min(currentPage * postsPerPage, filteredPosts.length)}{" "}
                    of {filteredPosts.length} posts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="col">
              <div className="card shadow-sm h-100 border-0">
                <div
                  className="card-img-top loading-skeleton"
                  style={{ height: "200px" }}
                ></div>
                <div className="card-body">
                  <div
                    className="loading-skeleton"
                    style={{ height: "24px", width: "80%" }}
                  ></div>
                  <div
                    className="loading-skeleton mt-2"
                    style={{ height: "16px", width: "60%" }}
                  ></div>
                  <div
                    className="loading-skeleton mt-4"
                    style={{ height: "80px" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="alert alert-info fade-in" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          {searchQuery
            ? `No posts found matching "${searchQuery}" in ${
                activeCategory === "All" ? "all categories" : activeCategory
              }.`
            : `No posts found in ${activeCategory}.`}
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
            {displayedPosts.map((post, index) => (
              <div
                key={post.id}
                className="col fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Page navigation" className="my-4">
              <ul className="pagination justify-content-center">
                {renderPaginationItems()}
              </ul>
            </nav>
          )}
        </>
      )}

      <ScrollToTop />
    </div>
  );
};

export default Categories;
