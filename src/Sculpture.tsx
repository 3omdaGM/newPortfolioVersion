import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
export type SceneState = { progress: number; reduced: boolean };
export function Sculpture({ state }: { state: React.RefObject<SceneState> }) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = host.current!;
    let dead = false,
      frame = 0,
      visible = true;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(
      Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.75),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 7.6);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04);
    scene.environment = env.texture;
    room.dispose();
    pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x30382c, 2));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xd9ff43, 3);
    rim.position.set(4, 1, -2);
    scene.add(rim);
    const group = new THREE.Group();
    scene.add(group);
    const material = new THREE.MeshStandardMaterial({
      color: 0xc5c9bb,
      metalness: 1,
      roughness: 0.23,
    });
    const deformation = { value: 0 };
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uBreak = deformation;
      shader.vertexShader =
        "attribute vec3 aCenter; attribute vec3 aDrift; uniform float uBreak;\n" +
        shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `vec3 transformed = vec3(position); float f=uBreak; transformed = aCenter + (transformed-aCenter)*(1.0-f*0.65); transformed += aDrift*f; transformed.x += sin(aCenter.y*6.0+f*4.0)*f*.16;`,
      );
    };
    let geometry: THREE.BufferGeometry | undefined;
    new GLTFLoader().load(
      "/assets/sculpture.glb",
      (gltf) => {
        if (dead) {
          gltf.scene.traverse((o) => {
            if (o instanceof THREE.Mesh) {
              o.geometry.dispose();
              const ms = Array.isArray(o.material) ? o.material : [o.material];
              ms.forEach((m) => m.dispose());
            }
          });
          return;
        }
        let source: THREE.BufferGeometry | undefined;
        gltf.scene.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            source ??= o.geometry.clone();
            o.geometry.dispose();
            const ms = Array.isArray(o.material) ? o.material : [o.material];
            ms.forEach((m) => m.dispose());
          }
        });
        if (!source) {
          setFailed(true);
          return;
        }
        const raw = source as THREE.BufferGeometry;
        geometry = raw.index ? raw.toNonIndexed() : raw.clone();
        raw.dispose();
        geometry.computeBoundingBox();
        const box = geometry.boundingBox!;
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        geometry.translate(-center.x, -center.y, -center.z);
        geometry.scale(3.3 / size.y, 3.3 / size.y, 3.3 / size.y);
        const pos = geometry.attributes.position;
        const centers = new Float32Array(pos.count * 3),
          drifts = new Float32Array(pos.count * 3);
        for (let i = 0; i < pos.count; i += 3) {
          const c = new THREE.Vector3();
          for (let j = 0; j < 3; j++)
            c.add(new THREE.Vector3().fromBufferAttribute(pos, i + j));
          c.multiplyScalar(1 / 3);
          const seed = Math.sin(i * 127.1) * 43758.5453;
          const r = seed - Math.floor(seed);
          for (let j = 0; j < 3; j++) {
            c.toArray(centers, (i + j) * 3);
            new THREE.Vector3(
              c.x * (1.2 + r),
              c.y * 0.4 - r * 0.5,
              c.z * (1 + r),
            ).toArray(drifts, (i + j) * 3);
          }
        }
        geometry.setAttribute("aCenter", new THREE.BufferAttribute(centers, 3));
        geometry.setAttribute("aDrift", new THREE.BufferAttribute(drifts, 3));
        group.add(new THREE.Mesh(geometry, material));
        el.dataset.loaded = "true";
      },
      undefined,
      () => {
        if (!dead) setFailed(true);
      },
    );
    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / innerWidth - 0.5) * 0.13;
      pointer.y = (e.clientY / innerHeight - 0.5) * 0.08;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    const io = new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
    });
    io.observe(el);
    const onLost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      const { progress: p, reduced } = state.current;
      if (p < 0.07 || p >= 1) return;
      const turn = THREE.MathUtils.smoothstep(p, 0.15, 0.72);
      const scatter = THREE.MathUtils.smoothstep(p, 0.48, 0.88);
      deformation.value = reduced ? 0 : scatter;
      group.rotation.set(
        reduced ? 0 : Math.sin(time * 0.0005) * 0.025 + pointer.y,
        -0.12 + turn * 1.5 + (reduced ? 0 : pointer.x),
        -0.04 + turn * 0.09,
      );
      group.position.set(
        innerWidth < 700 ? 0 : -turn * 1.35,
        0.05 + Math.sin(reduced ? 0 : time * 0.0007) * 0.025,
        0,
      );
      group.scale.setScalar(1 - turn * 0.15);
      camera.position.z = 7.6 + turn * 0.6;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      dead = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      geometry?.dispose();
      material.dispose();
      env.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [state]);
  return (
    <div
      className={`sculpture ${failed ? "scene-failed" : ""}`}
      ref={host}
      aria-hidden="true"
    >
      {failed && (
        <div className="static-sculpture">
          <span>ME.</span>
          <small>FORM / FUNCTION</small>
        </div>
      )}
    </div>
  );
}
