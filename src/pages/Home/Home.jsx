import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllStories } from '../../services/storyService';
import StoryCard from '../../components/StoryCard/StoryCard';
import './Home.css';

function Home() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Handle like update - receives the updated story from StoryCard
  const handleLikeUpdate = (updatedStory) => {
    setStories(stories.map(story => 
      story._id === updatedStory._id ? updatedStory : story
    ));
  };


  // Wait for auth to finish loading before deciding what to show
  if (authLoading) return <div className="loading">Loading...</div>;

  // Landing page for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="home landing">
        <div className="landing-bg" />
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
              onLikeUpdate={handleLikeUpdate}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
