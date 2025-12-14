# Crystal's Tasks - Frontend Components

## Overview

You're building the frontend experience! Your tasks focus on the service layer and core UI components.

**Total Time Estimate: 5-6 hours**

---

## Task 1: API Service Layer (Size: S)

**File:** `src/services/api.js`

### What You're Building

A configured axios instance that automatically attaches JWT tokens to requests.

### Steps

1. **Create axios instance**

   ```javascript
   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
     headers: {
       "Content-Type": "application/json",
     },
   });
   ```

2. **Add request interceptor**

   - Get token from `localStorage.getItem('token')`
   - If token exists, add `Authorization: Bearer ${token}` header
   - Return config

3. **Add response interceptor**
   - On 401 error, clear localStorage token
   - Return rejected promise for errors

### Testing

Open browser console and check network requests have Authorization header.

---

## Task 2: Auth Forms (Size: M)

**Files:**

- `src/services/authService.js`
- `src/context/AuthContext.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/pages/Login.jsx`
- `src/pages/Signup.jsx`

### What You're Building

Complete authentication flow - signup, login, logout, and protected routes.

### Steps

#### authService.js

1. `signup(userData)` - POST to `/auth/signup`
2. `login(credentials)` - POST to `/auth/login`
3. `verifyToken()` - GET to `/auth/verify`

#### AuthContext.jsx

1. State: `user`, `loading`, `error`
2. On mount: Check for token, verify if exists
3. `login()`: Call API, store token, set user
4. `signup()`: Call API, store token, set user
5. `logout()`: Clear token, clear user

#### ProtectedRoute.jsx

1. Check `isAuthenticated` from context
2. If not authenticated, `<Navigate to="/login" />`
3. If authenticated, render children

#### Login.jsx & Signup.jsx

1. Form state for inputs
2. Call auth context methods
3. Navigate to `/` on success
4. Display errors

### Testing

```bash
# Try signup with new user
# Try login with existing user
# Check token in localStorage
# Refresh page - should stay logged in
# Logout - token should be gone
```

---

## Task 3: Story Feed (Size: M)

**Files:**

- `src/services/storyService.js`
- `src/components/StoryCard.jsx`
- `src/pages/Home.jsx`

### What You're Building

The main feed showing all stories with like functionality.

### Steps

#### storyService.js

Implement all the API calls:

- `getAllStories()` - GET `/stories`
- `getStoryById(id)` - GET `/stories/:id`
- `createStory(data)` - POST `/stories`
- `updateStory(id, data)` - PUT `/stories/:id`
- `deleteStory(id)` - DELETE `/stories/:id`
- `toggleLike(id)` - POST `/stories/:id/like`

#### Home.jsx

1. Fetch stories on mount using `useEffect`
2. Store in state
3. Map over stories, render `StoryCard` for each
4. Pass `onLikeUpdate` handler to update state after like

#### StoryCard.jsx

1. Display story title, preview, author, date
2. Check if current user has liked (`story.likes.includes(user._id)`)
3. Like button calls `toggleLike`, updates parent via `onLikeUpdate`

### Testing

```bash
# Load home page - should see stories
# Click like - count should update
# Like again - should toggle off
```

---

## Checklist

### API Service

- [ ] Axios instance created with baseURL
- [ ] Request interceptor adds token
- [ ] Response interceptor handles 401

### Auth Forms

- [ ] authService functions work
- [ ] AuthContext provides user state
- [ ] Login form works
- [ ] Signup form works
- [ ] ProtectedRoute redirects correctly
- [ ] Token persists on refresh

### Story Feed

- [ ] storyService functions work
- [ ] Home page loads stories
- [ ] StoryCard displays correctly
- [ ] Like toggle works

---

## Tips

- Use `try/catch` for all async calls
- Check the Network tab in DevTools to debug API calls
- Console.log liberally while developing
- Ask for help if stuck!
