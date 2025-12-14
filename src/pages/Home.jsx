/**
 * Home Page
 * 🟠 CRYSTAL's Task (Story Feed - Size: M)
 * 
 * Main page that displays all stories in a feed.
 */

import { useState, useEffect } from 'react';
import { getAllStories } from '../services/storyService';
import StoryCard from '../components/StoryCard';

function Home() {
  // TODO: Set up state
  // PSEUDOCODE:
  // - stories: [] (array of story objects)
  // - loading: true (show loading indicator)
  // - error: null (display any errors)

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // TODO: Fetch stories on mount
  // PSEUDOCODE:
  // useEffect(() => {
  //   1. Define async function fetchStories:
  //      - Try: call getAllStories()
  //      - setStories with the result
  //      - Catch: setError with error message
  //      - Finally: setLoading(false)
  //   2. Call fetchStories()
  // }, [])

  useEffect(() => {
    const fetchStories = async () => {
      // TODO: Try getAllStories()
      // TODO: setStories with result
      // TODO: Catch and setError
      // TODO: Finally setLoading(false)
    };

    fetchStories();
  }, []);


  // TODO: Handle like update from StoryCard
  // PSEUDOCODE:
  // 1. Receive updated story from child component
  // 2. Update the story in the stories array
  // setStories(stories.map(s => s._id === updatedStory._id ? updatedStory : s))

  const handleLikeUpdate = (updatedStory) => {
    // TODO: Update story in state
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
