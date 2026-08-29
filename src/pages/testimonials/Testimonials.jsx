import React, { useState, useEffect } from 'react';
import InteractiveGlobe from '../../components/globe/InteractiveGlobe';
import './Testimonials.css';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaGlobeAmericas, FaAward, FaCheckCircle } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    company: 'NexaTech Innovations',
    country: 'United States',
    flag: '🇺🇸',
    rating: 5,
    project: 'SaaS Platform & Dashboard',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    feedback:
      'Waleed delivered our full-stack MERN application with immaculate code structure and lightning-fast API performance. His communication, problem-solving, and attention to modern UI aesthetics are genuinely world-class.',
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: 2,
    name: 'David Sterling',
    role: 'CTO',
    company: 'CloudScale Solutions',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rating: 5,
    project: 'Enterprise Web Portal',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    feedback:
      'One of the most dependable full-stack developers we have worked with. He built complex React workflows and database architectures effortlessly. The project launched ahead of schedule with zero glitches.',
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Product Lead',
    company: 'SyncLab Digital',
    country: 'Germany',
    flag: '🇩🇪',
    rating: 5,
    project: 'E-Commerce & Management System',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    feedback:
      'From sleek responsive UI to high-scalability backend integration, Waleed brought our vision to reality. His speed, precision, and passion for excellence made him an indispensable partner.',
    lat: 52.5200,
    lng: 13.4050,
  },
  {
    id: 4,
    name: 'Tariq Al-Mansoor',
    role: 'Managing Director',
    company: 'Apex Ventures',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    rating: 5,
    project: 'Real-Time Analytics Dashboard',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    feedback:
      'Exceptional speed and attention to detail. Waleed transformed our web portal, optimizing load speeds by over 60% and providing clean, maintainable code. Highly recommended for any ambitious project.',
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: 5,
    name: 'Marcus Chen',
    role: 'Engineering Lead',
    company: 'DevPulse Media',
    country: 'Canada',
    flag: '🇨🇦',
    rating: 5,
    project: 'Full-Stack Web App',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    feedback:
      'Waleed has outstanding technical mastery in React, Node.js, and database systems. He anticipates requirements, provides proactive improvements, and delivers spotless code every single time.',
    lat: 43.6532,
    lng: -79.3832,
  },
];

const globeArcs = [
  // Primary Client to Pakistan Hub connections
  { startLat: 37.7749, startLng: -122.4194, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' }, // SF -> Pak
  { startLat: 40.7128, startLng: -74.0060, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' },  // NYC -> Pak
  { startLat: 51.5074, startLng: -0.1278, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' },   // London -> Pak
  { startLat: 52.5200, startLng: 13.4050, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' },   // Berlin -> Pak
  { startLat: 25.2048, startLng: 55.2708, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' },   // Dubai -> Pak
  { startLat: 43.6532, startLng: -79.3832, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' },  // Toronto -> Pak
  { startLat: -33.8688, startLng: 151.2093, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' }, // Sydney -> Pak
  { startLat: 1.3521, startLng: 103.8198, endLat: 31.5204, endLng: 74.3587, color: '#f0ad4e' },  // Singapore -> Pak

  // Global Trans-Atlantic & Cross-Continental Interlinks
  { startLat: 37.7749, startLng: -122.4194, endLat: 51.5074, endLng: -0.1278, color: '#ffa726' }, // SF -> London
  { startLat: 40.7128, startLng: -74.0060, endLat: 48.8566, endLng: 2.3522, color: '#f0ad4e' },   // NYC -> Paris
  { startLat: 51.5074, startLng: -0.1278, endLat: 25.2048, endLng: 55.2708, color: '#ffa726' },   // London -> Dubai
  { startLat: 25.2048, startLng: 55.2708, endLat: 1.3521, endLng: 103.8198, color: '#ffd54f' },   // Dubai -> Singapore
  { startLat: 35.6762, startLng: 139.6503, endLat: 37.7749, endLng: -122.4194, color: '#f0ad4e' },// Tokyo -> SF
  { startLat: 35.6762, startLng: 139.6503, endLat: -33.8688, endLng: 151.2093, color: '#ffa726' },// Tokyo -> Sydney
  { startLat: 43.6532, startLng: -79.3832, endLat: 51.5074, endLng: -0.1278, color: '#ffd54f' },  // Toronto -> London
  { startLat: 52.5200, startLng: 13.4050, endLat: 40.7128, endLng: -74.0060, color: '#f0ad4e' },   // Berlin -> NYC
  { startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, color: '#ffd54f' }, // Singapore -> Sydney
  { startLat: 48.8566, startLng: 2.3522, endLat: 25.2048, endLng: 55.2708, color: '#ffa726' },    // Paris -> Dubai
  { startLat: -23.5505, startLng: -46.6333, endLat: 40.4168, endLng: -3.7038, color: '#f0ad4e' }, // Sao Paulo -> Madrid
  { startLat: -23.5505, startLng: -46.6333, endLat: 40.7128, endLng: -74.0060, color: '#ffd54f' },// Sao Paulo -> NYC
  { startLat: 47.3769, startLng: 8.5417, endLat: 25.2048, endLng: 55.2708, color: '#ffa726' },    // Zurich -> Dubai
  { startLat: 34.0522, startLng: -118.2437, endLat: 35.6762, endLng: 139.6503, color: '#f0ad4e' },// LA -> Tokyo
  { startLat: 41.9028, startLng: 12.4964, endLat: 51.5074, endLng: -0.1278, color: '#ffd54f' },   // Rome -> London
  { startLat: 22.3193, startLng: 114.1694, endLat: 51.5074, endLng: -0.1278, color: '#f0ad4e' },  // Hong Kong -> London
  { startLat: 22.3193, startLng: 114.1694, endLat: 37.7749, endLng: -122.4194, color: '#ffa726' },// Hong Kong -> SF
  { startLat: 28.6139, startLng: 77.2090, endLat: 1.3521, endLng: 103.8198, color: '#f0ad4e' },   // Delhi -> Singapore
];

const globeMarkers = [
  ...testimonialsData.map((t) => ({
    lat: t.lat,
    lng: t.lng,
    label: t.country,
  })),
  { lat: 31.5204, lng: 74.3587, label: 'Pakistan (HQ)' },
  { lat: 40.7128, lng: -74.0060, label: 'New York, USA' },
  { lat: 48.8566, lng: 2.3522, label: 'Paris, France' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo, Japan' },
  { lat: 1.3521, lng: 103.8198, label: 'Singapore' },
  { lat: 22.3193, lng: 114.1694, label: 'Hong Kong' },
  { lat: -23.5505, lng: -46.6333, label: 'Sao Paulo, Brazil' },
  { lat: 47.3769, lng: 8.5417, label: 'Zurich, Switzerland' },
  { lat: 34.0522, lng: -118.2437, label: 'Los Angeles, USA' },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <span className="background-text-testimonials">REVIEWS</span>

        {/* Section Header */}
        <div className="section-header-testimonials" data-aos="fade-up">
          <div className="global-trust-badge">
            <FaGlobeAmericas className="badge-globe-icon" />
            <span>WORLDWIDE CLIENT TRUST</span>
          </div>
          <h2>
            <span id="testimonialspan">Client</span> Testimonials
          </h2>
          <p>
            "Delivering robust, scalable web solutions that empower clients and businesses globally."
          </p>
        </div>

        {/* Main 2-Column Grid: Left (Interactive Globe) & Right (Active Testimonial Glass Card) */}
        <div className="testimonials-interactive-grid">
          {/* Globe Column */}
          <div className="globe-column" data-aos="fade-right">
            <div className="globe-card-wrapper">
              <InteractiveGlobe
                testimonials={testimonialsData}
                currentIndex={currentIndex}
                onSelectTestimonial={setCurrentIndex}
                globeRadius={95}
                autoRotateSpeed={0.0075}
              />
              <div className="globe-hint">
                <FaGlobeAmericas /> Drag to explore worldwide client connections
              </div>
            </div>
          </div>

          {/* Testimonial Card Column */}
          <div className="testimonial-card-column" data-aos="fade-left">
            <div className="testimonial-glass-card">
              <div className="card-top-bar">
                <div className="quote-icon-box">
                  <FaQuoteLeft />
                </div>
                <div className="stars-row">
                  {[...Array(current.rating)].map((_, i) => (
                    <FaStar key={i} className="gold-star" />
                  ))}
                </div>
              </div>

              <p className="testimonial-text">"{current.feedback}"</p>

              <div className="client-info-row">
                <div className="client-avatar">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="client-avatar-img"
                    loading="lazy"
                  />
                </div>
                <div className="client-details">
                  <h4 className="client-name">
                    {current.name} <span className="country-flag">{current.flag}</span>
                  </h4>
                  <p className="client-role">
                    {current.role} &bull; <span className="client-company">{current.company}</span>
                  </p>
                  <p className="client-project">
                    <FaCheckCircle className="verified-icon" /> {current.project}
                  </p>
                </div>
              </div>

              {/* Navigation Controls & Pagination */}
              <div className="card-controls-footer">
                <div className="pagination-pills">
                  {testimonialsData.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-label={`Go to testimonial ${t.name}`}
                      className={`pill-dot ${idx === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>

                <div className="nav-arrows">
                  <button type="button" className="nav-arrow-btn" onClick={handlePrev} aria-label="Previous">
                    <FaChevronLeft />
                  </button>
                  <button type="button" className="nav-arrow-btn" onClick={handleNext} aria-label="Next">
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="testimonial-stats-row">
              <div className="t-stat-pill">
                <FaAward className="t-stat-icon" />
                <span>100% Job Success</span>
              </div>
              <div className="t-stat-pill">
                <FaGlobeAmericas className="t-stat-icon" />
                <span>Global Clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
