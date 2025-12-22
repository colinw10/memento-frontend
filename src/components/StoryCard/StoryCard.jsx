/**
 * Story Card Component
 * 🟠 CRISTAL's Task (Part of Story Feed - Size: M)
 * 
 * Displays a single story in the feed.
 * Shows title, preview, author, likes, and comment count.
 */

import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toggleLike } from '../../services/storyService';
import { createComment, getCommentsByStory } from '../../services/commentService';
import './StoryCard.css';


 // Get current user from auth context
function StoryCard({ story, onLikeUpdate, onCommentAdded }) {
  const { user, isAuthenticated } = useAuth();
  const heartRef = useRef();
  const [expanded, setExpanded] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if current user has liked this story
  const hasLiked = user ? (story.likes?.includes(user._id) || story.likes?.includes(user.id)) : false;


  // Implement like handler
const handleLike = async () => {
    if (!isAuthenticated) {
      alert("You must be logged in to like stories.");
      return;
    }

    try {
      if (heartRef.current) {
        heartRef.current.classList.remove('heart-animate');
        void heartRef.current.offsetWidth;
        heartRef.current.classList.add('heart-animate');
        const removeClass = () => {
          heartRef.current && heartRef.current.classList.remove('heart-animate');
          heartRef.current && heartRef.current.removeEventListener('animationend', removeClass);
        };
        heartRef.current.addEventListener('animationend', removeClass);
      }
      const updatedStory = await toggleLike(story._id);
      onLikeUpdate(updatedStory);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleCommentClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("You must be logged in to comment.");
      return;
    }
    setShowCommentInput(!showCommentInput);
  };

  const handleToggleComments = async (e) => {
    e.preventDefault();
    if (!showComments && comments.length === 0) {
      setLoadingComments(true);
      try {
        const data = await getCommentsByStory(story._id);
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setLoadingComments(false);
      }
    }
    setShowComments(!showComments);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const newComment = await createComment(story._id, { content: commentText.trim() });
      setCommentText('');
      setShowCommentInput(false);
      // Add new comment to local state (at the top)
      setComments(prev => [newComment, ...prev]);
      // Keep/expand the comments dropdown to show the new comment
      setShowComments(true);
      if (onCommentAdded) onCommentAdded(story._id);
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmitting(false);
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
      </Link>
      
      <div className="story-card-preview">
        <p className={`story-card-excerpt ${expanded ? 'expanded' : ''}`}>
          {expanded ? story.content?.substring(0, 300) : story.content?.substring(0, 50)}{story.content?.length > (expanded ? 300 : 50) ? '...' : ''}
        </p>
        {story.content?.length > 50 && (
          <button 
            className="expand-btn" 
            onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            <svg className={`expand-icon ${expanded ? 'expanded' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Story Footer */}
      <div className="story-card-footer">
        {/* Like Button */}
        <button 
          className={`story-card-like ${hasLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!isAuthenticated}
        >
          <svg ref={heartRef} className="action-icon icon-outline-only" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{story.likes?.length || 0}</span>
        </button>

        {/* Comment Button */}
        <button 
          className={`story-card-comments ${story.commentCount > 0 ? 'has-comments' : ''}`}
          onClick={handleCommentClick}
          title="Add comment"
        >
          <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>{story.commentCount || comments.length || 0}</span>
        </button>

        {/* Toggle Comments Dropdown */}
        {(story.commentCount > 0 || comments.length > 0) && (
          <button 
            className={`toggle-comments-btn ${showComments ? 'expanded' : ''}`}
            onClick={handleToggleComments}
            title={showComments ? "Hide comments" : "Show comments"}
          >
            <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span className="toggle-text">{showComments ? 'Hide' : 'View'}</span>
            <svg className="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Comments Dropdown */}
      {showComments && (
        <div className="comments-dropdown">
          {loadingComments ? (
            <p className="loading-comments">Loading comments...</p>
          ) : comments.length > 0 ? (
            <div className="comments-list-mini">
              {comments.slice(0, 3).map(comment => (
                <div key={comment._id} className="comment-mini">
                  <span className="comment-mini-author">{comment.author?.username}</span>
                  <p className="comment-mini-content">{comment.content}</p>
                </div>
              ))}
              {comments.length > 3 && (
                <Link to={`/story/${story._id}`} className="view-all-comments">
                  View all {comments.length} comments
                </Link>
              )}
            </div>
          ) : (
            <p className="no-comments-mini">No comments yet</p>
          )}
        </div>
      )}

      {showCommentInput && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            autoFocus
          />
          <button type="submit" className="btn btn-primary" disabled={!commentText.trim() || isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      )}
    </article>
  );
}

export default StoryCard;
