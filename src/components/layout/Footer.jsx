import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">ShopHub</h5>
            <p className="text-muted">
              Your premium destination for quality products. We bring you the best in electronics, fashion, home & living, and more.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-muted fs-5"><FiFacebook /></a>
              <a href="#" className="text-muted fs-5"><FiTwitter /></a>
              <a href="#" className="text-muted fs-5"><FiInstagram /></a>
              <a href="#" className="text-muted fs-5"><FiLinkedin /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/shop" className="footer-link">Shop</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Customer Service</h5>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/shipping" className="footer-link">Shipping Info</Link>
            <Link to="/returns" className="footer-link">Returns</Link>
            <Link to="/support" className="footer-link">Support</Link>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Legal</h5>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/cookies" className="footer-link">Cookie Policy</Link>
            <Link to="/accessibility" className="footer-link">Accessibility</Link>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FiMail />
              <span className="text-muted">support@shophub.com</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FiPhone />
              <span className="text-muted">+1 (555) 123-4567</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FiMapPin />
              <span className="text-muted">123 Commerce St, NY 10001</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="mb-0">
            © 2024 ShopHub. All rights reserved. Built with ❤️ for modern commerce.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
