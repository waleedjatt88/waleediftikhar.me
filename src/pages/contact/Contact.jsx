import React, { useEffect, useState } from "react";
import AOS from "aos";
import toast, { Toaster } from "react-hot-toast";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaHeading,
  FaCommentDots,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const cornerIcons = [
  { Icon: SiMongodb, color: "#47a248", position: "corner-tl" },
  { Icon: SiExpress, color: "#ffffff", position: "corner-tr" },
  { Icon: FaNodeJs, color: "#83cd29", position: "corner-bl" },
  { Icon: FaReact, color: "#61dafb", position: "corner-br" },
];

const KW = "#c586c0";
const PROP = "#9cdcfe";
const STR = "#ce9178";
const BOOL = "#569cd6";
const PLAIN = "#d4d4d4";

const codeLines = [
  { raw: "const developer = {", tokens: [{ t: "const", c: KW }, { t: " developer = {", c: PLAIN }] },
  { raw: "  name: 'Waleed Iftikhar',", tokens: [{ t: "  name", c: PROP }, { t: ": ", c: PLAIN }, { t: "'Waleed Iftikhar'", c: STR }, { t: ",", c: PLAIN }] },
  { raw: "  role: 'MERN Stack Developer',", tokens: [{ t: "  role", c: PROP }, { t: ": ", c: PLAIN }, { t: "'MERN Stack Developer'", c: STR }, { t: ",", c: PLAIN }] },
  { raw: "  location: 'Punjab, Pakistan',", tokens: [{ t: "  location", c: PROP }, { t: ": ", c: PLAIN }, { t: "'Punjab, Pakistan'", c: STR }, { t: ",", c: PLAIN }] },
  { raw: "  stack: ['React', 'Node.js', 'Express', 'MongoDB'],", tokens: [{ t: "  stack", c: PROP }, { t: ": [", c: PLAIN }, { t: "'React', ", c: STR }, { t: "'Node.js', ", c: STR }, { t: "'Express', ", c: STR }, { t: "'MongoDB'", c: STR }, { t: "],", c: PLAIN }] },
  { raw: "  available: true,", tokens: [{ t: "  available", c: PROP }, { t: ": ", c: PLAIN }, { t: "true", c: BOOL }, { t: ",", c: PLAIN }] },
  { raw: "};", tokens: [{ t: "};", c: PLAIN }] },
];

const useTypewriter = (script, { typingSpeed = 32, lineDelay = 320, loopDelay = 2600 } = {}) => {
  const [lineIdx, setLineIdx] = useState(0);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (lineIdx >= script.length) {
      const timer = setTimeout(() => {
        setCurrent("");
        setLineIdx(0);
      }, loopDelay);
      return () => clearTimeout(timer);
    }

    const target = script[lineIdx].raw;

    if (current.length < target.length) {
      const timer = setTimeout(() => {
        setCurrent(target.slice(0, current.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrent("");
      setLineIdx((i) => i + 1);
    }, lineDelay);
    return () => clearTimeout(timer);
  }, [current, lineIdx, script]);

  return { lineIdx, current };
};

const TerminalCard = () => {
  const { lineIdx, current } = useTypewriter(codeLines);

  return (
    <div className="terminal-window">
      {cornerIcons.map(({ Icon, color, position }) => (
        <span className={`corner-icon ${position}`} key={position} style={{ color }}>
          <Icon />
        </span>
      ))}

      <div className="terminal-header">
        <span className="terminal-dot dot-red"></span>
        <span className="terminal-dot dot-yellow"></span>
        <span className="terminal-dot dot-green"></span>
        <span className="terminal-title">developer.js</span>
      </div>

      <div className="code-body">
        <div className="code-block">
          {codeLines.map((line, i) => (
            <div className="code-line" key={i}>
              <span className="code-line-number">{i + 1}</span>
              <span className="code-line-content">
                {i < lineIdx &&
                  line.tokens.map((tok, j) => (
                    <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                  ))}
                {i === lineIdx && (
                  <>
                    <span style={{ color: "#f0ad4e" }}>{current}</span>
                    <span className="terminal-cursor">▌</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
          <a
            href="https://wa.me/923250063788"
            target="_blank"
            rel="noopener noreferrer"
            className="info-item"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            <div className="info-icon">
              <FaWhatsapp />
            </div>
            <h3 className="info-title">WHATSAPP</h3>
            <span className="info-value-link">0325-0063788</span>
          </a>
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
            <TerminalCard />
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
