import React, { useState } from "react";
import { ContactFormData } from "../types";
import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.target as HTMLFormElement;

    try {
      // Use FormData for more reliable Formspree submission
      const formData = new FormData(form);

      const response = await fetch("https://formspree.io/f/xyzkpjgd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        form.reset();
      } else {
        console.error("Form submission error:", await response.text());
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4 mt-5">
      <Breadcrumb />

      <div className="row mb-4">
        <div className="col-lg-6">
          <h1 className="display-5 mb-4 fw-bold">
            <span className="text-primary">Contact</span> Us
          </h1>
          <p className="lead text-muted mb-4">
            Have a question or feedback? We'd love to hear from you. Fill out
            the form and we'll get back to you as soon as possible.
          </p>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h3 className="h5 mb-3">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                Our Location
              </h3>
              <p>
                123 Blog Street, Los Angeles
                <br />
                US, 98765
              </p>

              <h3 className="h5 mb-3">
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                Email Us
              </h3>
              <p>
                <a
                  href="mailto:info@blogwebsite.com"
                  className="text-decoration-none"
                >
                  info@blogwebsite.com
                </a>
              </p>

              <h3 className="h5 mb-3">
                <i className="bi bi-telephone-fill text-primary me-2"></i>
                Call Us
              </h3>
              <p>+1 (123) 456-7890</p>

              <h3 className="h5 mb-3">
                <i className="bi bi-clock-fill text-primary me-2"></i>
                Office Hours
              </h3>
              <p>
                Monday to Friday: 9AM - 5PM
                <br />
                Saturday & Sunday: Closed
              </p>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5 mb-3">
                <i className="bi bi-share-fill text-primary me-2"></i>
                Connect With Us
              </h3>
              <div className="d-flex gap-3">
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-primary rounded-circle"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="card border-0 shadow">
            <div className="card-body p-4">
              <h2 className="card-title mb-4">Send a Message</h2>
              <form onSubmit={handleSubmit} id="contactForm">
                <input
                  type="hidden"
                  name="_subject"
                  value="New contact form submission"
                />
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <i className="bi bi-person text-primary me-2"></i>
                    Your Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="bi bi-envelope text-primary me-2"></i>
                    Your Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    <i className="bi bi-chat-text text-primary me-2"></i>
                    Your Message
                  </label>
                  <textarea
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {submitStatus === "success" && (
                <div className="alert alert-success mt-3 fade-in">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="alert alert-danger mt-3 fade-in">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Sorry, there was an error sending your message. Please try
                  again later.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Contact;
