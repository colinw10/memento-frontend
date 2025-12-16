/**
 * Home Page (Story Feed)
 * 🟠 CRISTAL - Story feed for authenticated users
 */

import { useState, useEffect } from 'react';
import { getAllStories, toggleLike } from '../../services/storyService';
import StoryCard from '../../components/StoryCard/StoryCard';
import './Home.css';

function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



useEffect(() => { 
  fetchStories();
 }, []); 
 
 const fetchStories = async () => { 
  setLoading(true); 
  try { 
    const data = await getAllStories();
      setStories(data); 
    } catch (err) { 
      setError('Failed to load stories'); 
    } finally { 
      setLoading(false); 
    } 
  }; 
  
  const handleLike = async (storyId) => { 
    try { 
      const updatedStory = await toggleLike(storyId); 
      setStories(stories.map(story => story._id === storyId ? updatedStory : story ));
     } catch (err) { 
      console.error('Failed to like story:', err); 
    } 
  };

  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
return ( 
  <div className="home"> 
    <h1 className="home-title">Recent Stories</h1> 
    
    {stories.length === 0 ? ( 
      <div className="home-empty"> 
        <div className="empty-icon"> 
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5"> 
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10"/>
             </svg>
              </div> 
              <p className="empty-text">Nothing here yet</p> 
              <p className="empty-subtext">Be the first to share a moment</p>
               </div>
             ) : ( 
              <div className="stories-list">
                 {stories.map((story, index) => ( 
                  <StoryCard 
                  key={story._id} 
                  story={story} 
                  onLike={handleLike} 
                  index={index} 
                />
              ))} 
            </div> 
            )} 
          </div> ); }
export default Home;
