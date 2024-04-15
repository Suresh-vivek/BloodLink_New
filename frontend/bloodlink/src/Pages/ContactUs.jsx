import "./ContactUs.css";

import Iframe from "react-iframe";
import letter from "../assets/letter.png";

const ContactUs = () => {
  //form submission

  return (
    <div className="contact-outer">
      <div className="contact-left"></div>
      <div className="contact-right"></div>

      <div className="contact-main">
        <div className="contact-main-left">
          <span className="contact-left-text">
            Get in <span id="color">Touch</span>
          </span>
          <span className="contact-left-undertext">
            Have questions or suggestions? Reach out to us! Your feedback helps
            BloodLink thrive and improve, ensuring better access to life-saving
            blood donations for everyone. Let's work together to make BloodLink
            even better!
          </span>

          <div>
            <form
              className="contact-form"
              action="https://formspree.io/f/meqbdgyg"
              method="POST"
            >
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  autoComplete="off"
                  name="name"
                  className="form-fields1"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  name="email"
                  className="form-fields1"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  autoComplete="off"
                  name="phone"
                  className="form-fields1"
                  required
                />
              </div>

              <div>
                <textarea
                  type="text"
                  placeholder="Your Message"
                  autoComplete="off"
                  name="message"
                  className="form-fields1"
                  id="text-message"
                  required
                />
              </div>

              <button type="submit" className="contact-submit-button">
                SEND
              </button>
            </form>
          </div>
          <div className="contact-letter">
            <img src={letter} />
          </div>
        </div>

        <div className="contact-main-right">
          <Iframe
            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.7146682506395!2d77.31331997624154!3d28.367474875810476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc71f6e9f557%3A0xeb301eec9ff18517!2sJ.C.%20Bose%20University%20of%20Science%20and%20Technology%2C%20YMCA%20(Formerly%20YMCA%20UST)!5e0!3m2!1sen!2sin!4v1699037559319!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
