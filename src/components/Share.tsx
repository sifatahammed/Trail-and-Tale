import React from "react";

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  // Ensure we're using the full URL
  const shareUrl = url.startsWith("http") ? url : window.location.origin + url;

  const shareLinks = [
    {
      name: "Facebook",
      icon: "bi-facebook",
      color: "#3b5998",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "Twitter",
      icon: "bi-twitter-x",
      color: "#000000",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: "bi-linkedin",
      color: "#0077b5",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
    },
    {
      name: "WhatsApp",
      icon: "bi-whatsapp",
      color: "#25D366",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        title + " " + shareUrl
      )}`,
    },
    {
      name: "Email",
      icon: "bi-envelope-fill",
      color: "#dd4b39",
      url: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const handleShare = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    window.open(link, "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="social-share">
      <h6 className="mb-2 mt-3">
        <i className="bi bi-share me-2"></i>
        Share this post
      </h6>
      <div className="d-flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <button
            key={link.name}
            className="btn btn-light rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              background: "white",
              color: link.color,
              border: `1px solid ${link.color}20`,
            }}
            onClick={(e) => handleShare(e, link.url)}
            aria-label={`Share on ${link.name}`}
            onMouseOver={(e) => {
              const target = e.currentTarget;
              target.style.background = link.color;
              target.style.color = "white";
              target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget;
              target.style.background = "white";
              target.style.color = link.color;
              target.style.transform = "translateY(0)";
            }}
          >
            <i className={`bi ${link.icon}`}></i>
          </button>
        ))}
        <button
          className="btn btn-light rounded-circle"
          style={{
            width: "40px",
            height: "40px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            background: "white",
            color: "#6c757d",
            border: "1px solid rgba(108, 117, 125, 0.2)",
          }}
          onClick={copyToClipboard}
          aria-label="Copy link"
          onMouseOver={(e) => {
            const target = e.currentTarget;
            target.style.background = "#6c757d";
            target.style.color = "white";
            target.style.transform = "translateY(-3px)";
          }}
          onMouseOut={(e) => {
            const target = e.currentTarget;
            target.style.background = "white";
            target.style.color = "#6c757d";
            target.style.transform = "translateY(0)";
          }}
        >
          <i className="bi bi-link-45deg"></i>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
