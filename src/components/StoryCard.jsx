/**
 * Story Card Component
 * 🟠 CRYSTAL's Task (Part of Story Feed - Size: M)
 * 
 * Displays a single story in the feed.
 * Shows title, preview, author, likes, and comment count.
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toggleLike } from '../services/storyService';

function StoryCard({ story, onLikeUpdate }) {
  // TODO: Get current user from auth context
  const { user, isAuthenticated } = useAuth();

  // TODO: Check if current user has liked this story
  // PSEUDOCODE:
  // 1. story.likes is an array of user IDs
  // 2. Check if user?._id is in story.likes
  // 3. Store result in hasLiked variable

  const hasLiked = false; // TODO: Check if user._id is in story.likes


  // TODO: Implement like handler
  // PSEUDOCODE:
  // 1. If not authenticated, maybe redirect to login or show message
  // 2. Call toggleLike(story._id)
  // 3. Call onLikeUpdate with the updated story to update parent state

  const handleLike = async () => {
    // TODO: Check if authenticated
    // TODO: Call toggleLike API
    // TODO: Call onLikeUpdate with result
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
