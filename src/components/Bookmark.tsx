import React, { useState, useEffect } from "react";

interface BookmarkButtonProps {
  postId: string;
  postTitle: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  postId,
  postTitle,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if this post is already bookmarked
    const bookmarks = JSON.parse(
      localStorage.getItem("blog_bookmarks") || "[]"
    );
    setIsBookmarked(bookmarks.some((bookmark: any) => bookmark.id === postId));
  }, [postId]);

  const toggleBookmark = () => {
    setIsAnimating(true);

    // Get current bookmarks
    const bookmarks = JSON.parse(
      localStorage.getItem("blog_bookmarks") || "[]"
    );

    // Check if already bookmarked
    const existingIndex = bookmarks.findIndex(
      (bookmark: any) => bookmark.id === postId
    );

    let newBookmarks;
    if (existingIndex >= 0) {
      // Remove bookmark
      newBookmarks = bookmarks.filter(
        (_: any, index: number) => index !== existingIndex
      );
      setIsBookmarked(false);
    } else {
      // Add bookmark
      newBookmarks = [
        ...bookmarks,
        {
          id: postId,
          title: postTitle,
          date: new Date().toISOString(),
        },
      ];
      setIsBookmarked(true);
    }

    // Save to localStorage
    localStorage.setItem("blog_bookmarks", JSON.stringify(newBookmarks));

    // Reset animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button
      className={`btn ${isBookmarked ? "btn-warning" : "btn-outline-warning"}`}
      onClick={toggleBookmark}
      style={{
        transition: "all 0.3s ease",
        transform: isAnimating ? "scale(1.2)" : "scale(1)",
      }}
      aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
    >
      <i
        className={`bi ${
          isBookmarked ? "bi-bookmark-fill" : "bi-bookmark"
        } me-2`}
      ></i>
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
};

export default BookmarkButton;
