/**
 * Story Service
 * 🟠 CRYSTAL's Task (Part of Story Feed - Size: M)
 *
 * Handles all story-related API calls.
 */

import api from "./api";

// TODO: Get all stories
// PSEUDOCODE:
// 1. Make GET request to '/stories'
// 2. Return response.data (array of stories)

export const getAllStories = async () => {
  // TODO: GET /stories
  // TODO: Return response.data
};

// TODO: Get single story by ID
// PSEUDOCODE:
// 1. Accept id as parameter
// 2. Make GET request to `/stories/${id}`
// 3. Return response.data

export const getStoryById = async (id) => {
  // TODO: GET /stories/:id
  // TODO: Return response.data
};

// TODO: Create a new story
// PSEUDOCODE:
// 1. Accept { title, content } as parameter
// 2. Make POST request to '/stories' with the data
// 3. Return response.data

export const createStory = async (storyData) => {
  // TODO: POST /stories
  // TODO: Return response.data
};

// TODO: Update a story
// PSEUDOCODE:
// 1. Accept id and { title, content } as parameters
// 2. Make PUT request to `/stories/${id}` with the data
// 3. Return response.data

export const updateStory = async (id, storyData) => {
  // TODO: PUT /stories/:id
  // TODO: Return response.data
};

// TODO: Delete a story
// PSEUDOCODE:
// 1. Accept id as parameter
// 2. Make DELETE request to `/stories/${id}`
// 3. Return response.data

export const deleteStory = async (id) => {
  // TODO: DELETE /stories/:id
  // TODO: Return response.data
};

// TODO: Toggle like on a story
// PSEUDOCODE:
// 1. Accept id as parameter
// 2. Make POST request to `/stories/${id}/like`
// 3. Return response.data (updated story with likes)

export const toggleLike = async (id) => {
  // TODO: POST /stories/:id/like
  // TODO: Return response.data
};
