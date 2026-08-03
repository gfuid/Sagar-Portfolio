import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import moonTextureUrl from '../assets/moon_texture.jpg';

export const Moon3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── Starfield ──────────────────────────────────────────────────────────
    const starsGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(350 * 3);
    for (let i = 0; i < 350 * 3; i += 3) {
      starPos[i]     = (Math.random() - 0.5) * 18;
      starPos[i + 1] = (Math.random() - 0.5) * 18;
      starPos[i + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.013, transparent: true, opacity: 0.5 })));

    // ── Real NASA Lunar Texture (bundled locally) ──────────────────────────
    const loader = new THREE.TextureLoader();
    const moonMap = loader.load(moonTextureUrl);
    moonMap.colorSpace = THREE.SRGBColorSpace;
    moonMap.wrapS = THREE.RepeatWrapping;
    moonMap.wrapT = THREE.ClampToEdgeWrapping;

    // ── Moon sphere mesh ───────────────────────────────────────────────────
    const moonGeo = new THREE.SphereGeometry(1.2, 128, 128);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonMap,
      bumpMap: moonMap,
      bumpScale: 0.022,
      roughness: 0.96,
      metalness: 0.0,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moonMesh);

    // ── Subtle atmospheric rim (white, barely visible) ─────────────────────
    const rimMat = new THREE.ShaderMaterial({
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
          float rim = pow(0.70 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
          gl_FragColor = vec4(0.95, 0.95, 1.0, rim * 0.14);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.23, 64, 64), rimMat));

    // ── Orbit rings ────────────────────────────────────────────────────────
    const makeRing = (r: number, rotX: number, rotY: number, color: number, dashed: boolean) => {
      const pts = new THREE.EllipseCurve(0, 0, r, r, 0, Math.PI * 2, false, 0).getPoints(128);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = dashed
        ? new THREE.LineDashedMaterial({ color, dashSize: 0.12, gapSize: 0.07, opacity: 0.40, transparent: true })
        : new THREE.LineBasicMaterial({ color, opacity: 0.55, transparent: true });
      const line = new THREE.Line(geo, mat);
      if (dashed) line.computeLineDistances();
      line.rotation.x = rotX;
      line.rotation.y = rotY;
      return line;
    };
    const ring1 = makeRing(1.62, Math.PI / 3.2,  Math.PI / 5,  0xffffff, false);
    const ring2 = makeRing(1.80, Math.PI / 2.5, -Math.PI / 7,  0xf97316, true);
    scene.add(ring1, ring2);

    // ── Full-Moon lighting ─────────────────────────────────────────────────
    // Sun mostly from camera direction → even full illumination (like NASA photo)
    const sun = new THREE.DirectionalLight(0xfff8f0, 2.8);
    sun.position.set(3, 2, 10);
    scene.add(sun);

    // Very soft earthshine fill
    const fill = new THREE.DirectionalLight(0x203060, 0.22);
    fill.position.set(-4, -1, -5);
    scene.add(fill);

    // Ambient keeps shadow side from being pitch black
    scene.add(new THREE.AmbientLight(0x888888, 0.65));

    // ── Drag interaction ───────────────────────────────────────────────────
    let dragging = false;
    let prev = { x: 0, y: 0 };

    const onDown = (e: MouseEvent) => { dragging = true; prev = { x: e.clientX, y: e.clientY }; };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const deltaY = (e.clientX - prev.x) * 0.006;
      const deltaX = (e.clientY - prev.y) * 0.006;
      moonMesh.rotation.y += deltaY;
      moonMesh.rotation.x += deltaX;
      prev = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { dragging = false; };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    const onTS = (e: TouchEvent) => { if (!e.touches[0]) return; dragging = true; prev = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const onTM = (e: TouchEvent) => {
      if (!dragging || !e.touches[0]) return;
      const deltaY = (e.touches[0].clientX - prev.x) * 0.006;
      const deltaX = (e.touches[0].clientY - prev.y) * 0.006;
      moonMesh.rotation.y += deltaY;
      moonMesh.rotation.x += deltaX;
      prev = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTE = () => { dragging = false; };
    dom.addEventListener('touchstart', onTS);
    window.addEventListener('touchmove', onTM);
    window.addEventListener('touchend', onTE);

    // ── Animation ──────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous smooth 3D moon auto-rotation
      if (!dragging) {
        moonMesh.rotation.y += 0.006;
      }

      ring1.rotation.z = t * 0.035;
      ring2.rotation.z = -t * 0.06;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      dom.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      dom.removeEventListener('touchstart', onTS);
      window.removeEventListener('touchmove', onTM);
      window.removeEventListener('touchend', onTE);
      if (container.contains(dom)) container.removeChild(dom);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[400px] sm:h-[450px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ── Telemetry HUD ── */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Top-right: 27 Day Orbit */}
        <div className="absolute top-6 right-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-zinc-700/80 backdrop-blur-md text-[11px] font-mono text-zinc-200 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          <span className="font-bold text-white">27 Day</span>&nbsp;Orbit
        </div>

        {/* Mid-right: Diameter */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <div className="hidden sm:block w-14 h-px bg-gradient-to-r from-transparent to-orange-400" />
          <div className="px-3.5 py-2 rounded-xl bg-black/80 border border-orange-500/60 backdrop-blur-md text-right shadow-xl">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Diameter</div>
            <div className="text-sm font-mono font-black text-orange-400">3,474.8 km</div>
          </div>
        </div>

        {/* Bottom-left: Velocity */}
        <div className="absolute left-4 bottom-14 flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-black/80 border border-zinc-700/80 backdrop-blur-md shadow-xl">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Velocity</div>
            <div className="text-xs font-mono font-bold text-emerald-400">16.7 km/h</div>
          </div>
          <div className="hidden sm:block w-14 h-px bg-gradient-to-r from-emerald-400 to-transparent" />
        </div>

        {/* Bottom hint */}
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <span className={`text-[10px] font-mono uppercase tracking-widest transition-opacity duration-300 ${isHovered ? 'text-orange-400 opacity-100' : 'text-zinc-600 opacity-50'}`}>
            Drag to Rotate 360° · Three.js 3D Engine
          </span>
        </div>
      </div>
    </div>
  );
};

export default Moon3D;
