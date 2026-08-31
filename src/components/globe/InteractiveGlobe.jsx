import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FaStar } from 'react-icons/fa';

// Convert Lat/Lng to 3D Spherical Coordinates
const latLongToVector3 = (lat, lng, radius, altitude = 0) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + altitude;
  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// Accurate Worldwide Continent & Island Landmass Detection
const isCoordinateLandmass = (lat, lng) => {
  // North America & Canada & Alaska
  if (lat >= 50 && lat <= 72 && lng >= -168 && lng <= -52) return true;
  if (lat >= 25 && lat <= 50 && lng >= -125 && lng <= -65) return true;
  if (lat >= 8 && lat <= 25 && lng >= -118 && lng <= -75) return true; // Mexico & Central America
  if (lat >= 12 && lat <= 28 && lng >= -85 && lng <= -59) return true;  // Caribbean
  if (lat >= 60 && lat <= 83 && lng >= -73 && lng <= -15) return true;  // Greenland

  // South America
  if (lat >= -15 && lat <= 12 && lng >= -82 && lng <= -34) return true; // Northern South America / Brazil
  if (lat >= -56 && lat < -15 && lng >= -76 && lng <= -45) return true; // Southern South America

  // Europe & Mediterranean
  if (lat >= 50 && lat <= 60 && lng >= -11 && lng <= 2) return true;   // UK & Ireland
  if (lat >= 35 && lat <= 60 && lng >= -10 && lng <= 28) return true;  // Western & Central Europe
  if (lat >= 56 && lat <= 71 && lng >= 5 && lng <= 32) return true;    // Scandinavia
  if (lat >= 42 && lat <= 68 && lng >= 24 && lng <= 50) return true;   // Eastern Europe

  // Africa
  if (lat >= 16 && lat <= 38 && lng >= -17 && lng <= 38) return true;  // North Africa
  if (lat >= 0 && lat < 16 && lng >= -18 && lng <= 45) return true;    // Central Africa
  if (lat >= -35 && lat < 0 && lng >= 10 && lng <= 42) return true;    // Southern Africa
  if (lat >= -26 && lat <= -12 && lng >= 43 && lng <= 51) return true; // Madagascar

  // Middle East & West Asia
  if (lat >= 12 && lat <= 42 && lng >= 34 && lng <= 62) return true;

  // South Asia (Pakistan, India, Bangladesh, Sri Lanka)
  if (lat >= 6 && lat <= 37 && lng >= 60 && lng <= 92) return true;

  // East Asia & Russia
  if (lat >= 50 && lat <= 76 && lng >= 35 && lng <= 180) return true;  // Russia / Siberia
  if (lat >= 20 && lat <= 50 && lng >= 75 && lng <= 135) return true;  // China & Mongolia
  if (lat >= 33 && lat <= 43 && lng >= 124 && lng <= 131) return true; // Korea
  if (lat >= 30 && lat <= 46 && lng >= 128 && lng <= 146) return true; // Japan

  // Southeast Asia & Pacific Islands
  if (lat >= -11 && lat <= 22 && lng >= 95 && lng <= 142) return true;

  // Australia & New Zealand
  if (lat >= -39 && lat <= -11 && lng >= 113 && lng <= 154) return true; // Australia
  if (lat >= -47 && lat <= -34 && lng >= 166 && lng <= 179) return true; // New Zealand

  return false;
};

// Generates high-density, ultra-shiny Fibonacci spiral dots around the globe
const generateUniformGlobePoints = (count = 3400, radius = 95) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  // High-Vibrancy Shiny Color Palette
  const goldPrimary = new THREE.Color(0xf0ad4e);   // Bright Amber Gold
  const goldSparkle = new THREE.Color(0xffd54f);   // Radiant Solar Gold
  const diamondWhite = new THREE.Color(0xffffff);  // Brilliant Diamond Sparkle
  const platinumGlow = new THREE.Color(0xffe082);  // Platinum Highlight
  const oceanAmbient = new THREE.Color(0x8a6229);  // Luminous Ambient Matrix Dot

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;

    const lat = Math.asin(y) * (180 / Math.PI);
    const lng = Math.atan2(z, -x) * (180 / Math.PI);

    const isLand = isCoordinateLandmass(lat, lng);
    let col = oceanAmbient;

    if (isLand) {
      const rand = Math.random();
      if (rand > 0.82) {
        col = diamondWhite; // 18% diamond sparkle stars
      } else if (rand > 0.5) {
        col = goldSparkle;  // 32% solar gold
      } else if (rand > 0.25) {
        col = platinumGlow; // 25% platinum glow
      } else {
        col = goldPrimary;  // 25% rich amber
      }
    }

    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  return { positions, colors };
};

// Create a high-res glowing radial star texture for crisp, shiny particles
const createShinyStarTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');     // Ultra-bright core
  gradient.addColorStop(0.2, 'rgba(255, 235, 160, 0.95)');    // Shiny golden inner ring
  gradient.addColorStop(0.5, 'rgba(240, 173, 78, 0.6)');      // Rich amber halo
  gradient.addColorStop(0.8, 'rgba(255, 179, 0, 0.2)');       // Ambient corona
  gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');           // Smooth transparent falloff

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
};

// Clean, elegant intercontinental flight arcs
const defaultCleanArcs = [
  { startLat: 37.77, startLng: -122.42, endLat: 51.51, endLng: -0.13, color: '#ffd54f' },  // SF -> London
  { startLat: 51.51, startLng: -0.13, endLat: 25.20, endLng: 55.27, color: '#f0ad4e' },    // London -> Dubai
  { startLat: 25.20, startLng: 55.27, endLat: 31.52, endLng: 74.36, color: '#ffd54f' },    // Dubai -> Pakistan
  { startLat: 40.71, startLng: -74.01, endLat: 52.52, endLng: 13.41, color: '#ffa726' },   // NYC -> Berlin
  { startLat: 43.65, startLng: -79.38, endLat: 51.51, endLng: -0.13, color: '#ffd54f' },   // Toronto -> London
  { startLat: 35.68, startLng: 139.65, endLat: 37.77, endLng: -122.42, color: '#f0ad4e' }, // Tokyo -> SF
  { startLat: 1.35, startLng: 103.82, endLat: -33.87, endLng: 151.21, color: '#ffa726' },  // Singapore -> Sydney
  { startLat: -23.55, startLng: -46.63, endLat: 40.71, endLng: -74.01, color: '#ffd54f' }, // Sao Paulo -> NYC
  { startLat: 37.77, startLng: -122.42, endLat: 31.52, endLng: 74.36, color: '#f0ad4e' },  // SF -> Pakistan
  { startLat: 52.52, startLng: 13.41, endLat: 31.52, endLng: 74.36, color: '#ffd54f' },    // Berlin -> Pakistan
];

export const InteractiveGlobe = ({
  testimonials = [],
  currentIndex = 0,
  onSelectTestimonial = () => {},
  globeRadius = 95,
  autoRotateSpeed = 0.006,
}) => {
  const containerRef = useRef(null);
  const [pinPositions, setPinPositions] = useState([]);
  const [hoveredPinId, setHoveredPinId] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = Math.floor(container.clientWidth) || 320;
    let height = Math.floor(container.clientHeight) || 320;

    // 1. Three.js Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    
    // Proportional camera distance based on viewport so globe never distorts
    const updateCameraDistance = (w, h) => {
      const minDim = Math.min(w, h);
      camera.position.z = Math.max(260, 275 * (360 / Math.max(minDim, 220)));
    };
    updateCameraDistance(width, height);

    // 2. High-Performance Antialiased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, true);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.margin = '0 auto';
    container.appendChild(renderer.domElement);

    // 3. Master Globe Group
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.12;
    scene.add(globeGroup);

    // 4. Luminous Dark Obsidian Core Sphere
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius - 1.2, 48, 48);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x04060e,
      transparent: true,
      opacity: 0.88,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerSphere);

    // 5. Radiant Golden Atmosphere Corona Glow
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.15, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.96, 0.72, 0.32, 1.0) * intensity * 0.55;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphere);

    // 6. Holographic Equator & Tech Orbital Rings
    const ringGeo = new THREE.RingGeometry(globeRadius * 1.03, globeRadius * 1.035, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf0ad4e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const equatorRing = new THREE.Mesh(ringGeo, ringMat);
    equatorRing.rotation.x = Math.PI / 2;
    globeGroup.add(equatorRing);

    // 7. Ultra-Dense Shiny Continent Dot-Matrix (3,400 particles)
    const { positions, colors } = generateUniformGlobePoints(3400, globeRadius);
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starTexture = createShinyStarTexture();

    const pointsMat = new THREE.PointsMaterial({
      size: 3.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(pointsMesh);

    // 8. Space Background Sparkling Twinkle Stars (220 stars)
    const starCount = 220;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 135 + Math.random() * 120;
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const isGold = Math.random() > 0.4;
      const c = isGold ? new THREE.Color(0xffd54f) : new THREE.Color(0xffffff);
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);

    // 9. Golden Flight Arcs with Glowing Comets
    const arcTracers = [];
    defaultCleanArcs.forEach((arc) => {
      const vStart = latLongToVector3(arc.startLat, arc.startLng, globeRadius);
      const vEnd = latLongToVector3(arc.endLat, arc.endLng, globeRadius);

      const distance = vStart.distanceTo(vEnd);
      const altitude = Math.min(distance * 0.25, 26);
      const vMid = vStart.clone().lerp(vEnd, 0.5).normalize().multiplyScalar(globeRadius + altitude);

      const curve = new THREE.QuadraticBezierCurve3(vStart, vMid, vEnd);
      const curvePoints = curve.getPoints(45);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const curveMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(arc.color || '#ffd54f'),
        transparent: true,
        opacity: 0.5,
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcLine);

      // Bright Comet Head
      const tracerGeo = new THREE.SphereGeometry(1.8, 12, 12);
      const tracerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1.0,
      });
      const tracer = new THREE.Mesh(tracerGeo, tracerMat);
      globeGroup.add(tracer);

      arcTracers.push({
        mesh: tracer,
        curve,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
      });
    });

    // 10. Client City Hub Markers on Globe
    const clientPins3D = testimonials.map((t) => {
      const pos = latLongToVector3(t.lat, t.lng, globeRadius + 0.6);

      const dotGeo = new THREE.SphereGeometry(2.2, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffd54f });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      const ringGeo = new THREE.RingGeometry(2.5, 4.2, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf0ad4e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);

      return {
        data: t,
        mesh: dot,
        ring,
      };
    });

    // 11. Mouse & Touch Drag Orbit Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.12;
    let targetRotationY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = autoRotateSpeed;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocityY = deltaX * 0.005;
      rotationVelocityX = deltaY * 0.005;

      targetRotationY += rotationVelocityY;
      targetRotationX += rotationVelocityX;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      rotationVelocityY = deltaX * 0.005;
      rotationVelocityX = deltaY * 0.005;

      targetRotationY += rotationVelocityY;
      targetRotationX += rotationVelocityX;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 12. Fluid Responsive Resize Handler via ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newWidth = Math.floor(rect.width);
      const newHeight = Math.floor(rect.height);
      if (newWidth > 0 && newHeight > 0) {
        width = newWidth;
        height = newHeight;
        camera.aspect = width / height;
        updateCameraDistance(width, height);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, true);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // 13. High-Frame-Rate Animation Loop
    let reqId;
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    const camPos = new THREE.Vector3();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth auto rotation
      if (!isDragging) {
        targetRotationY += autoRotateSpeed;
      }
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;
      globeGroup.rotation.x = Math.max(-0.5, Math.min(0.5, globeGroup.rotation.x));

      // Twinkling background star rotation
      starMesh.rotation.y = elapsedTime * 0.015;

      // Update arc comets
      arcTracers.forEach((tracer) => {
        tracer.progress = (tracer.progress + tracer.speed) % 1;
        const pt = tracer.curve.getPointAt(tracer.progress);
        tracer.mesh.position.copy(pt);
      });

      // Update pulsating marker rings & calculate 2D pin positions
      camera.getWorldPosition(camPos);
      const newPinPositions = [];

      clientPins3D.forEach((p, idx) => {
        const scale = 1 + Math.sin(elapsedTime * 3.5 + idx) * 0.35;
        p.ring.scale.set(scale, scale, scale);
        p.ring.material.opacity = Math.max(0, 0.9 - (scale - 1) * 1.1);

        p.mesh.getWorldPosition(tempVec);
        const normal = tempVec.clone().normalize();
        const camDir = camPos.clone().sub(tempVec).normalize();
        const dot = normal.dot(camDir);

        const isVisible = dot > 0.18;
        tempVec.project(camera);

        const screenX = (tempVec.x * 0.5 + 0.5) * width;
        const screenY = (-(tempVec.y * 0.5) + 0.5) * height;

        newPinPositions.push({
          id: p.data.id,
          index: idx,
          client: p.data,
          x: screenX,
          y: screenY,
          visible: isVisible,
        });
      });

      setPinPositions(newPinPositions);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      starTexture.dispose();
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, [globeRadius, autoRotateSpeed, testimonials]);

  return (
    <div
      ref={containerRef}
      className="globe-canvas-container"
      style={{ width: '100%', height: '100%', position: 'relative', cursor: 'grab' }}
    >
      {/* Floating 2D Review Badges Projected Directly on the Globe's 3D City Dots */}
      <div className="globe-overlay-pins-wrapper">
        {pinPositions.map((pin) => {
          if (!pin.visible) return null;
          const isCurrent = pin.index === currentIndex;
          const isHovered = pin.id === hoveredPinId;
          const isExpanded = isHovered;
          const isNearTop = pin.y < 140;

          return (
            <div
              key={pin.id}
              className={`globe-floating-pin ${isExpanded ? 'expanded' : ''} ${isCurrent ? 'current-active' : ''}`}
              style={{
                left: `${pin.x}px`,
                top: `${pin.y}px`,
              }}
              onMouseEnter={() => setHoveredPinId(pin.id)}
              onMouseLeave={() => setHoveredPinId(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectTestimonial(pin.index);
              }}
            >
              {/* Pulsing Pin Anchor Dot */}
              <div className="pin-anchor-dot">
                <span className="pin-pulse-wave"></span>
                <img src={pin.client.image} alt={pin.client.name} className="pin-mini-avatar" />
              </div>

              {/* Floating Glassmorphic Review Card - ONLY SHOWN ON HOVER */}
              {isExpanded && (
                <div className={`pin-floating-card ${isNearTop ? 'position-below' : ''}`}>
                  <div className="pin-card-header">
                    <span className="pin-flag">{pin.client.flag}</span>
                    <strong className="pin-name">{pin.client.name}</strong>
                    <div className="pin-stars">
                      {[...Array(pin.client.rating)].map((_, i) => (
                        <FaStar key={i} className="pin-star-icon" />
                      ))}
                    </div>
                  </div>
                  <p className="pin-snippet">"{pin.client.feedback.slice(0, 75)}..."</p>
                  <span className="pin-company-tag">{pin.client.company}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveGlobe;
