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



  // Fetch stories on mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        //const response = await getAllStories();
        //console.log("Stories response:", response);
        const response = [
        { _id: "1", title: "Mock Story", content: "This is a test story", author: { username: "testuser" }, likes: [], createdAt: new Date() }
      ];
        setStories(response); // make sure this is an array
      } catch (err) {
        console.error(err);
        setError("Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);



  // Handle like update from StoryCard
 const handleLikeUpdate = (updatedStory) => {
    setStories((prevStories) =>
      prevStories.map((s) =>
        s._id === updatedStory._id ? updatedStory : s
      )
    );
  };


  // Loading state
  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }

  // Error state
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
