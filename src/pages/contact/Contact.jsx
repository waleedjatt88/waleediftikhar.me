import React, { useEffect, useState } from "react";
import AOS from "aos";
import toast, { Toaster } from "react-hot-toast";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaReact,
  FaNodeJs,
  FaUser,
  FaEnvelope,
  FaHeading,
  FaCommentDots,
} from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const orbitIcons = [
  { Icon: FaReact, className: "icon-react", ring: "ring-1" },
  { Icon: FaNodeJs, className: "icon-node", ring: "ring-2" },
  { Icon: SiExpress, className: "icon-express", ring: "ring-3" },
  { Icon: SiMongodb, className: "icon-mongo", ring: "ring-4" },
];

const OrbitDiagram = () => (
  <div className="orbit-window">
    <div className="arch-window-header">
      <span className="arch-status-dot"></span>
      <span className="arch-window-title">Tech Stack</span>
    </div>

    <div className="orbit-stage">
      {[...Array(6)].map((_, i) => (
        <span key={i} className={`spark spark-${i + 1}`}></span>
      ))}

      <div className="orbit-hub">{"</>"}</div>

      {orbitIcons.map(({ Icon, className, ring }) => (
        <div className={`orbit-ring ${ring}`} key={ring}>
          <span className={`orbit-icon ${className}`}>
            <Icon />
          </span>
        </div>
      ))}
    </div>

    <p className="orbit-caption">Powered by the MERN stack</p>
  </div>
);

const Contact = () => {
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);

    const formData = {
      name: e.target.elements[0].value,
      email: e.target.elements[1].value,
      subject: e.target.elements[2].value,
      message: e.target.elements[3].value,
    };

    const promise = fetch(
      "https://portfolio-api-three-gamma.vercel.app/api/send-message",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    ).then((res) => {
      if (!res.ok) {
        return res.json().then((data) => Promise.reject(data));
      }
      return res.json();
    });
    toast.promise(promise, {
      loading: "Sending message...",
      success: (data) => {
        e.target.reset();
        setIsSending(false);
        return " Message sent successfully!";
      },
      error: (err) => {
        setIsSending(false);
        return ` Error: ${err.message || "Something went wrong!"}`;
      },
    });
  };

  return (
    <section id="contact" className="contact-section">
<Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: 'my-toast-animation',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />      <div className="container">
        <span className="background-text-contact">Contact</span>

        <div className="section-header-contact" data-aos="fade-up">
          <h2>
            <span id="contactspan">Contact</span> Me
          </h2>
          <p>
            "Have a project or idea in mind? Feel free to contact me—let’s build
            something amazing together"
          </p>
        </div>

        <div className="contact-info-grid">
          <div className="info-item" data-aos="fade-up" data-aos-delay="0">
            <div className="info-icon">
              <FaMapMarkerAlt />
            </div>
            <h3 className="info-title">ADDRESS</h3>
            <p>Punjab, Pakistan</p>
          </div>
          <div className="info-item" data-aos="fade-up" data-aos-delay="120">
            <div className="info-icon">
              <FaPhone />
            </div>
            <h3 className="info-title">CONTACT NUMBER</h3>
            <a href="tel:+923030834088" className="info-value-link">0303-0834088</a>
          </div>
          <div className="info-item" data-aos="fade-up" data-aos-delay="240">
            <div className="info-icon">
              <FaPaperPlane />
            </div>
            <h3 className="info-title">EMAIL ADDRESS</h3>
            <a href="mailto:waleediftikhar188@gmail.com" className="info-value-link">waleediftikhar188@gmail.com</a>
          </div>
        </div>

        <h3 className="lets-connect-heading" data-aos="fade-up">
          Let's <span>Connect</span>
        </h3>

        <div className="contact-form-area">
          <div className="contact-visual" data-aos="fade-right">
            <OrbitDiagram />
          </div>

          <form
            className="form-container"
            data-aos="fade-left"
            onSubmit={handleSubmit}
          >
            <h3 className="form-heading">Send a Message</h3>

            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="input-group">
              <FaHeading className="input-icon" />
              <input type="text" placeholder="Subject" />
            </div>
            <div className="input-group">
              <FaCommentDots className="input-icon input-icon-textarea" />
              <textarea placeholder="Message" rows="6" required></textarea>
            </div>

            <button
              type="submit"
              className="send-message-btn"
              disabled={isSending}
            >
              <FaPaperPlane /> {isSending ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
