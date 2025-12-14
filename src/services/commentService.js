/**
 * Comment Service
 * 🟣 TITO's Task (Part of Comment Section - Size: M)
 *
 * Handles all comment-related API calls.
 */

import api from "./api";

// TODO: Get all comments for a story
// PSEUDOCODE:
// 1. Accept storyId as parameter
// 2. Make GET request to `/stories/${storyId}/comments`
// 3. Return response.data (array of comments)

export const getCommentsByStory = async (storyId) => {
  // TODO: GET /stories/:storyId/comments
  // TODO: Return response.data
};

// TODO: Create a new comment
// PSEUDOCODE:
// 1. Accept storyId and { content } as parameters
// 2. Make POST request to `/stories/${storyId}/comments` with content
// 3. Return response.data (the new comment)

export const createComment = async (storyId, commentData) => {
  // TODO: POST /stories/:storyId/comments
  // TODO: Return response.data
};

// TODO: Delete a comment
// PSEUDOCODE:
// 1. Accept commentId as parameter
// 2. Make DELETE request to `/comments/${commentId}`
// 3. Return response.data

export const deleteComment = async (commentId) => {
  // TODO: DELETE /comments/:commentId
  // TODO: Return response.data
};
