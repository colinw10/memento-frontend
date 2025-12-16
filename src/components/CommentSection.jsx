/**
 * Comment Section Component
 * 🟣 TITO's Task (Size: M)
 * 
 * Displays comments for a story and allows adding new comments.
 * Shows comment form only for authenticated users.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCommentsByStory, createComment, deleteComment } from '../services/commentService';

function CommentSection({ storyId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth state
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await getCommentsByStory(storyId);
        setComments(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [storyId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const comment = await createComment(storyId, { content: newComment });
      setComments([comment, ...comments]);
      setNewComment('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    }
  };


  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
    }
  };


  // Loading state
  if (loading) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  return (
    <section className="comment-section">
      <h3>Comments ({comments.length})</h3>

      {/* Error display */}
      {error && <div className="error-message">{error}</div>}

      {/* Comment Form - only show if authenticated */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
          />
          <button type="submit" disabled={!newComment.trim()}>
            Post 
          </button>
        </form>
      ) : (
        <p className="login-prompt">
          <a href="/login">Log in</a> to leave a comment.
        </p>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.author?.username}</span>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
              
              {/* Delete button - only show for comment author */}
              {user?._id === comment.author?._id && (
                <button 
                  className="delete-comment-btn"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CommentSection;
