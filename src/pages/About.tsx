import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import Image from "../images/10885138.jpg";


const About: React.FC = () => {
  // Mock team members data
    const teamMembers = [
      {
        id: 1,
        name: "John Doe",
        role: "Founder & Travel Enthusiast",
        bio: "John has traveled to 30+ countries and loves sharing authentic experiences and travel tips.",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        social: {
          twitter: "#",
          linkedin: "#",
          instagram: "#",
        },
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "Content Director & Lifestyle Writer",
        bio: "Jane crafts engaging articles about wellness, culture, and mindful living to inspire our readers.",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        social: {
          twitter: "#",
          linkedin: "#",
          instagram: "#",
        },
      },
      {
        id: 3,
        name: "Mike Johnson",
        role: "Photographer & Visual Storyteller",
        bio: "Mike captures stunning images that bring our travel and lifestyle stories to life.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        social: {
          twitter: "#",
          linkedin: "#",
          instagram: "#",
        },
      },
    ];


  // Skills and technologies data
const skills = [
  { name: "Travel Planning", percentage: 90 },
  { name: "Destination Guides", percentage: 85 },
  { name: "Cultural Insights", percentage: 80 },
  { name: "Wellness & Self-Care", percentage: 75 },
  { name: "Food & Local Cuisine", percentage: 85 },
  { name: "Photography & Visual Storytelling", percentage: 70 },
];


  return (
    <div className="container py-0 ">
      <Breadcrumb />

      {/* Hero Section */}
    <div
        className="d-flex justify-content-center align-items-center"
      >
        <section
          className="py-3 text-center rounded shadow-sm mb-3"
          style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '700px',
            height: '360px',
            color: 'white',

          }}
        >
          <div className="row py-0 rounded bg-dark bg-opacity-50 h-100 mx-auto"
          style={{ width: '96%', 
            textShadow: `
                -1px -1px 0 black,  
                1px -1px 0 black,
                -1px  1px 0 black,
                1px  1px 0 black`,
           }}>
            <div className="col-lg-11 mx-auto my-auto">
              <h1 className="display-5 fw-bold mb-1 text-white"
              style={{ 
                textShadow: `
                -2px -2px 0 black,  
                2px -2px 0 black,
                -2px  2px 0 black,
                2px  2px 0 black`,
            }}>About Our Blog
            </h1>
              <p className="lead mb-4 text-white">
                We are passionate about sharing stories, tips, and insights on travel,
                wellness, culture, and everyday living. Our blog is a space for curious
                explorers and lifestyle lovers to get inspired, plan adventures, and
                embrace a more fulfilling way of life.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/categories" className="btn btn-primary btn-lg px-4">
                  Explore Categories
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>



      <div className="row g-4">
        <div className="col-lg-8">
          {/* Welcome Section */}
          <div className="card border-0 shadow-sm mb-4 fade-in">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <span className="bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle me-3" style={{ width: "48px", height: "48px" }}>
                  <i className="bi bi-people-fill fs-4"></i>
                </span>
                <h2 className="card-title h3 mb-0">Welcome to Our Blog</h2>
              </div>

              <p className="card-text">
                We are passionate about sharing stories, tips, and insights on travel, wellness, 
                culture, and everyday living. Our blog is a space for curious explorers and lifestyle lovers 
                to get inspired, plan adventures, and embrace a more fulfilling way of life.
              </p>

              {/* Statistics */}
              <div className="row text-center my-4 g-3">
                <div className="col-md-4">
                  <div className="p-4 rounded bg-light h-100 border-start border-primary border-5">
                    <h3 className="text-primary display-6 fw-bold">100+</h3>
                    <p className="mb-0 fw-medium text-black">Articles Published</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-4 rounded bg-light h-100 border-start border-success border-5">
                    <h3 className="text-success display-6 fw-bold">10k+</h3>
                    <p className="mb-0 fw-medium text-black">Monthly Readers</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-4 rounded bg-light h-100 border-start border-danger border-5">
                    <h3 className="text-danger display-6 fw-bold">5+</h3>
                    <p className="mb-0 fw-medium text-black">Years of Experience</p>
                  </div>
                </div>
              </div>

              <h3 className="mt-5 mb-3 border-bottom pb-2">Our Mission</h3>
              <div className="row align-items-center">
                 <div className="col-md-0">
                  <img
                    src="https://i0.wp.com/eatsleeplovetravel.com/wp-content/uploads/2020/06/shutterstock_597796082-scaled.jpg?fit=2048%2C1365&ssl=1"
                    alt="Our Mission"
                    className="img-fluid rounded shadow"
                  />
                <div className="row-md-6 mt-2">
                  <p className="card-text">
                    Our mission is to inspire meaningful journeys and balanced living through high-quality, 
                    engaging content. We believe in making travel accessible, lifestyle enriching, and every story worth sharing — 
                    offering practical tips, destination guides, and personal insights to help you explore more and live better.
                  </p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent ps-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Offer inspiring and practical content for travelers and lifestyle enthusiasts 
                      of all experience levels.

                    </li>
                    <li className="list-group-item bg-transparent ps-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Share trusted tips, personal stories, and expert advice for memorable and mindful living.
                    </li>
                    <li className="list-group-item bg-transparent ps-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Foster a welcoming community for sharing experiences, recommendations, and encouragement.
                    </li>
                  </ul>
                </div>    
                </div>
              </div>
            </div>
          </div>

          {/* Technologies and Skills */}
          <div
            className="card border-0 shadow-sm mb-4 fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <span className="bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle me-3" style={{ width: "48px", height: "48px" }}>
                  <i className="bi bi-people-fill fs-4"></i>
                </span>
                <h2 className="card-title h3 mb-0">Our Expertise</h2>
              </div>

              <p className="mb-4">
                We bring you travel adventures, lifestyle inspiration, and helpful tips to 
                make every day feel like a new journey.
              </p>

              <div className="row">
                {skills.map((skill, index) => (
                  <div className="col-md-6 mb-3" key={index}>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-medium">{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: "10px" }}>
                      <div
                        className={`progress-bar progress-bar-striped progress-bar-animated bg-${
                          index % 3 === 0
                            ? "primary"
                            : index % 3 === 1
                            ? "success"
                            : "danger"
                        }`}
                        role="progressbar"
                        style={{ width: `${skill.percentage}%` }}
                        aria-valuenow={skill.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} skill level`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div
            className="card border-0 shadow-sm mb-4 fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <span className="bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle me-3" style={{ width: "48px", height: "48px" }}>
                  <i className="bi bi-people-fill fs-4"></i>
                </span>
                <h2 className="card-title h3 mb-0">Our Journey</h2>
              </div>

              <div className="timeline mt-4">
                <div className="timeline-item mb-5 position-relative ps-5">
                  <div
                    className="timeline-marker bg-primary text-white rounded-circle position-absolute d-flex align-items-center justify-content-center"
                    style={{
                      left: "0",
                      top: "0",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <i className="bi bi-rocket-takeoff"></i>
                  </div>
                  <h4 className="text-primary">2022</h4>
                  <h5>Blog Launched</h5>
                  <p>
                    Our journey began with a simple goal: to inspire exploration and share real stories,
                     tips, and lifestyle ideas for those who crave adventure, culture, and meaningful experiences.
                  </p>
                </div>

                <div className="timeline-item mb-5 position-relative ps-5">
                  <div
                    className="timeline-marker bg-success text-white rounded-circle position-absolute d-flex align-items-center justify-content-center"
                    style={{
                      left: "0",
                      top: "0",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <h4 className="text-success">2024</h4>
                  <h5>Expanded Our Team</h5>
                  <p>
                    As our readership grew, we brought on more experts to cover
                    a wider range of topics and provide more diverse
                    perspectives.
                  </p>
                </div>

                <div className="timeline-item position-relative ps-5">
                  <div
                    className="timeline-marker bg-danger text-white rounded-circle position-absolute d-flex align-items-center justify-content-center"
                    style={{
                      left: "0",
                      top: "0",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <i className="bi bi-brush-fill"></i>
                  </div>
                  <h4 className="text-danger">2025</h4>
                  <h5>Website Redesign</h5>
                  <p>
                    We refreshed our travel and lifestyle blog with a modern, user-friendly design that
                     enhances readability and makes exploring articles across destinations, wellness tips,
                      and cultural insights easier on any device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* FAQ Section */}
          <div
            className="card border-0 shadow-sm mb-4 fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <span className="bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle me-3" style={{ width: "48px", height: "48px" }}>
                  <i className="bi bi-people-fill fs-4"></i>
                </span>
                <h2 className="card-title h3 mb-0">FAQ</h2>
              </div>

              <div className="accordion" id="faqAccordion">
                <div className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button rounded"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                    >
                      How often do you publish new content?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      We aim to publish new articles at least twice a week,
                      covering various topics in Travel, Lifestyle, Food, Wellness, Travel Tips, Culture, and Adventure.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed rounded"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                    >
                      Can I contribute to the blog?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes! We welcome guest contributors. If you have expertise
                      in a relevant topic and would like to share your
                      knowledge, please reach out to us through our contact
                      page.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 shadow-sm">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed rounded"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                    >
                      Do you offer consultation services?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Some of our team members do offer consultation services
                      for specific projects. Feel free to contact us with your
                      requirements, and we'll connect you with the right expert.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Team Section */}
          <div
            className="card border-0 shadow-sm mb-4 fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-2">
                <span className="bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle me-3" style={{ width: "48px", height: "48px" }}>
                  <i className="bi bi-people-fill fs-4"></i>
                </span>
                <h2 className="card-title h3 mb-0">Our Team</h2>
              </div>

              <p className="card-text mb-4">
                Our team is made up of passionate travelers, storytellers, and lifestyle enthusiasts
                 committed to sharing inspiring journeys, practical tips, and authentic experiences with our readers.
              </p>

              {teamMembers.map((member) => (
                <div className="mb-2 border-bottom pt-2 pb-2" key={member.id}>
                  <div className="d-flex align-items-center">
                    <img
                      src={member.image}
                      className="rounded-circle me-3"
                      alt={member.name}
                      width="70"
                      height="70"
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <h5 className="mb-1">{member.name}</h5>
                      <p className="text-primary mb-0 fw-medium small">
                        {member.role}
                      </p>
                      <div className="d-flex gap-2">
                        <a href={member.social.twitter} className="text-muted">
                          <i className="bi bi-twitter"></i>
                        </a>
                        <a href={member.social.linkedin} className="text-muted">
                          <i className="bi bi-linkedin"></i>
                        </a>
                        <a href={member.social.instagram} className="text-muted">
                          <i className="bi bi-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 small">{member.bio}</p>
                </div>
              ))}

              <div className="text-center mt-4">
                <Link to="/contact" className="btn btn-outline-primary">
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>

          

          {/* Newsletter Signup */}
          <div
            className="card border-0 shadow-sm mb-4 bg-primary text-white fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="card-body p-4">
              <h3 className="card-title h4 mb-3">Stay Updated</h3>
              <p className="card-text">
                Subscribe to our newsletter to receive the latest articles,
                tutorials, and updates directly in your inbox.
              </p>
              <form className="mt-4">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    aria-label="Email address for newsletter"
                  />
                </div>
                <button type="submit" className="btn btn-light w-100">
                  Subscribe
                </button>
              </form>
              <p className="mt-3 mb-0 small">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div
        className="card border-0 shadow-sm mt-4 mb-4 fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="card-body p-5 text-center">
          <h3 className="card-title h2 mb-3">Get in Touch</h3>
          <p
            className="card-text mx-auto mb-4 text-body"
            style={{ maxWidth: "700px" }}
          >
            We love hearing from our readers! If you have any questions,
            suggestions, or would like to contribute to our blog, please don't
            hesitate to reach out.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg px-5 mt-2">
            Contact Us
          </Link>

          {/* Social Media */}
          <div className="mt-5">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center gap-4 mt-2">
              <a
                href="#"
                className="text-decoration-none bg-white rounded-circle shadow-sm hover-lift d-inline-flex align-items-center justify-content-center"
                style={{ width: "65px", height: "65px" }}                     
                aria-label="Twitter"
              >
                <i className="bi bi-twitter fs-4 text-primary"></i>
              </a>
              <a
                href="#"
                className="text-decoration-none bg-white rounded-circle shadow-sm hover-lift d-inline-flex align-items-center justify-content-center"
                style={{ width: "65px", height: "65px" }}                
                aria-label="Facebook"
              >
                <i className="bi bi-facebook fs-4 text-primary"></i>
              </a>
              <a
                href="#"
                className="text-decoration-none bg-white rounded-circle shadow-sm hover-lift d-inline-flex align-items-center justify-content-center"
                style={{ width: "65px", height: "65px" }}                     
                aria-label="Instagram"
              >
                <i className="bi bi-instagram fs-4 text-primary"></i>
              </a>
              <a
                href="#"
                className="text-decoration-none bg-white rounded-circle shadow-sm hover-lift d-inline-flex align-items-center justify-content-center"
                style={{ width: "65px", height: "65px" }}                     
                aria-label="LinkedIn"               
              >
                <i className="bi bi-linkedin fs-4 text-primary"></i>
              </a>
              <a
                href="#"
                className="text-decoration-none bg-white rounded-circle shadow-sm hover-lift d-inline-flex align-items-center justify-content-center"
                style={{ width: "65px", height: "65px" }}                     
                aria-label="GitHub"
              >
                <i className="bi bi-github fs-4 text-primary"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default About;
