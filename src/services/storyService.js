/**
 * Story Service
 * 🟠 CRISTAL's Task (Part of Story Feed - Size: M)
 *
 * Handles all story-related API calls.
 */

import api from "./api";

// Get all stories

export const getAllStories = async () => {
  const res = await api.get("/stories");
  return res.data;
};

// Get single story by ID

export const getStoryById = async (id) => {
  const res = await api.get(`/stories/${id}`);
  return res.data;
};

// Create a new story

export const createStory = async (storyData) => {
  const res = await api.post("/stories", storyData);
  return res.data;
};

// Update a story

export const updateStory = async (id, storyData) => {
  const res = await api.put(`/stories/${id}`, storyData);
  return res.data;
};

// Delete a story

export const deleteStory = async (id) => {
  const res = await api.delete(`/stories/${id}`);
  return res.data;
};

//Toggle like on a story

export const toggleLike = async (id) => {
  const res = await api.put(`/stories/${id}/like`);
  return res.data;
};
