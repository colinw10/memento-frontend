# Home.jsx - What You Need

## Run This First

```bash
npm install
```

---

## Your Imports

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useAuth } from "../context/AuthContext";
import { getAllStories, toggleLike } from "../services/storyService";
import StoryCard from "../components/StoryCard";
import "../styles/Home.css";
```

---

## Your State

```jsx
const { isAuthenticated } = useAuth();
const [stories, setStories] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [init, setInit] = useState(false);
```

---

## Logic

1. If NOT authenticated → show landing page
2. If authenticated → fetch stories and show feed

---

## CSS Classes to Use

| Class               | Use For                |
| ------------------- | ---------------------- |
| `.home`             | Main container         |
| `.landing`          | Landing wrapper        |
| `.landing-content`  | Content inside landing |
| `.landing-title`    | "Memento" title        |
| `.landing-subtitle` | Tagline                |
| `.landing-actions`  | Buttons                |
| `.home-title`       | "Recent Stories"       |
| `.stories-list`     | Story cards container  |
| `.home-empty`       | Empty state            |
| `.empty-text`       | Empty message          |

---

## StoryService Exports Needed

```jsx
export const getAllStories = async () => { ... }
export const toggleLike = async (storyId) => { ... }
```

---



---

## Questions?

Let me know if anything is unclear or if you need help with integration!
