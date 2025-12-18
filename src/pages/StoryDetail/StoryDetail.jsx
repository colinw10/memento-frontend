/**
 * Story Detail Page
 * 🔴 PABLO's Task
 * 
 * Shows full story with comments section.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStoryById, deleteStory, toggleLike } from '../../services/storyService';
import { getCommentsByStory, createComment, deleteComment } from '../../services/commentService';
import './StoryDetail.css';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);

  useEffect(() => {
    fetchStory();
    fetchComments();
  }, [id]);

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

  const fetchComments = async () => {
    try {
      const data = await getCommentsByStory(id);
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load comments');
      setComments([]);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      const updated = await toggleLike(id);
      setStory(updated);
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    try {
      await deleteStory(id);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete story');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const response = await createComment(id, { content: newComment });
      console.log('Backend response:', response);
      // Check if comment is nested in response
      const comment = response.comment || response.data || response;
      console.log('Comment data:', comment);
      setComments(prev => [comment, ...(Array.isArray(prev) ? prev : [])]);
      setNewComment('');
      setShowCommentModal(false);
    } catch (err) {
      console.error('Failed to post comment:', err.response?.status, err.response?.data || err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment');
    }
  };

  const openCommentModal = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowCommentModal(true);
  };

  if (loading) return <div className="loading">Loading story...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!story) return <div className="not-found">Story not found</div>;

  const isAuthor = user?.id === story?.author?._id || user?._id === story?.author?._id;
  const hasLiked = story?.likes?.includes(user?.id) || story?.likes?.includes(user?._id);
  const formattedDate = new Date(story.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="story-detail">
      <article className="story-full">
        <header className="story-full-header">
          <h1 className="story-full-title">{story.title}</h1>
          <div className="story-full-meta">
            <span className="story-full-author">{story.author?.username}</span>
            <span className="story-full-date">{formattedDate}</span>
          </div>
        </header>

        <div className="story-full-content">
          {story.content.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <footer className="story-full-footer">
          <div className="story-full-actions">
            <button 
              className={`icon-btn ${hasLiked ? 'liked' : ''}`}
              onClick={handleLike}
              disabled={!isAuthenticated}
              title="Like"
            >
              <span className="icon">♥</span>
              <span className="count">{story.likes?.length || 0}</span>
            </button>
            
            <button 
              className="icon-btn"
              onClick={openCommentModal}
              title="Comment"
            >
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="count">{comments.length}</span>
            </button>
          </div>

          {isAuthor && (
            <div className="story-actions">
              <Link to={`/story/${id}/edit`} className="btn btn-secondary">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          )}
        </footer>
      </article>

      {comments.length > 0 && (
        <section className="comments-section">
          <h2 className="comments-title">Comments ({comments.length})</h2>
          
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment._id} className="comment">
                <div className="comment-header">
                  <span className="comment-author">{comment.author?.username}</span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
                {user?._id === comment.author?._id && (
                  <button 
                    onClick={() => handleDeleteComment(comment._id)}
                    className="comment-delete"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="modal-overlay" onClick={() => setShowCommentModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add a Comment</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowCommentModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                className="input"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                maxLength={2000}
                autoFocus
              />
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCommentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryDetail;
