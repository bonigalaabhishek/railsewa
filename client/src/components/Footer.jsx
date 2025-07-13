import React from 'react';
import { Train, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-section">
            <div className="footer-logo">
              <Train className="footer-logo-icon" />
              <span className="footer-logo-text">IRCTC</span>
            </div>
            <p className="footer-description">
              Indian Railway Catering and Tourism Corporation Limited - Your trusted partner for railway reservations and travel services across India.
            </p>
            <div className="footer-contact">
              <Phone className="footer-contact-icon" />
              <span>139 (Railway Enquiry)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#" className="footer-link">Train Schedule</a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">Seat Availability</a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">Fare Enquiry</a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">Retiring Room</a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">Indian Railways</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <MapPin className="footer-contact-item-icon" />
                <span className="footer-contact-item-text">
                  IRCTC Corporate Office<br />
                  11th Floor, Statesman House<br />
                  New Delhi - 110001
                </span>
              </div>
              <div className="footer-contact-item">
                <Mail className="footer-contact-item-icon" />
                <span className="footer-contact-item-text">care@irctc.co.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Indian Railway Catering and Tourism Corporation Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;