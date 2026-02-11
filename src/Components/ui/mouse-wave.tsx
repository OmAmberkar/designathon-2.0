import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fragment, vertex } from "./mouse-wave-shader";

interface MouseWaveProps {
  imageSrc: string;
  canvasWidth: number;
  canvasHeight: number;
}

export default function MouseWave({
  imageSrc,
  canvasWidth,
  canvasHeight,
}: MouseWaveProps) {
  const plane = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageSrc);

  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: new THREE.Vector2(0.5, 0.5) },
    uHoverState: { value: 1 },
  });

  useFrame((state) => {
    if (plane.current) {
      const material = plane.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={plane} position={[0, 0, 0]}>
      <planeGeometry args={[canvasWidth, canvasHeight, 45, 45]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}
