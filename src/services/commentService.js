/**
 * Comment Service
 * 🟣 TITO's Task (Part of Comment Section - Size: M)
 *
 * Handles all comment-related API calls.
 */

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
