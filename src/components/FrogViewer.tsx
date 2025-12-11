'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

function FrogModel() {
    const { scene } = useGLTF('/frog.glb');

    return (
        <primitive
            object={scene}
            scale={2.5}
            position={[0, -1, 0]}
        />
    );
}

function Loader() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-crimson-red"></div>
        </div>
    );
}

export default function FrogViewer() {
    return (
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-deep-sea/20 to-ocean-blue/20">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />

                {/* Environment for reflections */}
                <Environment preset="sunset" />

                {/* 3D Model */}
                <Suspense fallback={null}>
                    <FrogModel />
                </Suspense>

                {/* Controls for rotation */}
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={3}
                    maxDistance={8}
                    autoRotate
                    autoRotateSpeed={1}
                />
            </Canvas>
        </div>
    );
}
