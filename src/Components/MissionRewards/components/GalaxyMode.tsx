import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";

function Model() {
    const { scene } = useGLTF("/models/milky_way_galaxy.glb");
    const modelRef = useRef<Group | null>(null);

    // @ts-ignore
    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <Center ref={modelRef}>
            <primitive object={scene} scale={1} />
        </Center>
    );
}

const GalaxyModel = () => {
    return (
        <div className="h-screen">
            <Canvas camera={{ position: [0, 1, 3] }} >
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} />
                <PresentationControls
                    global
                    polar={[-0.4, 0.2]}
                    azimuth={[-Math.PI, Math.PI]}
                >
                    <Model />
                </PresentationControls>
            </Canvas>
        </div>
    )
}

export default GalaxyModel;