"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

export default function BookshelfPage() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF7FAFF);
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 3, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({ color: 0xE6F0FF })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Books (3 cubes)
    const books: THREE.Mesh[] = [];
    const colors = [0x0064FF, 0x1B2B3A, 0x4C7DFF];
    for (let i = 0; i < 3; i++) {
      const geo = new THREE.BoxGeometry(0.6, 0.9, 0.2);
      const mat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length] });
      const book = new THREE.Mesh(geo, mat);
      book.position.set(-1 + i * 1, 0.45, 0);
      (book as any).subject = ["정보처리기사", "SQLD", "네트워크"][i];
      scene.add(book);
      books.push(book);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onClick(e: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(books);
      if (hits[0]) {
        const subject = (hits[0].object as any).subject as string;
        router.push(`/quiz?subject=${encodeURIComponent(subject)}`);
      }
    }

    renderer.domElement.addEventListener("click", onClick);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      books.forEach((b, idx) => {
        b.rotation.y += 0.005 + idx * 0.001;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("click", onClick);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">📚 3D 책장</h1>
      <div ref={mountRef} className="toss-card h-[60vh] w-full overflow-hidden" />
      <p className="text-slate-600 mt-4">책을 클릭하면 해당 과목 퀴즈로 이동합니다.</p>
    </main>
  );
}
