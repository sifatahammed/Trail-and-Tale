import React, { useState, useEffect } from "react";
import { Comment } from "../types";

interface CommentsProps {
  postId: string;
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({
  postId,
  comments: initialComments,
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load comments from localStorage if available
  useEffect(() => {
    const storedComments = localStorage.getItem(`blog_comments_${postId}`);
    if (storedComments) {
      try {
        const parsedComments = JSON.parse(storedComments);
        setComments([...initialComments, ...parsedComments]);
      } catch (e) {
        console.error("Error parsing stored comments", e);
      }
    }
  }, [postId, initialComments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.author.trim() || !newComment.content.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    setError("");

    // Simulate API delay
    setTimeout(() => {
      const comment: Comment = {
        id: `local_${Date.now()}`,
        postId,
        author: newComment.author,
        authorAvatar: `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? "women" : "men"
        }/${Math.floor(Math.random() * 100)}.jpg`,
        content: newComment.content,
        date: new Date().toISOString(),
        likes: 0,
      };

      const updatedComments = [...comments, comment];
      setComments(updatedComments);

      // Store only local comments in localStorage
      const localComments = updatedComments.filter((c) =>
        c.id.startsWith("local_")
      );
      localStorage.setItem(
        `blog_comments_${postId}`,
        JSON.stringify(localComments)
      );

      setNewComment({ author: "", content: "" });
      setSubmitting(false);
    }, 500);
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    );
  };

  return (
    <div className="comments-section mt-5">
      <h3 className="mb-4">
        <i className="bi bi-chat-left-text me-2"></i>
        Comments ({comments.length})
      </h3>

      {comments.length > 0 ? (
        <div className="comment-list">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="comment card border-0 shadow-sm mb-3"
            >
              <div className="card-body">
                <div className="d-flex mb-3">
                  <img
                    src={
                      comment.authorAvatar ||
                      `https://randomuser.me/api/portraits/lego/1.jpg`
                    }
                    alt={comment.author}
                    className="rounded-circle me-3"
                    width="45"
                    height="45"
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{comment.author}</h6>
                    <small className="text-muted">
                      {new Date(comment.date).toLocaleDateString()} at{" "}
                      {new Date(comment.date).toLocaleTimeString()}
                    </small>
                  </div>
                </div>
                <p className="mb-2">{comment.content}</p>
                <button
                  onClick={() => handleLike(comment.id)}
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="bi bi-hand-thumbs-up me-1"></i>
                  Like ({comment.likes || 0})
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-light text-center">
          No comments yet. Be the first to comment!
        </div>
      )}

      <div className="add-comment mt-4">
        <h4 className="mb-3">Leave a Comment</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="commentName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="commentName"
              value={newComment.author}
              onChange={(e) =>
                setNewComment({ ...newComment, author: e.target.value })
              }
              placeholder="Your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="commentContent" className="form-label">
              Comment
            </label>
            <textarea
              className="form-control"
              id="commentContent"
              rows={4}
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              placeholder="Share your thoughts..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Posting...
              </>
            ) : (
              <>
                <i className="bi bi-chat-right-text me-1"></i> Post Comment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
