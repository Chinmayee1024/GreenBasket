import { assets, footerLinks } from "../assets/assets";
import "../css/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-about">
          <img className="footer-logo" src={assets.logo} alt="logo" />
          <p className="footer-description">
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable.
          </p>
        </div>
        <div className="footer-links">
          {footerLinks.map((section, index) => (
            <div className="footer-link-group" key={index}>
              <h3 className="footer-link-title">{section.title}</h3>
              <ul className="footer-link-list">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="footer-link">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} Green Basket. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
