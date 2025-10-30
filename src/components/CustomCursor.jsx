
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(outlineRef.current, "x", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(outlineRef.current, "y", { duration: 0.4, ease: "power2.out" });
    const xTo2 = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power2.out" });
    const yTo2 = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power2.out" });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dotRef.current, outlineRef.current], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      xTo2(e.clientX);
      yTo2(e.clientY);
    };

    const hoverAnim = gsap.timeline({ paused: true });
    hoverAnim
      .to(outlineRef.current, {
        scale: 1, 
        backgroundColor: 'rgba(240, 173, 78, 0.2)', 
        duration: 0.4,
        ease: 'power2.out'
      })
      .to(dotRef.current, {
          scale: 0, 
          duration: 0.3
        }, 
      0); 

    const links = document.querySelectorAll('a, button, .info-icon, .send-message-btn');
    
    const onMouseEnterLink = () => hoverAnim.play();
    const onMouseLeaveLink = () => hoverAnim.reverse();

    window.addEventListener("mousemove", onMouseMove);
    links.forEach(link => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach(link => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };

  }, []);

  return (
    <>
      <div ref={outlineRef} className="cursor-outline"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
};

export default CustomCursor;