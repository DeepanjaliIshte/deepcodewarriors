"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.025);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00e5ff, 60, 50);
    blueLight.position.set(12, 8, 10);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 70, 50);
    purpleLight.position.set(-12, -8, 8);
    scene.add(purpleLight);

    const centerGlow = new THREE.PointLight(0x38bdf8, 40, 35);
    centerGlow.position.set(0, 0, 12);
    scene.add(centerGlow);

    // 1. Particle Starfield / Code Dust
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorPalette = [
      new THREE.Color(0x38bdf8), // Electric cyan
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x06b6d4), // Teal
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 60;
      positions[idx + 1] = (Math.random() - 0.5) * 45;
      positions[idx + 2] = (Math.random() - 0.5) * 40;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom Canvas Texture for Glowing Circle Particles
    const circleCanvas = document.createElement("canvas");
    circleCanvas.width = 32;
    circleCanvas.height = 32;
    const ctx = circleCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.3, "rgba(56,189,248,0.8)");
      grad.addColorStop(0.8, "rgba(168,85,247,0.2)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(circleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. Main Central Futuristic Mesh (Octahedron Lattice with Wireframe Shell)
    const centralGroup = new THREE.Group();
    scene.add(centralGroup);

    // Inner glowing crystal
    const innerGeo = new THREE.OctahedronGeometry(3.5, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.8,
      transmission: 0.6,
      opacity: 0.85,
      transparent: true,
      reflectivity: 0.9,
    });
    const innerCrystal = new THREE.Mesh(innerGeo, innerMat);
    centralGroup.add(innerCrystal);

    // Outer wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(4.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireframeCage = new THREE.Mesh(wireGeo, wireMat);
    centralGroup.add(wireframeCage);

    // Outer Torus Ring
    const torusGeo = new THREE.TorusGeometry(6.2, 0.08, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });
    const torusRing1 = new THREE.Mesh(torusGeo, torusMat);
    torusRing1.rotation.x = Math.PI / 3;
    centralGroup.add(torusRing1);

    const torusGeo2 = new THREE.TorusGeometry(7.0, 0.05, 16, 100);
    const torusMat2 = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xc084fc,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.9,
    });
    const torusRing2 = new THREE.Mesh(torusGeo2, torusMat2);
    torusRing2.rotation.y = Math.PI / 4;
    centralGroup.add(torusRing2);

    // 3. Floating Interactive Geometric Glyphs (Representing DSA, Algorithms, Modules)
    const floatingObjects: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      floatSpeed: number;
      floatOffset: number;
    }[] = [];

    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.DodecahedronGeometry(1.1, 0),
      new THREE.TetrahedronGeometry(1.3, 0),
      new THREE.TorusGeometry(0.9, 0.25, 12, 32),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.3,
        metalness: 0.85,
        roughness: 0.2,
        wireframe: true,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0xa855f7,
        emissiveIntensity: 0.3,
        metalness: 0.85,
        roughness: 0.2,
        wireframe: true,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.2,
        metalness: 0.7,
        roughness: 0.3,
        transmission: 0.7,
        transparent: true,
        opacity: 0.75,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xc084fc,
        emissive: 0x9333ea,
        emissiveIntensity: 0.2,
        metalness: 0.6,
        roughness: 0.3,
        transmission: 0.7,
        transparent: true,
        opacity: 0.75,
      }),
    ];

    const objectCoords = [
      { x: -14, y: 7, z: 2 },
      { x: 14, y: 8, z: -2 },
      { x: -16, y: -6, z: 1 },
      { x: 15, y: -7, z: -3 },
      { x: -8, y: 11, z: -5 },
      { x: 9, y: -11, z: 2 },
    ];

    objectCoords.forEach((coord, i) => {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(coord.x, coord.y, coord.z);
      scene.add(mesh);

      floatingObjects.push({
        mesh,
        baseX: coord.x,
        baseY: coord.y,
        baseZ: coord.z,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        floatSpeed: 0.8 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
      });
    });

    // 4. Mouse Tracking & Smooth Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 6. Animation Loop with Clock
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation (LERP)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate and float particle field
      particles.rotation.y = elapsed * 0.025;
      particles.rotation.x = elapsed * 0.012;

      // Central structure animation
      centralGroup.rotation.y = elapsed * 0.35 + mouseX * 0.8;
      centralGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.2 + mouseY * 0.8;
      centralGroup.position.y = Math.sin(elapsed * 0.8) * 0.4;

      innerCrystal.rotation.y = -elapsed * 0.5;
      innerCrystal.rotation.z = Math.cos(elapsed * 0.3) * 0.3;

      wireframeCage.rotation.x = elapsed * 0.2;
      wireframeCage.rotation.y = elapsed * 0.3;

      torusRing1.rotation.z = elapsed * 0.4;
      torusRing2.rotation.x = -elapsed * 0.3;

      // Animate floating secondary geometry
      floatingObjects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeedX;
        obj.mesh.rotation.y += obj.rotSpeedY;
        obj.mesh.rotation.z += obj.rotSpeedZ;
        obj.mesh.position.y = obj.baseY + Math.sin(elapsed * obj.floatSpeed + obj.floatOffset) * 0.8;
        obj.mesh.position.x = obj.baseX + mouseX * 1.5;
        obj.mesh.position.z = obj.baseZ + mouseY * 1.5;
      });

      // Move point lights according to mouse
      blueLight.position.x = 12 + mouseX * 8;
      blueLight.position.y = 8 - mouseY * 8;
      purpleLight.position.x = -12 - mouseX * 8;
      purpleLight.position.y = -8 + mouseY * 8;

      camera.position.x = mouseX * 2.5;
      camera.position.y = -mouseY * 2.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up Three.js memory
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {!hasWebGL && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#060913] via-[#0b1120] to-[#1e1b4b] opacity-90">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
      )}
    </div>
  );
}
