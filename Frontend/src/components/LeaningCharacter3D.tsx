import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LeaningCharacter3DProps {
  className?: string;
}

/**
 * 3D Character Model — Leaning pose with elbow resting on surface,
 * wearing cool wayfarer goggles, matching the user's photo style.
 * Designed to sit between the left/right portal card columns.
 */
export const LeaningCharacter3D: React.FC<LeaningCharacter3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 520;

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0.3, 0.3, 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // ── Master Group ────────────────────────────────────────────────────────
    const characterGroup = new THREE.Group();
    // Slight overall lean to the right (leaning on right elbow)
    characterGroup.rotation.z = 0.06;
    characterGroup.position.set(0, -0.2, 0);
    scene.add(characterGroup);

    // ── Materials ────────────────────────────────────────────────────────────
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xc88e68, roughness: 0.55, metalness: 0.05,
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x111115, roughness: 0.8, metalness: 0.1,
    });
    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x18181c, roughness: 0.7, metalness: 0.2,
    });
    const glassesFrameMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0d, roughness: 0.2, metalness: 0.8,
    });
    const glassesLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508, transmission: 0.1, opacity: 0.95, transparent: true,
      roughness: 0.05, metalness: 0.9, clearcoat: 1.0, clearcoatRoughness: 0.1, reflectivity: 1.0,
    });
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, metalness: 0.9, roughness: 0.2,
    });
    const facialHairMat = new THREE.MeshStandardMaterial({
      color: 0x151210, roughness: 0.9, opacity: 0.85, transparent: true,
    });

    // ── 1. Head & Neck ──────────────────────────────────────────────────────
    const headGroup = new THREE.Group();
    // Slight head tilt — looking cool and confident
    headGroup.rotation.z = -0.08;
    headGroup.rotation.y = 0.12;
    characterGroup.add(headGroup);

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

    // ── 2. Curly Hair ───────────────────────────────────────────────────────
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    const topHairGeo = new THREE.SphereGeometry(0.68, 32, 32);
    topHairGeo.scale(0.92, 0.7, 0.95);
    const topHair = new THREE.Mesh(topHairGeo, hairMat);
    topHair.position.set(0, 0.85, -0.05);
    hairGroup.add(topHair);

    const curlPositions = [
      [0, 1.15, 0.1], [-0.25, 1.12, 0.2], [0.25, 1.12, 0.2],
      [-0.42, 0.98, 0.15], [0.42, 0.98, 0.15], [-0.15, 1.2, -0.1],
      [0.15, 1.2, -0.1], [-0.35, 1.05, -0.2], [0.35, 1.05, -0.2],
      [-0.48, 0.78, 0.05], [0.48, 0.78, 0.05], [0, 1.1, 0.35],
      [-0.18, 1.14, 0.3], [0.18, 1.14, 0.3],
    ];
    curlPositions.forEach(([x, y, z]) => {
      const curlGeo = new THREE.SphereGeometry(0.18 + Math.random() * 0.08, 16, 16);
      curlGeo.scale(1.1, 0.9, 1.0);
      const curl = new THREE.Mesh(curlGeo, hairMat);
      curl.position.set(x, y, z);
      curl.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
      hairGroup.add(curl);
    });

    // ── 3. Wayfarer Sunglasses ──────────────────────────────────────────────
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.44, 0.54);
    headGroup.add(glassesGroup);

    const bridgeGeo = new THREE.BoxGeometry(0.16, 0.05, 0.05);
    const bridge = new THREE.Mesh(bridgeGeo, glassesFrameMat);
    bridge.position.set(0, 0.03, 0.08);
    glassesGroup.add(bridge);

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

    const rightFrame = new THREE.Mesh(frameGeo, glassesFrameMat);
    rightFrame.position.set(0.31, 0, 0);
    rightFrame.rotation.y = -0.08;
    glassesGroup.add(rightFrame);

    const rightLens = new THREE.Mesh(leftLensGeo, glassesLensMat);
    rightLens.position.set(0.31, 0, 0.04);
    rightLens.rotation.y = -0.08;
    glassesGroup.add(rightLens);

    const armGeo = new THREE.BoxGeometry(0.04, 0.04, 0.6);
    const leftArmGlasses = new THREE.Mesh(armGeo, glassesFrameMat);
    leftArmGlasses.position.set(-0.6, 0.02, -0.25);
    leftArmGlasses.rotation.y = -0.15;
    glassesGroup.add(leftArmGlasses);

    const rightArmGlasses = new THREE.Mesh(armGeo, glassesFrameMat);
    rightArmGlasses.position.set(0.6, 0.02, -0.25);
    rightArmGlasses.rotation.y = 0.15;
    glassesGroup.add(rightArmGlasses);

    const pinGeo = new THREE.SphereGeometry(0.022, 12, 12);
    const leftPin = new THREE.Mesh(pinGeo, goldAccentMat);
    leftPin.position.set(-0.58, 0.07, 0.07);
    glassesGroup.add(leftPin);
    const rightPin = new THREE.Mesh(pinGeo, goldAccentMat);
    rightPin.position.set(0.58, 0.07, 0.07);
    glassesGroup.add(rightPin);

    // ── 4. Facial Hair ──────────────────────────────────────────────────────
    const stacheShape = new THREE.Shape();
    stacheShape.moveTo(-0.2, 0);
    stacheShape.quadraticCurveTo(0, 0.06, 0.2, 0);
    stacheShape.quadraticCurveTo(0, -0.08, -0.2, 0);
    const stacheGeo = new THREE.ShapeGeometry(stacheShape);
    const mustache = new THREE.Mesh(stacheGeo, facialHairMat);
    mustache.position.set(0, 0.18, 0.65);
    mustache.rotation.x = -0.2;
    headGroup.add(mustache);

    const chinBeardGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.18, 16);
    const chinBeard = new THREE.Mesh(chinBeardGeo, facialHairMat);
    chinBeard.position.set(0, 0.02, 0.58);
    chinBeard.rotation.x = 0.3;
    headGroup.add(chinBeard);

    // ── 5. Torso & Jacket ───────────────────────────────────────────────────
    const bodyGroup = new THREE.Group();
    characterGroup.add(bodyGroup);

    const chestGeo = new THREE.CylinderGeometry(0.7, 0.85, 1.2, 32);
    chestGeo.scale(1.4, 1.0, 0.8);
    const chestMesh = new THREE.Mesh(chestGeo, jacketMat);
    chestMesh.position.y = -0.9;
    chestMesh.castShadow = true;
    chestMesh.receiveShadow = true;
    bodyGroup.add(chestMesh);

    const collarShape = new THREE.TorusGeometry(0.42, 0.08, 16, 32, Math.PI);
    const collar = new THREE.Mesh(collarShape, jacketMat);
    collar.position.set(0, -0.32, 0.15);
    collar.rotation.x = Math.PI / 2.2;
    bodyGroup.add(collar);

    const innerShirtGeo = new THREE.CylinderGeometry(0.28, 0.35, 0.6, 16);
    const innerShirtMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.9 });
    const innerShirt = new THREE.Mesh(innerShirtGeo, innerShirtMat);
    innerShirt.position.set(0, -0.45, 0.18);
    bodyGroup.add(innerShirt);

    // ── 6. Arms — Leaning Pose ──────────────────────────────────────────────
    // Right arm: resting/leaning on a surface (elbow bent, forearm forward)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.85, -0.55, 0);
    rightArmGroup.rotation.z = 0.6;  // upper arm angled outward for lean
    bodyGroup.add(rightArmGroup);

    // Upper arm
    const upperArmGeo = new THREE.CylinderGeometry(0.18, 0.16, 0.85, 16);
    const rightUpperArm = new THREE.Mesh(upperArmGeo, jacketMat);
    rightUpperArm.position.y = -0.42;
    rightUpperArm.castShadow = true;
    rightArmGroup.add(rightUpperArm);

    // Forearm group (bends at elbow)
    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.set(0, -0.85, 0);
    rightForearmGroup.rotation.z = -1.2;  // forearm bends inward resting
    rightForearmGroup.rotation.x = 0.3;   // slight forward tilt
    rightArmGroup.add(rightForearmGroup);

    const forearmGeo = new THREE.CylinderGeometry(0.14, 0.13, 0.7, 16);
    const rightForearm = new THREE.Mesh(forearmGeo, jacketMat);
    rightForearm.position.y = -0.35;
    rightForearm.castShadow = true;
    rightForearmGroup.add(rightForearm);

    // Right hand (resting)
    const handGeo = new THREE.SphereGeometry(0.13, 16, 16);
    handGeo.scale(0.9, 0.7, 1.0);
    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0, -0.72, 0);
    rightForearmGroup.add(rightHand);

    // Left arm: relaxed, hanging or resting on hip
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.85, -0.55, 0);
    leftArmGroup.rotation.z = -0.25;  // slightly angled out
    bodyGroup.add(leftArmGroup);

    const leftUpperArm = new THREE.Mesh(upperArmGeo, jacketMat);
    leftUpperArm.position.y = -0.42;
    leftUpperArm.castShadow = true;
    leftArmGroup.add(leftUpperArm);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.set(0, -0.85, 0);
    leftForearmGroup.rotation.z = 0.5;   // relaxed bend
    leftForearmGroup.rotation.x = 0.15;  // slight forward
    leftArmGroup.add(leftForearmGroup);

    const leftForearm = new THREE.Mesh(forearmGeo, jacketMat);
    leftForearm.position.y = -0.35;
    leftForearm.castShadow = true;
    leftForearmGroup.add(leftForearm);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(0, -0.72, 0);
    leftForearmGroup.add(leftHand);

    // ── 7. Lighting ─────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x1a1215, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffefe0, 2.2);
    keyLight.position.set(2.5, 3.5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const redCrimsonLight = new THREE.PointLight(0xff0044, 18, 12);
    redCrimsonLight.position.set(-3.2, 0.8, -1.5);
    scene.add(redCrimsonLight);

    const redBackgroundGlow = new THREE.PointLight(0xef4444, 24, 10);
    redBackgroundGlow.position.set(2.5, -0.5, -2.0);
    scene.add(redBackgroundGlow);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    // Orange rim light from below (gives premium feel)
    const orangeRim = new THREE.PointLight(0xff6600, 8, 8);
    orangeRim.position.set(0, -3, 1);
    scene.add(orangeRim);

    // ── 8. Atmospheric Particles ────────────────────────────────────────────
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xff3355, size: 0.035, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Mouse Interaction ────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
      mouse.targetX = x * 0.4;
      mouse.targetY = y * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // ── Render Loop ──────────────────────────────────────────────────────────
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Character follows mouse gaze
      characterGroup.rotation.y = 0.06 + mouse.x * 0.6;
      characterGroup.rotation.x = -mouse.y * 0.4;

      // Subtle breathing
      characterGroup.position.y = -0.2 + Math.sin(t * 1.6) * 0.035;
      headGroup.rotation.z = -0.08 + Math.sin(t * 1.0) * 0.015;

      // Subtle arm sway
      rightArmGroup.rotation.z = 0.6 + Math.sin(t * 0.8) * 0.02;
      leftArmGroup.rotation.z = -0.25 + Math.sin(t * 0.9 + 1) * 0.025;

      // Particles float
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += 0.002;
        if (positions[i] > 4) positions[i] = -4;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Pulse light
      redCrimsonLight.intensity = 16 + Math.sin(t * 2.5) * 4;
      orangeRim.intensity = 6 + Math.sin(t * 1.8 + 0.5) * 2;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ──────────────────────────────────────────────────────────────
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
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {/* Red ambient glow behind character */}
      <div className="absolute inset-0 bg-radial from-red-600/15 via-transparent to-transparent pointer-events-none" />

      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full relative z-10" />

      {/* Interactive pulse dot */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 rounded-full bg-zinc-950/80 border border-red-500/30 backdrop-blur-md flex items-center gap-1.5 pointer-events-none text-[9px] font-mono text-red-400/80 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        <span>3D • INTERACTIVE</span>
      </div>
    </div>
  );
};

export default LeaningCharacter3D;
