/**
 * Story Card Component
 * 🟠 CRISTAL's Task (Part of Story Feed - Size: M)
 * 
 * Displays a single story in the feed.
 * Shows title, preview, author, likes, and comment count.
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toggleLike } from '../../services/storyService';
import './StoryCard.css';


 // Get current user from auth context
function StoryCard({ story, onLikeUpdate }) {
  const { user, isAuthenticated } = useAuth();

  // Check if current user has liked this story

  const hasLiked = user ? story.likes?.includes(user._id) : false;


  // Implement like handler
const handleLike = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to like stories.");
      return;
    }

    try {
      const updatedStory = await toggleLike(story._id);
      onLikeUpdate(updatedStory);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };


  return (
    <article className="story-card">
      {/* Story Header */}
      <div className="story-card-header">
        <div className="story-card-author-info">
          <div className="avatar-ring">
            <div className="avatar">{story.author?.username?.charAt(0).toUpperCase()}</div>
          </div>
          <span className="story-card-author">{story.author?.username}</span>
        </div>
        <span className="story-card-date">
          {new Date(story.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Story Content */}
      <Link to={`/story/${story._id}`} className="story-card-title-link">
        <h2 className="story-card-title">{story.title}</h2>
        <p className="story-card-excerpt">
          {story.content?.substring(0, 150)}...
        </p>
      </Link>

      {/* Story Footer */}
      <div className="story-card-footer">
        {/* Like Button */}
        <button 
          className={`story-card-like ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!isAuthenticated}
        >
          <svg className="action-icon" viewBox="0 0 24 24" fill={hasLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{story.likes?.length || 0}</span>
        </button>

        {/* Comment Count */}
        <Link to={`/story/${story._id}`} className="story-card-comments">
          <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>{story.commentCount || 0}</span>
        </Link>
      </div>
    </article>
  );
}

export default StoryCard;
