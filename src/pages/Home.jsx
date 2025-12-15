/**
 * Home Page
 * 🟠 CRISTAL's Task (Story Feed - Size: M)
 * 
 * Main page that displays all stories in a feed.
 */

import { useState, useEffect } from 'react';
import { getAllStories } from '../services/storyService';
import StoryCard from '../components/StoryCard';

  //Set up state
function Home() {

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



useEffect(() => {
    const fetchStories = async () => {
      try {
        // MOCK DATA - Replace this with: const response = await getAllStories(); when backend is ready
        const response = [
          {
            _id: "1",
            title: "Mock Story",
            content: "This is a test story",
            author: { username: "testuser" },
            likes: [],
            createdAt: new Date().toISOString()
          },
          {
            _id: "2",
            title: "Second Story",
            content: "Another test story",
            author: { username: "testuser2" },
            likes: [],
            createdAt: new Date().toISOString()
          }
        ];
        setStories(response);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load stories");
        setLoading(false);
      }
    };
    fetchStories();
  }, []);
  // Updates a single story when user likes it - p represents each story in the array
  const handleLikeUpdate = (updatedStory) => {
    setStories((prevStories) =>
      prevStories.map((s) =>
        s._id === updatedStory._id ? updatedStory : s
      )
    );
  };
  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className="home-page">
      <h1>Recent Stories</h1>
      {stories.length === 0 ? (
        <p className="no-stories">No stories yet. Be the first to share!</p>
      ) : (
        <div className="story-feed">
          {/* .map() automatically goes through each story one at a time */}
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onLikeUpdate={handleLikeUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default Home;
