
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ theme }: { theme: 'dark' | 'light' }) => {
    const ref = useRef<THREE.Points>(null!);

    // Create random points for the particle field
    const sphere = useMemo(() => {
        const points = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            const r = 1.5;
            points[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            points[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            points[i * 3 + 2] = r * Math.cos(theta);
        }
        return points;
    }, []);

    useFrame((state, delta) => {
        // Subtle rotation of the particle field
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Mouse interaction: slightly tilt based on mouse position
        const mouseX = state.mouse.x;
        const mouseY = state.mouse.y;
        ref.current.rotation.x += mouseY * 0.05;
        ref.current.rotation.y += mouseX * 0.05;
    });

    const color = theme === 'dark' ? '#0ea5e9' : '#0369a1';

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.008}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

const ThreeBackground = ({ theme }: { theme: 'dark' | 'light' }) => {
    return (
        <div className={`fixed inset-0 z-[-1] pointer-events-none overflow-hidden transition-colors duration-1000 ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
            }`}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <React.Suspense fallback={null}>
                    <ParticleField theme={theme} />
                </React.Suspense>
            </Canvas>
            {/* Subtle overlay to soften the particles */}
            <div className={`absolute inset-0 ${theme === 'dark'
                ? 'bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50'
                : 'bg-gradient-to-b from-white/50 via-transparent to-white/50'
                }`} />
        </div>
    );
};

export default ThreeBackground;
