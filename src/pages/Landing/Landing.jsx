/**
 * Landing Page
 * 🔴 PABLO - 3D Particle Field using React Three Fiber
 */

import { Link, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Float, Stars } from '@react-three/drei';
import { useAuth } from '../../context/AuthContext';
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
        opacity={0.5}
        color="#00d4ff"
      />
      
      {/* Secondary Accent Sparkles */}
      <Sparkles 
        count={120}
        scale={15}
        size={12}
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
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="landing">
      {/* Top Right Navigation */}
      {isAuthenticated && (
        <div className="landing-header">
          <button onClick={handleLogout} className="landing-logout-btn">
            Logout
          </button>
        </div>
      )}

      <div className="canvas-container">
        <Canvas camera={{ position: [0, 5, 5], fov: 150 }}>
          {/* Ambient light for general visibility if we add 3D objects later */}
          <ambientLight intensity={0.5} />
          
          {/* Floating animation container for organic movement */}
          <Float 
            speed={.5} 
            rotationIntensity={0.1} 
            floatIntensity={0.3} 
            floatingRange={[-0.2, 5.2]}
          >
            <ParticleField />
          </Float>
          
          {/* Distant stars for depth */}
          <Stars radius={350} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <div className="landing-content">
        <h1 className="landing-title">Memento</h1>
        <p className="landing-subtitle">Share your stories. Thread your moments.</p>
        
        {isAuthenticated ? (
          <div className="landing-actions">
            <Link to="/feed" className="btn btn-primary">
              <svg className="landing-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </Link>
            <Link to="/create" className="btn btn-secondary">
              <svg className="landing-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="landing-actions">
            <Link to="/signup" className="btn btn-primary">
              JOIN
            </Link>
            <Link to="/login" className="btn btn-secondary">
              LOGIN
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
