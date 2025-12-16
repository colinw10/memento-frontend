# Tito's Tasks - Comment Section (Frontend)

## Overview

You're building the comment system for the frontend! This connects to your backend comment routes.

**Total Time Estimate: 2-3 hours**

---

## ⚠️ CURRENT STATUS - WHAT NEEDS TO BE DONE

The files exist but have **TODO placeholders** instead of working code. You need to replace the TODOs with actual implementations.

### Files to Complete:

1. `src/services/commentService.js` - All 3 functions are empty shells
2. `src/components/CommentSection.jsx` - Has TODO placeholders in useEffect, handleSubmit, and handleDelete

### CSS is already done!

The styles are in `src/pages/StoryDetail/StoryDetail.css` - you don't need to write CSS.

---

## Task: Comment Section Component (Size: M)

**Files:**

- `src/services/commentService.js`
- `src/components/CommentSection.jsx`

### What You're Building

A component that shows comments on a story and lets users add/delete comments.

---

## Step 1: Comment Service (INCOMPLETE - NEEDS YOUR CODE)

**File:** `src/services/commentService.js`

### Current State:

```javascript
export const getCommentsByStory = async (storyId) => {
  // TODO: GET /stories/:storyId/comments  <-- EMPTY, needs code
};
```

### What You Need to Write:

```javascript
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

---

## Step 2: Comment Section Component (INCOMPLETE - NEEDS YOUR CODE)

**File:** `src/components/CommentSection.jsx`

### Current State:

The component has the structure but the functions are empty:

- `useEffect` → has TODO, doesn't actually fetch comments
- `handleSubmit` → has TODO, doesn't actually post comments
- `handleDelete` → has TODO, doesn't actually delete comments

### What You Need to Fix:

#### 1. Fix the useEffect (around line 42-49):

```javascript
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
```

#### 2. Fix handleSubmit (around line 63-68):

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newComment.trim()) return;

  try {
    const comment = await createComment(storyId, { content: newComment });
    setComments([comment, ...comments]); // Add new comment to top
    setNewComment("");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to add comment");
  }
};
```

#### 3. Fix handleDelete (around line 83-87):

```javascript
const handleDelete = async (commentId) => {
  try {
    await deleteComment(commentId);
    setComments(comments.filter((c) => c._id !== commentId));
  } catch (err) {
    setError(err.response?.data?.message || "Failed to delete comment");
  }
};
```

---

try {
const comment = await createComment(storyId, { content: newComment });
setComments([...comments, comment]); // or [comment, ...comments] for newest first
setNewComment("");
} catch (err) {
setError(err.response?.data?.message || "Failed to add comment");
}
};

````

### Handle Delete

```javascript
const handleDelete = async (commentId) => {
  try {
    await deleteComment(commentId);
    setComments(comments.filter((c) => c._id !== commentId));
  } catch (err) {
    setError(err.response?.data?.message || "Failed to delete comment");
  }
};
````

---

## Component Breakdown

### Comment Form (only for logged-in users)

```jsx
{
  isAuthenticated ? (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit" disabled={!newComment.trim()}>
        Post Comment
      </button>
    </form>
  ) : (
    <p>Log in to leave a comment.</p>
  );
}
```

### Comments List

```jsx
{
  comments.map((comment) => (
    <div key={comment._id} className="comment">
      <span>{comment.author?.username}</span>
      <p>{comment.content}</p>

      {/* Only show delete for own comments */}
      {user?._id === comment.author?._id && (
        <button onClick={() => handleDelete(comment._id)}>Delete</button>
      )}
    </div>
  ));
}
```

---

## Checklist

### Comment Service

- [ ] `getCommentsByStory` returns array of comments
- [ ] `createComment` creates and returns new comment
- [ ] `deleteComment` removes comment

### Comment Section Component

- [ ] Loads comments when story page opens
- [ ] Shows loading state while fetching
- [ ] Displays all comments with author and content
- [ ] Form appears for logged-in users
- [ ] New comment appears after posting
- [ ] Delete button only shows for own comments
- [ ] Delete removes comment from list

---

## Testing

1. Open a story page
2. Check comments load (or show "No comments yet")
3. Log in and post a comment
4. Verify it appears in the list
5. Delete your comment
6. Try to delete someone else's comment (should not have delete button)

---

## Tips

- The `storyId` comes as a prop: `function CommentSection({ storyId })`
- Use `?.` optional chaining: `comment.author?.username`
- Add new comments to the beginning of array for "newest first"
- Check DevTools Network tab if API calls fail
