import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Character3DModelProps {
  className?: string;
}

export const Character3DModel: React.FC<Character3DModelProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // ── Scene Setup ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // ── Master Avatar Group (for mouse lerp rotation) ─────────────────────
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // ── Materials ──────────────────────────────────────────────────────────
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xc88e68,
      roughness: 0.55,
      metalness: 0.05,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x111115,
      roughness: 0.8,
      metalness: 0.1,
    });

    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.7,
      metalness: 0.2,
    });

    const glassesFrameMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0d,
      roughness: 0.2,
      metalness: 0.8,
    });

    const glassesLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      transmission: 0.1,
      opacity: 0.95,
      transparent: true,
      roughness: 0.05,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });

    const facialHairMat = new THREE.MeshStandardMaterial({
      color: 0x151210,
      roughness: 0.9,
      opacity: 0.85,
      transparent: true,
    });

    // ── 1. Head & Neck ─────────────────────────────────────────────────────
    const headGroup = new THREE.Group();
    characterGroup.add(headGroup);

    // Head base (Stylized egg shape)
    const headGeo = new THREE.SphereGeometry(0.7, 48, 48);
    headGeo.scale(0.85, 1.05, 0.9);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.y = 0.4;
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    headGroup.add(headMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.5, 32);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.y = -0.15;
    headGroup.add(neckMesh);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.14, 16, 16);
    earGeo.scale(0.4, 0.9, 0.6);
    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-0.6, 0.38, 0.05);
    leftEar.rotation.z = -0.2;
    headGroup.add(leftEar);

    const rightEar = leftEar.clone();
    rightEar.position.x = 0.6;
    rightEar.rotation.z = 0.2;
    headGroup.add(rightEar);

    // ── 2. Curly Hair (Matching user photo style) ─────────────────────────
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    // Main hair top volume
    const topHairGeo = new THREE.SphereGeometry(0.68, 32, 32);
    topHairGeo.scale(0.92, 0.7, 0.95);
    const topHair = new THREE.Mesh(topHairGeo, hairMat);
    topHair.position.set(0, 0.85, -0.05);
    hairGroup.add(topHair);

    // Curls / Tufts
    const curlPositions = [
      [0, 1.15, 0.1], [-0.25, 1.12, 0.2], [0.25, 1.12, 0.2],
      [-0.42, 0.98, 0.15], [0.42, 0.98, 0.15], [-0.15, 1.2, -0.1],
      [0.15, 1.2, -0.1], [-0.35, 1.05, -0.2], [0.35, 1.05, -0.2],
      [-0.48, 0.78, 0.05], [0.48, 0.78, 0.05], [0, 1.1, 0.35],
      [-0.18, 1.14, 0.3], [0.18, 1.14, 0.3]
    ];

    curlPositions.forEach(([x, y, z]) => {
      const curlGeo = new THREE.SphereGeometry(0.18 + Math.random() * 0.08, 16, 16);
      curlGeo.scale(1.1, 0.9, 1.0);
      const curl = new THREE.Mesh(curlGeo, hairMat);
      curl.position.set(x, y, z);
      curl.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
      hairGroup.add(curl);
    });

    // ── 3. Wayfarer Sunglasses (Exact match to photo) ─────────────────────
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.44, 0.54);
    headGroup.add(glassesGroup);

    // Bridge
    const bridgeGeo = new THREE.BoxGeometry(0.16, 0.05, 0.05);
    const bridge = new THREE.Mesh(bridgeGeo, glassesFrameMat);
    bridge.position.set(0, 0.03, 0.08);
    glassesGroup.add(bridge);

    // Left Frame & Lens
    const frameShape = new THREE.Shape();
    const w = 0.32, h = 0.22, r = 0.05;
    frameShape.moveTo(-w + r, -h);
    frameShape.lineTo(w - r, -h);
    frameShape.quadraticCurveTo(w, -h, w, -h + r);
    frameShape.lineTo(w, h - r);
    frameShape.quadraticCurveTo(w, h, w - r, h);
    frameShape.lineTo(-w + r, h);
    frameShape.quadraticCurveTo(-w, h, -w, h - r);
    frameShape.lineTo(-w, -h + r);
    frameShape.quadraticCurveTo(-w, -h, -w + r, -h);

    const extrudeSettings = { depth: 0.06, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 };
    const frameGeo = new THREE.ExtrudeGeometry(frameShape, extrudeSettings);

    const leftFrame = new THREE.Mesh(frameGeo, glassesFrameMat);
    leftFrame.position.set(-0.31, 0, 0);
    leftFrame.rotation.y = 0.08;
    glassesGroup.add(leftFrame);

    const leftLensGeo = new THREE.PlaneGeometry(0.6, 0.4);
    const leftLens = new THREE.Mesh(leftLensGeo, glassesLensMat);
    leftLens.position.set(-0.31, 0, 0.04);
    leftLens.rotation.y = 0.08;
    glassesGroup.add(leftLens);

    // Right Frame & Lens
    const rightFrame = new THREE.Mesh(frameGeo, glassesFrameMat);
    rightFrame.position.set(0.31, 0, 0);
    rightFrame.rotation.y = -0.08;
    glassesGroup.add(rightFrame);

    const rightLens = new THREE.Mesh(leftLensGeo, glassesLensMat);
    rightLens.position.set(0.31, 0, 0.04);
    rightLens.rotation.y = -0.08;
    glassesGroup.add(rightLens);

    // Temple Arms (Side frame arms)
    const armGeo = new THREE.BoxGeometry(0.04, 0.04, 0.6);
    const leftArm = new THREE.Mesh(armGeo, glassesFrameMat);
    leftArm.position.set(-0.6, 0.02, -0.25);
    leftArm.rotation.y = -0.15;
    glassesGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, glassesFrameMat);
    rightArm.position.set(0.6, 0.02, -0.25);
    rightArm.rotation.y = 0.15;
    glassesGroup.add(rightArm);

    // Gold frame pin accents
    const pinGeo = new THREE.SphereGeometry(0.022, 12, 12);
    const leftPin = new THREE.Mesh(pinGeo, goldAccentMat);
    leftPin.position.set(-0.58, 0.07, 0.07);
    glassesGroup.add(leftPin);

    const rightPin = new THREE.Mesh(pinGeo, goldAccentMat);
    rightPin.position.set(0.58, 0.07, 0.07);
    glassesGroup.add(rightPin);

    // ── 4. Facial Hair (Mustache & Goatee) ─────────────────────────────────
    // Mustache
    const stacheShape = new THREE.Shape();
    stacheShape.moveTo(-0.2, 0);
    stacheShape.quadraticCurveTo(0, 0.06, 0.2, 0);
    stacheShape.quadraticCurveTo(0, -0.08, -0.2, 0);
    const stacheGeo = new THREE.ShapeGeometry(stacheShape);
    const mustache = new THREE.Mesh(stacheGeo, facialHairMat);
    mustache.position.set(0, 0.18, 0.65);
    mustache.rotation.x = -0.2;
    headGroup.add(mustache);

    // Goatee / Beard patch on chin
    const chinBeardGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.18, 16);
    const chinBeard = new THREE.Mesh(chinBeardGeo, facialHairMat);
    chinBeard.position.set(0, 0.02, 0.58);
    chinBeard.rotation.x = 0.3;
    headGroup.add(chinBeard);

    // ── 5. Torso & Black Jacket ───────────────────────────────────────────
    const bodyGroup = new THREE.Group();
    characterGroup.add(bodyGroup);

    // Shoulders & Chest
    const chestGeo = new THREE.CylinderGeometry(0.7, 0.85, 1.2, 32);
    chestGeo.scale(1.4, 1.0, 0.8);
    const chestMesh = new THREE.Mesh(chestGeo, jacketMat);
    chestMesh.position.y = -0.9;
    chestMesh.castShadow = true;
    chestMesh.receiveShadow = true;
    bodyGroup.add(chestMesh);

    // Jacket Collar (Matching photo collar)
    const collarShape = new THREE.TorusGeometry(0.42, 0.08, 16, 32, Math.PI);
    const collar = new THREE.Mesh(collarShape, jacketMat);
    collar.position.set(0, -0.32, 0.15);
    collar.rotation.x = Math.PI / 2.2;
    bodyGroup.add(collar);

    // Inner Shirt
    const innerShirtGeo = new THREE.CylinderGeometry(0.28, 0.35, 0.6, 16);
    const innerShirtMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.9 });
    const innerShirt = new THREE.Mesh(innerShirtGeo, innerShirtMat);
    innerShirt.position.set(0, -0.45, 0.18);
    bodyGroup.add(innerShirt);

    // ── 6. Dramatic Moody Lighting (Red Crimson + Key Light) ───────────────
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x1a1215, 1.5);
    scene.add(ambientLight);

    // Key Light (Warm soft front-left)
    const keyLight = new THREE.DirectionalLight(0xffefe0, 2.2);
    keyLight.position.set(2.5, 3.5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Red Crimson Rim Light (EXACT match to user's photo moody red glow behind shoulder/side)
    const redCrimsonLight = new THREE.PointLight(0xff0044, 18, 12);
    redCrimsonLight.position.set(-3.2, 0.8, -1.5);
    scene.add(redCrimsonLight);

    const redBackgroundGlow = new THREE.PointLight(0xef4444, 24, 10);
    redBackgroundGlow.position.set(2.5, -0.5, -2.0);
    scene.add(redBackgroundGlow);

    // Soft Blue fill on opposite side
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    // ── 7. Atmospheric Red Dust Particles ──────────────────────────────────
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 10;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6 - 1;
      particleScales[i / 3] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xff3355,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Mouse & Animation Interaction ─────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
      mouse.targetX = x * 0.5;
      mouse.targetY = y * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // ── Render Loop ────────────────────────────────────────────────────────
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Character head & body track mouse cursor smoothly
      characterGroup.rotation.y = mouse.x * 0.8;
      characterGroup.rotation.x = -mouse.y * 0.5;

      // Subtle breathing motion
      characterGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.04;
      headGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.02;

      // Particles float slowly upwards
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.003;
        if (positions[i] > 4) positions[i] = -4;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Pulse red crimson background light
      redCrimsonLight.intensity = 16 + Math.sin(elapsedTime * 2.5) * 4;

      renderer.render(scene, camera);
    };

    animate();

    // ── Clean Up ───────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full h-[400px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl ${className}`}
    >
      {/* Background Glow matching user photo ambient red smoke */}
      <div className="absolute inset-0 bg-radial from-red-600/20 via-zinc-950/80 to-zinc-950 pointer-events-none rounded-3xl" />

      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full relative z-10" />

      {/* Interactive Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-zinc-900/80 border border-red-500/30 backdrop-blur-md flex items-center gap-2 pointer-events-none text-[11px] font-mono text-red-400 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span>3D WEBGL MODEL (Move Mouse / Hover)</span>
      </div>
    </div>
  );
};
