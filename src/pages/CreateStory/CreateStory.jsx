/**
 * Create Story Page
 * 🔴 PABLO's Task
 * 
 * Form to create a new story.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createStory, getStoryById, updateStory } from '../../services/storyService';
import './CreateStory.css';

function CreateStory() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      fetchStory();
    }
  }, [id]);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const story = await getStoryById(id);
      
      // Check if the current user is the author
      const userId = user?.id || user?._id;
      if (user && story.author._id !== userId) {
        navigate('/home');
        return;
      }

      setTitle(story.title);
      setContent(story.content);
    } catch (err) {
      setError('Failed to load story for editing');
    } finally {
      setLoading(false);
    }
  };

  // Handles the form submission for creating or updating a story.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await updateStory(id, { title, content });
        navigate(`/story/${id}`);
      } else {
        const story = await createStory({ title, content });
        navigate(`/story/${story._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} story`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-story-page">
      <h1 className="create-story-title">{isEditing ? 'Edit Your Story' : 'Share Your Story'}</h1>

      {/* Error display: shows any error message from the API or validation */}
      {error && <div className="error-message">{error}</div>}

      {/* Form for entering the story title and content. */}
      <form onSubmit={handleSubmit} className="create-story-form">
        {/* Title input field */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a title"
            required
          />
        </div>

        {/* Content textarea field */}
        <div className="form-group">
          <label htmlFor="content">Your Story</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story..."
            rows={10}
            required
            className="create-story-textarea"
          />
        </div>

        {/* Action buttons: Post/Update and Cancel */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (isEditing ? 'Updating...' : 'Posting...') : (isEditing ? 'Update' : 'Post')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(isEditing ? `/story/${id}` : '/home')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateStory;
