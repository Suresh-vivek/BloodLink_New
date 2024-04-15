import "./Donate.css";

import logo from "../assets/logo.png";
import qr from "../assets/qrc.png";
const Donation = () => {
  return (
    <div>
      <div className="donate-bg"></div>
      <div className="donate-inner">
        <div className="donate-left-image">
          <div className="donate-image-blur">
            <img src={logo} alt="Logo" />
            <span className="donate-text">We Can Save The Lives</span>
          </div>
        </div>

        <div className="donate-right">
          <span className="donate-quote">
            "Join us in making a difference by supporting our mission to
            streamline the blood donation process and save lives. Together, we
            can make a meaningful impact on public health and well-being."
          </span>
          <img src={qr} alt="qr" className="donate-quote-img" />
          <span className="donate-right-text"> Scan the QR Code</span>
          <span className="donate-right-text1"> To Help Us!</span>
        </div>
      </div>
    </div>
  );
};

export default Donation;
