import "./Footer.css";
import linkedin from "../assets/mingcute_linkedin-line.png";
import instagram from "../assets/simple-icons_instagram.png";
import gmail from "../assets/mdi_gmail.png";
import twitter from "../assets/teenyicons_twitter-solid.png";
import facebook from "../assets/entypo-social_facebook.png";

const Footer = () => {
  return (
    <div className="footer">
      <img src={linkedin} className="footer-image" />
      <img src={instagram} className="footer-image" />
      <img src={gmail} className="footer-image" />
      <img src={twitter} className="footer-image" />
      <img src={facebook} className="footer-image" />
    </div>
  );
};

export default Footer;
