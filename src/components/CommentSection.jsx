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
  // TODO: Set up state
  // PSEUDOCODE:
  // - comments: [] (array of comment objects)
  // - newComment: '' (input field value)
  // - loading: true (for initial load)
  // - error: null (for any errors)

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get auth state
  const { user, isAuthenticated } = useAuth();


  // TODO: Fetch comments when component mounts or storyId changes
  // PSEUDOCODE:
  // useEffect(() => {
  //   1. Define async function fetchComments:
  //      - setLoading(true)
  //      - Try: call getCommentsByStory(storyId)
  //      - setComments with the result
  //      - Catch: setError with error message
  //      - Finally: setLoading(false)
  //   2. Call fetchComments()
  // }, [storyId])

  useEffect(() => {
    const fetchComments = async () => {
      // TODO: setLoading(true)
      // TODO: Try getCommentsByStory(storyId)
      // TODO: setComments with result
      // TODO: Catch and setError
      // TODO: Finally setLoading(false)
    };

    fetchComments();
  }, [storyId]);


  // TODO: Handle new comment submission
  // PSEUDOCODE:
  // 1. Prevent default form behavior
  // 2. If newComment is empty, return early
  // 3. Try:
  //    - Call createComment(storyId, { content: newComment })
  //    - Add new comment to comments array (at beginning or end)
  //    - Clear newComment input
  // 4. Catch: setError with error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Check if newComment is empty
    // TODO: Call createComment API
    // TODO: Add new comment to state: setComments([...comments, newComment]) or prepend
    // TODO: Clear input: setNewComment('')
    // TODO: Handle errors
  };


  // TODO: Handle comment deletion
  // PSEUDOCODE:
  // 1. Accept commentId as parameter
  // 2. Try:
  //    - Call deleteComment(commentId)
  //    - Remove comment from state by filtering
  // 3. Catch: setError with error message

  const handleDelete = async (commentId) => {
    // TODO: Call deleteComment API
    // TODO: Filter out deleted comment: setComments(comments.filter(c => c._id !== commentId))
    // TODO: Handle errors
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
            Post Comment
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
