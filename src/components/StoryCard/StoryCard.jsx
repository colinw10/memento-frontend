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
        <span className="story-author">{story.author?.username}</span>
        <span className="story-date">
          {/* TODO: Format the date nicely */}
          {new Date(story.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Story Content */}
      <Link to={`/story/${story._id}`} className="story-card-content">
        <h2 className="story-title">{story.title}</h2>
        <p className="story-preview">
          {/* TODO: Show first 150 characters of content */}
          {story.content?.substring(0, 150)}...
        </p>
      </Link>

      {/* Story Footer */}
      <div className="story-card-footer">
        {/* Like Button */}
        <button 
          className={`like-btn ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!isAuthenticated}
        >
          {/* TODO: Show filled heart if liked, outline if not */}
          ♥ {story.likes?.length || 0}
        </button>

        {/* Comment Count */}
        <Link to={`/story/${story._id}`} className="comment-count">
          💬 {story.commentCount || 0}
        </Link>
      </div>
    </article>
  );
}

export default StoryCard;
