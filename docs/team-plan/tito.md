# Tito's Tasks - Comment Section (Frontend)

## Overview

You're building the comment system for the frontend! This connects to your backend comment routes.

**Total Time Estimate: 2-3 hours**

---

## Task: Comment Section Component (Size: M)

**Files:**

- `src/services/commentService.js`
- `src/components/CommentSection.jsx`

### What You're Building

A component that shows comments on a story and lets users add/delete comments.

---

## Step 1: Comment Service

**File:** `src/services/commentService.js`

### Functions to Implement

```javascript
// Get all comments for a story
export const getCommentsByStory = async (storyId) => {
  // GET /stories/:storyId/comments
  // Return response.data
};

// Create a new comment
export const createComment = async (storyId, commentData) => {
  // POST /stories/:storyId/comments
  // Send { content: commentData.content }
  // Return response.data
};

// Delete a comment
export const deleteComment = async (commentId) => {
  // DELETE /comments/:commentId
  // Return response.data
};
```

### Testing the Service

```javascript
// In browser console (after import):
const comments = await getCommentsByStory("some-story-id");
console.log(comments);
```

---

## Step 2: Comment Section Component

**File:** `src/components/CommentSection.jsx`

### State You Need

```javascript
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### Fetch Comments on Mount

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

### Handle Submit

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!newComment.trim()) return;

  try {
    const comment = await createComment(storyId, { content: newComment });
    setComments([...comments, comment]); // or [comment, ...comments] for newest first
    setNewComment("");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to add comment");
  }
};
```

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
```

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
