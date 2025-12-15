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
      
      // Register sine wave path
      engine.addPathGenerator("sineWave", {
        generate: (particle) => {
          const time = performance.now() * 0.001;
          const offset = particle.position.x * 0.01;
          return {
            x: 1,
            y: Math.sin(time + offset) * 0.3
          };
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
        {init && <Particles
          id="tsparticles"
          options={{
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
                speed: 0.5,
                path: {
                  enable: true,
                  generator: "sineWave",
                },
              },
              number: {
                value: 250,
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
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "40vw",
            height: "100%",
            zIndex: 99
          }}
        />}
        <div className="landing-content">
          <h1 className="landing-title">Memento</h1>
          <p className="landing-subtitle">Share your stories. Connect with moments.</p>
          <div className="landing-actions">
            <Link to="/signup" className="btn btn-primary btn-lg"><span>Sign Up</span></Link>
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
