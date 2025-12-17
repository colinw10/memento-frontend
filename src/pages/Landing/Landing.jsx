/**
 * Landing Page
 * 🔴 PABLO - 3D Particle Field using React Three Fiber
 */

import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Float, Stars } from '@react-three/drei';
import './Landing.css';

function ParticleField() {
  return (
    <group>
      {/* Primary Accent Sparkles */}
      <Sparkles 
        count={150}
        scale={20}
        size={10}
        speed={0.4}
        opacity={0.8}
        color="#00d4ff"
      />
      
      {/* Secondary Accent Sparkles */}
      <Sparkles 
        count={100}
        scale={15}
        size={14}
        speed={0.1}
        opacity={0.6}
        color="#ff006e"
      />
      
      {/* Background Dust */}
      <Sparkles 
        count={300}
        scale={25}
        size={4}
        speed={0.2}
        opacity={0.3}
        color="#ffffffff"
      />
    </group>
  );
}

function Landing() {
  return (
    <div className="landing">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 5, 5], fov: 60 }}>
          {/* Ambient light for general visibility if we add 3D objects later */}
          <ambientLight intensity={0.5} />
          
          {/* Floating animation container for organic movement */}
          <Float 
            speed={1} 
            rotationIntensity={0.1} 
            floatIntensity={0.3} 
            floatingRange={[-0.2, 5.2]}
          >
            <ParticleField />
          </Float>
          
          {/* Distant stars for depth */}
          <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <div className="landing-content">
        <h1 className="landing-title">Memento</h1>
        <p className="landing-subtitle">Share your stories. Thread your moments.</p>
        <div className="landing-actions">
          <Link to="/signup" className="btn btn-primary">
            JOIN
          </Link>
          <Link to="/login" className="btn btn-secondary">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
