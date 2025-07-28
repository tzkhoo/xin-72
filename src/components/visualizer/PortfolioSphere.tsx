import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Stars } from '@react-three/drei';
import { Mesh, Vector3, Color } from 'three';
import { motion } from 'framer-motion';

interface AssetAllocation {
  name: string;
  percentage: number;
  color: string;
  position: Vector3;
  type?: string;
}

interface PortfolioSphereProps {
  allocations: AssetAllocation[];
  totalValue: number;
}

const AssetSphere: React.FC<{ asset: AssetAllocation; totalValue: number }> = ({ asset, totalValue }) => {
  const meshRef = useRef<Mesh>(null);
  const innerMeshRef = useRef<Mesh>(null);
  const radius = Math.sqrt(asset.percentage / 100) * 2;

  // Enhanced asset-specific materials with brighter, HD textures
  const getAssetMaterial = (assetName: string, color: string) => {
    const baseColor = new Color(color);
    
    switch (assetName.toLowerCase()) {
      case 'stocks':
      case 'global stocks':
        return {
          color: baseColor.clone().multiplyScalar(1.5), // Brighter
          metalness: 0.8,
          roughness: 0.1,
          emissive: baseColor.clone().multiplyScalar(0.25),
          envMapIntensity: 1.5,
        };
      case 'bonds':
      case 'green bonds':
        return {
          color: baseColor.clone().multiplyScalar(1.4),
          metalness: 0.6,
          roughness: 0.2,
          emissive: baseColor.clone().multiplyScalar(0.2),
          envMapIntensity: 1.3,
        };
      case 'reits':
      case 'esg reits':
        return {
          color: baseColor.clone().multiplyScalar(1.6),
          metalness: 0.9,
          roughness: 0.05,
          emissive: baseColor.clone().multiplyScalar(0.3),
          envMapIntensity: 1.8,
        };
      case 'clean energy':
      case 'commodities':
        return {
          color: baseColor.clone().multiplyScalar(1.7),
          metalness: 0.95,
          roughness: 0.02,
          emissive: baseColor.clone().multiplyScalar(0.35),
          envMapIntensity: 2.0,
        };
      case 'cash':
      case 'cash & equivalents':
        return {
          color: baseColor.clone().multiplyScalar(1.3),
          metalness: 0.4,
          roughness: 0.3,
          emissive: baseColor.clone().multiplyScalar(0.15),
          envMapIntensity: 1.2,
        };
      default:
        return {
          color: baseColor.clone().multiplyScalar(1.4),
          metalness: 0.7,
          roughness: 0.15,
          emissive: baseColor.clone().multiplyScalar(0.2),
          envMapIntensity: 1.4,
        };
    }
  };

  const materialProps = getAssetMaterial(asset.name, asset.color);

  // Slow rotation animation
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (meshRef.current) {
      // Slow continuous rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(time * 0.3 + asset.position.x) * 0.1;
    }
    
    if (innerMeshRef.current) {
      // Counter-rotation for inner core
      innerMeshRef.current.rotation.y -= 0.008;
      innerMeshRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group position={asset.position}>
      {/* Main sphere with HD texture and bright colors */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 128, 128]} />
        <meshStandardMaterial 
          {...materialProps}
          transparent={false}
          opacity={1.0}
        />
      </mesh>
      
      {/* Inner core for dynamic assets */}
      {(asset.name.toLowerCase().includes('energy') || 
        asset.name.toLowerCase().includes('stock')) && (
        <mesh ref={innerMeshRef}>
          <sphereGeometry args={[radius * 0.6, 32, 32]} />
          <meshBasicMaterial 
            color={materialProps.emissive} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      )}
      
      {/* Asset name */}
      <Text
        position={[0, radius + 0.8, 0]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {asset.name}
      </Text>
      
      {/* Percentage */}
      <Text
        position={[0, radius + 0.4, 0]}
        fontSize={0.25}
        color={asset.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="black"
      >
        {asset.percentage.toFixed(1)}%
      </Text>
      
      {/* Value indicator for larger assets */}
      {asset.percentage > 15 && (
        <Text
          position={[0, -radius - 0.3, 0]}
          fontSize={0.18}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="black"
        >
          ${(asset.percentage * 12500).toLocaleString()}
        </Text>
      )}
    </group>
  );
};

const Scene: React.FC<{ allocations: AssetAllocation[]; totalValue: number }> = ({ allocations, totalValue }) => {
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.4} color="#4f46e5" />
      <pointLight position={[0, -10, 5]} intensity={0.3} color="#06b6d4" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      
      {/* Space-like background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {allocations.map((asset, index) => (
        <AssetSphere key={asset.name} asset={asset} totalValue={totalValue} />
      ))}
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        enableRotate={true}
        maxDistance={15}
        minDistance={8}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

export const PortfolioSphere: React.FC<PortfolioSphereProps> = ({ allocations, totalValue }) => {
  const sphereAllocations = useMemo(() => {
    return allocations.map((allocation, index) => {
      const angle = (index / allocations.length) * Math.PI * 2;
      const radius = 4 + (allocation.percentage / 100) * 2; // Vary distance based on allocation size
      const height = Math.sin(angle * 2) * 1.5; // Create more interesting 3D positioning
      
      return {
        ...allocation,
        position: new Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius * 0.8
        )
      };
    });
  }, [allocations]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-[500px] glass-panel rounded-2xl overflow-hidden relative"
    >
      <Canvas 
        camera={{ position: [0, 2, 12], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance" // Better iOS performance
        }}
        dpr={[1, 2]} // Responsive pixel ratio for mobile
      >
        <Scene allocations={sphereAllocations} totalValue={totalValue} />
      </Canvas>
      
      {/* Portfolio summary overlay */}
      <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-3">
        <p className="text-white text-sm font-medium">Total Portfolio</p>
        <p className="text-white text-lg font-bold">${totalValue.toLocaleString()}</p>
      </div>
    </motion.div>
  );
};