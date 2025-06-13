import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-md-5  mb-3 mb-md-0">
            <h5>Trail & Tale</h5>
            <p className="text-white-50 pe-5">
              A place for learning and sharing knowledge about Travel, Lifestyle, Food, Wellness, Travel Tips, Culture, and Adventure.
            </p>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-white-50">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-decoration-none text-white-50"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-decoration-none text-white-50"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-decoration-none text-white-50"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled text-white-50">
              <li>Email: info@example.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Los Angeles, US, 98765</li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="text-white-50 mb-0">
              © {new Date().getFullYear()} Trail & Tale. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
