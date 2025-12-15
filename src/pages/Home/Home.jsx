/**
 * Home Page
 * Main page that displays all stories in a feed with particles animation.
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useAuth } from '../../context/AuthContext';
import { getAllStories, toggleLike } from '../../services/storyService';
import StoryCard from '../../components/StoryCard/StoryCard';
import './Home.css';

function Home() {
  const { isAuthenticated } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [init, setInit] = useState(false);

  // Initialize particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      
      // Symphony of Phi - Each particle is an instrument in a golden ratio orchestra
      engine.addPathGenerator("sineWave", {
        generate: (particle) => {
          // The Golden Ratio - nature's perfect proportion
          const PHI = 1.618033988749895;
          const PHI_INV = 0.618033988749895;
          const PHI_SQ = PHI * PHI;
          
          // Time flows in golden spirals
          const time = performance.now() * 0.0004;
          const px = particle.position.x / window.innerWidth;
          const py = particle.position.y / window.innerHeight;
          
          // Each particle gets a unique "instrument" based on golden angle
          const goldenAngle = Math.PI * 2 * PHI_INV;
          const particleSeed = (particle.position.x * PHI + particle.position.y) % 1000;
          const instrumentId = particleSeed * goldenAngle;
          
          // Orchestra sections based on Fibonacci positions
          const section = Math.floor((particleSeed % 89) / 13); // Fibonacci: 13, 21, 34, 55, 89
          
          // === THE FOUR MOVEMENTS OF THE SYMPHONY ===
          
          // Movement 1: Allegro - The main theme (strings)
          const allegro = Math.sin(time * PHI + instrumentId) * 
                         Math.cos(time * PHI_INV + px * Math.PI * PHI);
          
          // Movement 2: Adagio - Slow, emotional swells (woodwinds)  
          const adagio = Math.sin(time * PHI_INV * 0.5 + py * PHI_SQ) * 
                        Math.cos(time * 0.3 + instrumentId * PHI_INV) * PHI_INV;
          
          // Movement 3: Scherzo - Playful, quick movements (brass)
          const scherzoPhase = time * PHI * 2 + instrumentId * PHI_INV;
          const scherzo = (Math.sin(scherzoPhase) * Math.sin(scherzoPhase * PHI)) * 0.3;
          
          // Movement 4: Finale - Everything together in golden harmony (full orchestra)
          const finaleTime = time * PHI_INV;
          const finale = Math.sin(finaleTime + px * PHI * 5) * 
                        Math.cos(finaleTime * PHI + py * PHI_SQ * 3) * 0.4;
          
          // === GOLDEN SPIRAL - The heart of the symphony ===
          const spiralAngle = time * PHI_INV + instrumentId;
          const spiralRadius = (1 - Math.pow(PHI_INV, (particleSeed % 8) + 1)) * 0.5;
          const goldenSpiral = {
            x: Math.cos(spiralAngle) * spiralRadius * Math.sin(time * PHI_INV),
            y: Math.sin(spiralAngle) * spiralRadius * PHI_INV
          };
          
          // === CRESCENDO & DECRESCENDO - Musical dynamics ===
          const measureLength = Math.PI * 2 * PHI;
          const currentMeasure = (time % measureLength) / measureLength;
          const crescendo = Math.pow(Math.sin(currentMeasure * Math.PI), PHI_INV);
          
          // === HARMONIC RESONANCE - Particles influence neighbors ===
          const harmonicX = Math.sin(px * Math.PI * PHI * 8 + time) * 
                           Math.cos(py * Math.PI * PHI * 5 + time * PHI_INV);
          const harmonicY = Math.cos(px * Math.PI * PHI * 5 + time * PHI) * 
                           Math.sin(py * Math.PI * PHI * 8 + time * PHI_INV);
          
          // === BREATHING - The orchestra breathes as one ===
          const breathCycle = Math.sin(time * PHI_INV * 0.8);
          const collectiveBreath = breathCycle * 0.15 * crescendo;
          
          // === CONDUCTOR'S WAVE - Golden ratio wave across all particles ===
          const conductorBeat = Math.sin(time * PHI * 1.5 - px * PHI_SQ * 4);
          const batonWave = conductorBeat * Math.sin(py * Math.PI) * 0.3;
          
          // === CLUSTERING - Particles gather and drift apart like musical phrases ===
          // Multiple cluster points that move in golden ratio patterns
          const clusterTime = time * PHI_INV * 0.6;
          
          // Cluster centers orbit in golden spirals
          const cluster1 = {
            x: 0.3 + Math.sin(clusterTime) * 0.2,
            y: 0.5 + Math.cos(clusterTime * PHI) * 0.25
          };
          const cluster2 = {
            x: 0.7 + Math.sin(clusterTime * PHI + Math.PI) * 0.2,
            y: 0.5 + Math.cos(clusterTime + Math.PI * PHI_INV) * 0.25
          };
          const cluster3 = {
            x: 0.5 + Math.sin(clusterTime * PHI_INV) * 0.15,
            y: 0.6 + Math.cos(clusterTime * PHI_SQ) * 0.2
          };
          
          // Clustering intensity ebbs and flows like musical phrases
          const clusterPhrase = Math.sin(time * PHI_INV * 0.4);
          const clusterIntensity = Math.pow(Math.max(0, clusterPhrase), 2) * 0.8;
          
          // Each particle is attracted to its nearest cluster based on section
          const myCluster = section % 3 === 0 ? cluster1 : (section % 3 === 1 ? cluster2 : cluster3);
          const toClusterX = myCluster.x - px;
          const toClusterY = myCluster.y - py;
          const distToCluster = Math.sqrt(toClusterX * toClusterX + toClusterY * toClusterY);
          
          // Attraction is stronger when close, creates natural grouping
          const attractionFalloff = Math.exp(-distToCluster * 3);
          const clusterPull = {
            x: toClusterX * clusterIntensity * attractionFalloff * 0.5,
            y: toClusterY * clusterIntensity * attractionFalloff * 0.5
          };
          
          // Dispersion phase - particles drift apart gracefully
          const dispersePhase = Math.sin(time * PHI_INV * 0.3 + Math.PI);
          const disperseIntensity = Math.pow(Math.max(0, dispersePhase), 1.5) * 0.3;
          const disperse = {
            x: (px - 0.5) * disperseIntensity,
            y: (py - 0.5) * disperseIntensity * PHI_INV
          };
          
          // === ASSIGN ROLES BY SECTION ===
          let sectionMultiplier = { x: 11, y: 1 };
          switch(section) {
            case 0: // First Violins - Lead melody, high movement
              sectionMultiplier = { x: PHI, y: PHI_INV * 1.5 };
              break;
            case 1: // Second Violins - Harmony, offset from first
              sectionMultiplier = { x: PHI_INV, y: PHI };
              break;
            case 2: // Violas - Rich middle, golden mean
              sectionMultiplier = { x: 1, y: 1 };
              break;
            case 3: // Cellos - Deep swells
              sectionMultiplier = { x: PHI_INV * 0.8, y: PHI * 0.7 };
              break;
            case 4: // Basses - Foundation, slow and steady
              sectionMultiplier = { x: PHI_INV * 0.5, y: PHI_INV * 0.5 };
              break;
            case 5: // Woodwinds - Flutter and dance
              sectionMultiplier = { x: PHI * 1.2, y: PHI * 1.1 };
              break;
            default: // Brass & Percussion - Punctuation
              sectionMultiplier = { x: PHI_SQ * 0.4, y: PHI_SQ * 0.3 };
          }
          
          // === FINAL COMPOSITION - All movements combined in golden proportion ===
          const symphony = {
            x: (
              allegro * PHI_INV * 0.3 +
              adagio * 0.15 +
              scherzo * PHI_INV +
              finale * PHI_INV * 0.5 +
              goldenSpiral.x * 0.4 +
              harmonicX * 0.1 * crescendo +
              collectiveBreath * (px - 0.5) +
              clusterPull.x +
              disperse.x +
              0.4 // Gentle rightward flow of time
            ) * sectionMultiplier.x,
            
            y: (
              allegro * PHI_INV * 0.25 +
              adagio * PHI_INV * 0.4 +
              scherzo * 0.2 +
              finale * PHI_INV * 0.3 +
              goldenSpiral.y * 0.5 +
              harmonicY * 0.15 * crescendo +
              batonWave +
              collectiveBreath * (py - 0.5) +
              clusterPull.y +
              disperse.y
            ) * sectionMultiplier.y
          };
          
          return symphony;
        },
        init: () => {},
        update: () => {},
        reset: () => {}
      });
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Only fetch stories if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchStories();
    }
  }, [isAuthenticated]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const data = await getAllStories();
      setStories(data);
    } catch (err) {
      setError('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  // Handle like toggle
  const handleLike = async (storyId) => {
    try {
      const updatedStory = await toggleLike(storyId);
      setStories(stories.map(story => 
        story._id === storyId ? updatedStory : story
      ));
    } catch (err) {
      console.error('Failed to like story:', err);
    }
  };

  // Landing page for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="home landing">
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "50vh",
          zIndex: 0,
          overflow: "hidden"
        }}>
          {init && <Particles
            id="tsparticles"
            options={{
              fullScreen: { enable: false },
              background: {
                
              },
              fpsLimit: 60,
              interactivity: {
                events: {
                  resize: true,
                },
              },
              particles: {
                color: {
                  value: ["#fcb32115", "#0e98f4ff", "#ff15f7ff"],
                },
                links: {
                  enable: false,
                },
                move: {
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  speed: 0.7,
                  path: {
                    enable: true,
                    generator: "sineWave",
                  },
                },
                number: {
                  value: 300,
                  density: {
                    enable: false,
                  },
                },
                opacity: {
                  value: { min: 0.1, max: 0.6 },
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 2.5 },
                },
              },
              detectRetina: true,
            }}
          />}
        </div>
        <div className="landing-content">
          <h1 className="landing-title">Memento</h1>
          <p className="landing-subtitle">Share your stories. Thread your moments.</p>
          <div className="landing-actions">
            <Link to="/signup" className="btn btn-primary btn-lg"><span>JOIN:)</span></Link>
            <Link to="/login" className="btn btn-secondary btn-lg"><span>Login</span></Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading stories...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1 className="home-title">Recent Stories</h1>
      
      {stories.length === 0 ? (
        <div className="home-empty">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5">
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10"/>
            </svg>
          </div>
          <p className="empty-text">Nothing here yet</p>
          <p className="empty-subtext">Be the first to share a moment</p>
        </div>
      ) : (
        <div className="stories-list">
          {stories.map((story, index) => (
            <StoryCard 
              key={story._id} 
              story={story} 
              onLike={handleLike}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
