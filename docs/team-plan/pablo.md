# Pablo's Tasks - Integration & Styling (Frontend)

## Overview

As co-lead, my role is connecting everything together and helping teammates. I'm here to assist with any integration issues and polish the final product.

**Total Time Estimate: 5-6+ hours**

---

## My Responsibilities

### 1. Component Setup

Files already in place:

- `src/App.jsx` - Routing setup
- `src/main.jsx` - App entry point
- `src/components/Navbar.jsx` - Navigation
- `src/pages/StoryDetail.jsx` - Story page
- `src/pages/CreateStory.jsx` - Story creation

### 2. Styling

- `src/styles/global.css` - Base styles
- Can add more styling as needed
- Responsive design
- Polish UI/UX

### 3. Integration Support

- Help connect frontend to backend
- Debug API issues
- Fix merge conflicts
- Assist teammates with blockers

### 4. Testing

- Test full user flows
- Verify auth works correctly
- Check all CRUD operations
- Test edge cases

---

## Checklist

### Setup

- [ ] Project runs with `npm run dev`
- [ ] Routes are configured
- [ ] Navbar shows correct auth state

### Integration

- [ ] API service connects to backend
- [ ] Auth flow works end-to-end
- [ ] Stories display on home page
- [ ] Comments load on story page

### Polish

- [ ] Consistent styling
- [ ] Loading states
- [ ] Error handling
- [ ] Mobile responsive

---

## Helpful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Need Help?

Happy to pair up on any blockers. Just reach out!

---

## Implemented comment code (for reference)

The following code is included here for reference to help with quick reviews or restores.

### `src/services/commentService.js`

```javascript
import api from "./api";

// Get all comments for a story
export const getCommentsByStory = async (storyId) => {
  const res = await api.get(`/stories/${storyId}/comments`);
  return res.data;
};

// Create a new comment
export const createComment = async (storyId, commentData) => {
  const res = await api.post(`/stories/${storyId}/comments`, commentData);
  return res.data;
};

// Delete a comment
export const deleteComment = async (commentId) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
};
```

### `src/components/CommentSection.jsx`

```jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCommentsByStory,
  createComment,
  deleteComment,
} from "../services/commentService";

function CommentSection({ storyId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await getCommentsByStory(storyId);
        setComments(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load comments");
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
      setNewComment("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post comment");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete comment");
    }
  };

  if (loading) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  return (
    <section className="comment-section">
      <h3>Comments ({comments.length})</h3>
      {error && <div className="error-message">{error}</div>}
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

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <span className="comment-author">
                  {comment.author?.username}
                </span>
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
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
```

### `src/pages/StoryDetail/StoryDetail.jsx` (comments & modal)

```jsx
// Refer to the StoryDetail file in the repo; it includes comment fetching, modal, submit and delete handlers
```
