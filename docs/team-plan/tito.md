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
# Tito's Tasks - Comment Section (Frontend)

## Status: INCOMPLETE — implement yourself

You're responsible for implementing the comment feature end-to-end on the frontend. The codebase currently contains a working implementation, but this task must be completed by you so you show participation.

Total time: 2-3 hours

---

## Goal
Implement comment fetching, creation, and deletion for story pages using the existing backend routes.

Files to implement:
- `src/services/commentService.js`
- `src/components/CommentSection.jsx`

## Required API functions (service)
Implement these three functions in `src/services/commentService.js`:

1. `getCommentsByStory(storyId)` — GET `/stories/:storyId/comments` → return `res.data`
2. `createComment(storyId, commentData)` — POST `/stories/:storyId/comments` → return `res.data`
3. `deleteComment(commentId)` — DELETE `/comments/:commentId` → return `res.data`

Example (pseudocode):
```

const res = await api.get(`/stories/${storyId}/comments`)
return res.data

```

## Component behavior (`src/components/CommentSection.jsx`)

1. On mount (or when `storyId` changes) fetch comments and show loading state.
2. Display comments (author username, date, content). If none, show "No comments yet".
3. If the user is authenticated, show a textarea + Post button. Posting should call `createComment`, prepend the returned comment to the comments array, and clear the input.
4. Show a Delete button only on comments authored by the current user. Deleting should call `deleteComment` and remove the comment from state.

Pseudocode examples:
```

useEffect(() => {
setLoading(true)
try { setComments(await getCommentsByStory(storyId)) }
finally { setLoading(false) }
}, [storyId])

const handleSubmit = async (e) => {
e.preventDefault()
if (!newComment.trim()) return
const comment = await createComment(storyId, { content: newComment })
setComments([comment, ...comments])
}

const handleDelete = async (id) => {
await deleteComment(id)
setComments(comments.filter(c => c.\_id !== id))
}

```

## Acceptance criteria
- Comments load when opening a story page (or show a clear empty state).
- Authenticated users can post comments; the new comment appears immediately.
- Users can delete only their own comments and the list updates after deletion.
- Errors show a brief message (e.g. `Failed to load comments`).

---

## How we'll validate
1. Open a story page — comments load.
2. Login as a user and post a comment — it appears.
3. Delete your comment — it disappears.

If Tito completes this, update the checklist and mark it done.
```
