/**
 * Story Detail Page
 * 🔴 PABLO's Task
 * 
 * Shows full story with comments section.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStoryById, deleteStory, toggleLike } from '../../services/storyService';
import CommentSection from '../../components/CommentSection';
import './StoryDetail.css';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch story on mount
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStoryById(id);
        setStory(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load story');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  // Handle like
  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      const updated = await toggleLike(id);
      setStory(updated);
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    try {
      await deleteStory(id);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete story');
    }
  };

  const isAuthor = user?._id === story?.author?._id;
  const hasLiked = story?.likes?.includes(user?._id);

  if (loading) return <div className="loading">Loading story...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!story) return <div className="not-found">Story not found</div>;

  return (
    <div className="story-detail-page">
      <article className="story-full">
        <header className="story-header">
          <h1>{story.title}</h1>
          <div className="story-meta">
            <span className="author">By {story.author?.username}</span>
            <span className="date">{new Date(story.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="story-content">
          {story.content}
        </div>

        <footer className="story-footer">
          <button 
            className={`like-btn ${hasLiked ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={!isAuthenticated}
          >
            ♥ {story.likes?.length || 0}
          </button>

          {isAuthor && (
            <div className="author-actions">
              <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
              <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
          )}
        </footer>
      </article>

      <CommentSection storyId={id} />
    </div>
  );
}

export default StoryDetail;
