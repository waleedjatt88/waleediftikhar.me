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

// Check if a coordinate is over landmass
const isCoordinateLandmass = (lat, lng) => {
  // North America
  if (lat >= 15 && lat <= 70 && lng >= -165 && lng <= -55) return true;
  // South America
  if (lat >= -55 && lat <= 12 && lng >= -85 && lng <= -35) return true;
  // Europe
  if (lat >= 35 && lat <= 72 && lng >= -12 && lng <= 45) return true;
  // Africa
  if (lat >= -35 && lat <= 37 && lng >= -18 && lng <= 52) return true;
  // Asia & Russia
  if (lat >= 5 && lat <= 72 && lng >= 45 && lng <= 145) return true;
  // Australia & NZ
  if (lat >= -45 && lat <= -10 && lng >= 112 && lng <= 178) return true;
  // Middle East & South Asia
  if (lat >= 10 && lat <= 38 && lng >= 35 && lng <= 95) return true;
  // Japan & East Asia Islands
  if (lat >= 20 && lat <= 50 && lng >= 120 && lng <= 150) return true;
  return false;
};

// Generates uniform Fibonacci spiral dots around the globe (100% balanced, zero voids/clumps)
const generateUniformGlobePoints = (count = 1600, radius = 95) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  const landColor = new THREE.Color(0xf0ad4e);     // Bright Theme Amber
  const landHighlight = new THREE.Color(0xffd54f); // Golden Highlight
  const oceanColor = new THREE.Color(0x282014);    // Subtle Ambient Dot

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
    let col = oceanColor;

    if (isLand) {
      col = Math.random() > 0.4 ? landColor : landHighlight;
    }

    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  return { positions, colors };
};

// Clean, elegant intercontinental arcs
const defaultCleanArcs = [
  { startLat: 37.77, startLng: -122.42, endLat: 51.51, endLng: -0.13, color: '#f0ad4e' },  // SF -> London
  { startLat: 51.51, startLng: -0.13, endLat: 25.20, endLng: 55.27, color: '#f0ad4e' },    // London -> Dubai
  { startLat: 25.20, startLng: 55.27, endLat: 31.52, endLng: 74.36, color: '#f0ad4e' },    // Dubai -> Pakistan
  { startLat: 40.71, startLng: -74.01, endLat: 52.52, endLng: 13.41, color: '#ffa726' },   // NYC -> Berlin
  { startLat: 43.65, startLng: -79.38, endLat: 51.51, endLng: -0.13, color: '#ffd54f' },   // Toronto -> London
  { startLat: 35.68, startLng: 139.65, endLat: 37.77, endLng: -122.42, color: '#f0ad4e' }, // Tokyo -> SF
  { startLat: 1.35, startLng: 103.82, endLat: -33.87, endLng: 151.21, color: '#ffa726' },  // Singapore -> Sydney
  { startLat: -23.55, startLng: -46.63, endLat: 40.71, endLng: -74.01, color: '#f0ad4e' }, // Sao Paulo -> NYC
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

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // 1. Three.js Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.z = 280;

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Globe Master Group
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.1;
    scene.add(globeGroup);

    // 4. Dark Inner Sphere
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius - 1.2, 48, 48);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x05070f,
      transparent: true,
      opacity: 0.95,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerSphere);

    // 5. Golden Atmosphere Outer Glow
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.14, 48, 48);
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
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.94, 0.68, 0.31, 1.0) * intensity * 0.48;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphere);

    // 6. Uniform Dotted Fibonacci Matrix Surface
    const { positions, colors } = generateUniformGlobePoints(1800, globeRadius);
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create soft circular dot texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const dotTexture = new THREE.CanvasTexture(canvas);

    const pointsMat = new THREE.PointsMaterial({
      size: 2.4,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(pointsMesh);

    // 7. Space Background Subtle Stars
    const starCount = 180;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 130 + Math.random() * 110;
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const isGold = Math.random() > 0.5;
      const c = isGold ? new THREE.Color(0xf0ad4e) : new THREE.Color(0xffffff);
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.4,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);

    // 8. Clean Interconnecting Golden Arcs with Moving Light Packets
    const arcTracers = [];
    defaultCleanArcs.forEach((arc) => {
      const vStart = latLongToVector3(arc.startLat, arc.startLng, globeRadius);
      const vEnd = latLongToVector3(arc.endLat, arc.endLng, globeRadius);

      const distance = vStart.distanceTo(vEnd);
      const altitude = Math.min(distance * 0.24, 24);
      const vMid = vStart.clone().lerp(vEnd, 0.5).normalize().multiplyScalar(globeRadius + altitude);

      const curve = new THREE.QuadraticBezierCurve3(vStart, vMid, vEnd);
      const curvePoints = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const curveMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(arc.color || '#f0ad4e'),
        transparent: true,
        opacity: 0.45,
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcLine);

      const tracerGeo = new THREE.SphereGeometry(1.5, 8, 8);
      const tracerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
      });
      const tracer = new THREE.Mesh(tracerGeo, tracerMat);
      globeGroup.add(tracer);

      arcTracers.push({
        mesh: tracer,
        curve,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.003,
      });
    });

    // 9. Client City Hub Markers on the Globe
    const clientPins3D = testimonials.map((t) => {
      const pos = latLongToVector3(t.lat, t.lng, globeRadius + 0.6);

      const dotGeo = new THREE.SphereGeometry(2.0, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xf0ad4e });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      const ringGeo = new THREE.RingGeometry(2.4, 3.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf0ad4e,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
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

    // 10. Mouse Drag Orbit Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.1;
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

    // 11. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 12. Silky Smooth 60fps Animation Loop
    let reqId;
    let clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    const camPos = new THREE.Vector3();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid auto rotation
      if (!isDragging) {
        targetRotationY += autoRotateSpeed;
      }
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.08;
      globeGroup.rotation.x = Math.max(-0.45, Math.min(0.45, globeGroup.rotation.x));

      // Subtle starfield ambient movement
      starMesh.rotation.y = elapsedTime * 0.015;

      // Update arc tracers
      arcTracers.forEach((tracer) => {
        tracer.progress = (tracer.progress + tracer.speed) % 1;
        const pt = tracer.curve.getPointAt(tracer.progress);
        tracer.mesh.position.copy(pt);
      });

      // Update pulsating marker rings & project 2D coordinates for interactive pin cards
      camera.getWorldPosition(camPos);
      const newPinPositions = [];

      clientPins3D.forEach((p, idx) => {
        const scale = 1 + Math.sin(elapsedTime * 3 + idx) * 0.3;
        p.ring.scale.set(scale, scale, scale);
        p.ring.material.opacity = 0.8 - (scale - 1) * 0.9;

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
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      dotTexture.dispose();
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
          // ONLY show review card on hover
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
