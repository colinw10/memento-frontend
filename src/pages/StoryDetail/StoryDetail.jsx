/**
 * Story Detail Page
 * 🔴 PABLO's Task
 * 
 * Shows full story with comments section.
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStoryById, deleteStory, toggleLike } from '../../services/storyService';
import { getCommentsByStory, createComment, deleteComment, updateComment } from '../../services/commentService';
import './StoryDetail.css';

function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');
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

  const heartRef = useRef();


  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      if (heartRef.current) {
        heartRef.current.classList.remove('heart-animate');
        // Force reflow to restart animation
        void heartRef.current.offsetWidth;
        heartRef.current.classList.add('heart-animate');
        // Remove the class after animation ends
        const removeClass = () => {
          heartRef.current && heartRef.current.classList.remove('heart-animate');
          heartRef.current && heartRef.current.removeEventListener('animationend', removeClass);
        };
        heartRef.current.addEventListener('animationend', removeClass);
      }
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
      navigate('/feed');
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

  const startEditingComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

  const cancelEditingComment = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;
    try {
      const updatedComment = await updateComment(commentId, editContent);
      setComments(comments.map(c => c._id === commentId ? updatedComment : c));
      setEditingCommentId(null);
      setEditContent('');
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  const openCommentModal = () => {
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
      <Link to="/feed" className="back-link">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="11 17 6 12 11 7"></polyline>
          <polyline points="18 17 13 12 18 7"></polyline>
        </svg>
        Back to Feed
      </Link>
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
              <svg ref={heartRef} className="icon-svg icon-outline-only" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span className="count">{story.likes?.length || 0}</span>
            </button>
            
            <button 
              className={`icon-btn ${comments.length > 0 ? 'has-comments' : ''}`}
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
              <Link to={`/story/${id}/edit`} className="ghost-btn edit">
                <span>Edit</span>
              </Link>
              <button onClick={handleDelete} className="ghost-btn delete">
                <span>Delete</span>
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
                
                {editingCommentId === comment._id ? (
                  <div className="comment-edit-form">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="comment-edit-input"
                      rows={3}
                    />
                    <div className="comment-edit-actions">
                      <button onClick={() => handleUpdateComment(comment._id)} className="btn-text save">Save</button>
                      <button onClick={cancelEditingComment} className="btn-text cancel">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="comment-content">{comment.content}</p>
                )}

                {(user?._id === comment.author?._id || user?.id === comment.author?._id) && !editingCommentId && (
                  <div className="comment-actions">
                    <button 
                      onClick={() => startEditingComment(comment)}
                      className="comment-action-btn edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteComment(comment._id)}
                      className="comment-action-btn delete"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="modal-overlay" onClick={() => setShowCommentModal(false)}>
          <div className="modal comment-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Comments ({comments.length})</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowCommentModal(false)}
              >
                ×
              </button>
            </div>
            
            {/* Existing Comments */}
            {comments.length > 0 && (
              <div className="modal-comments-list">
                {comments.map(comment => (
                  <div key={comment._id} className="modal-comment">
                    <div className="comment-header">
                      <span className="comment-author">{comment.author?.username}</span>
                      <span className="comment-date">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {editingCommentId === comment._id ? (
                      <div className="comment-edit-form">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="comment-edit-input"
                          rows={3}
                        />
                        <div className="comment-edit-actions">
                          <button onClick={() => handleUpdateComment(comment._id)} className="btn-text save">Save</button>
                          <button onClick={cancelEditingComment} className="btn-text cancel">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <p className="comment-content">{comment.content}</p>
                    )}

                    {(user?._id === comment.author?._id || user?.id === comment.author?._id) && editingCommentId !== comment._id && (
                      <div className="comment-actions">
                        <button 
                          onClick={() => startEditingComment(comment)}
                          className="comment-action-btn edit"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteComment(comment._id)}
                          className="comment-action-btn delete"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {comments.length === 0 && (
              <p className="no-comments-yet">No comments yet. Be the first to comment!</p>
            )}

            {/* Add Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <textarea
                  className="input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  maxLength={2000}
                />
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowCommentModal(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={!newComment.trim()}>
                    Post
                  </button>
                </div>
              </form>
            ) : (
              <div className="login-to-comment">
                <p>Log in to add a comment</p>
                <Link to="/login" className="btn btn-primary">Login</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryDetail;
