import React, { useEffect } from 'react';
import AOS from 'aos';
import './Contact.css'; 
import profileImage from '../../assets/image4.png';
import { FaMapMarkerAlt, FaPhone, FaPaperPlane, FaGlobe } from 'react-icons/fa';

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = e.target[0].value;
    const email = e.target[1].value;
    const subject = e.target[2].value;
    const message = e.target[3].value;

    try {
      const res = await fetch("https://portfolioapi.vercel.app/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Message sent successfully!");
        e.target.reset();
      } else {
        alert(`❌ Error: ${data.message || "Failed to send message"}`);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong. Try again later.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <span className="background-text-contact">Contact</span>
        
        <div className="section-header-contact" data-aos="fade-up">
          <h2><span id='contactspan'>Contact</span> Me</h2>
          <p>"Have a project or idea in mind? Feel free to contact me—let’s build something amazing together"</p>
        </div>

        <div className="contact-info-grid" data-aos="fade-up">
          <div className="info-item">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <h3 className="info-title">ADDRESS</h3>
            <p>Punjab, Pakistan</p>
          </div>
          <div className="info-item">
            <div className="info-icon"><FaPhone /></div>
            <h3 className="info-title">CONTACT NUMBER</h3>
            <p>0303-0834088</p>
          </div>
          <div className="info-item">
            <div className="info-icon"><FaPaperPlane /></div>
            <h3 className="info-title">EMAIL ADDRESS</h3>
            <p>waleediftikhar188@gmail.com</p>
          </div>
          <div className="info-item">
            <div className="info-icon"><FaGlobe /></div>
            <h3 className="info-title">WEBSITE</h3>
            <p>yoursite.com</p>
          </div>
        </div>

        <div className="contact-form-area">
          <div className="contact-image">
            <img src={profileImage} alt="image" loading="lazy" />
          </div>

          <form className="form-container" data-aos="fade-left" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message" rows="6" required></textarea>
            <button type="submit" className="send-message-btn">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
