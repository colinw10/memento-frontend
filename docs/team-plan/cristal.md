# Cristal's Tasks - Frontend Components

## Overview

You're building the frontend experience! Your tasks focus on the service layer and core UI components.

**Total Time Estimate: 5-6 hours**

---

## ⚠️ CURRENT STATUS - WHAT'S DONE vs WHAT NEEDS WORK

### ✅ COMPLETED:

- `src/services/api.js` - Axios instance with interceptors (DONE)
- `src/services/authService.js` - Auth API calls (DONE)
- `src/services/storyService.js` - Story API calls (DONE)
- `src/context/AuthContext.jsx` - Auth state management (DONE)
- `src/components/ProtectedRoute.jsx` - Route protection (DONE)

### ⚠️ NEEDS ATTENTION:

- `src/pages/Home/Home.jsx` - Currently has landing page logic mixed in. The feed part works but you may need to test it with the backend.
- `src/components/StoryCard/StoryCard.jsx` - Works but uses `onLikeUpdate` prop, make sure your Home.jsx passes the right handler.

### 📁 FILE LOCATIONS CHANGED:

Files have been moved to folders:

- `src/pages/Home.jsx` → `src/pages/Home/Home.jsx`
- `src/pages/Login.jsx` → `src/pages/Login/Login.jsx`
- `src/pages/Signup.jsx` → `src/pages/Signup/Signup.jsx`
- `src/components/StoryCard.jsx` → `src/components/StoryCard/StoryCard.jsx`

### 🛣️ ROUTING CHANGE:

- `/` now shows the Landing page (particles, login/signup buttons)
- `/home` shows the story feed (your Home.jsx)
- After login, users should be redirected to `/home` (not `/`)

---

## Task 1: API Service Layer (Size: S) ✅ DONE

**File:** `src/services/api.js`

This is complete! The axios instance has:

- baseURL configured
- Request interceptor that adds JWT token
- Response interceptor that handles 401 errors

---

## Task 2: Auth Forms (Size: M) ✅ MOSTLY DONE

**Files:**

- `src/services/authService.js` ✅
- `src/context/AuthContext.jsx` ✅
- `src/components/ProtectedRoute.jsx` ✅
- `src/pages/Login/Login.jsx` ✅
- `src/pages/Signup/Signup.jsx` ✅

### ⚠️ ONE THING TO CHECK:

Make sure Login.jsx redirects to `/home` after successful login (not `/`):

```javascript
navigate("/home"); // NOT navigate("/")
```

---

## Task 3: Story Feed (Size: M) ⚠️ NEEDS TESTING

**Files:**

- `src/services/storyService.js` ✅ DONE
- `src/components/StoryCard/StoryCard.jsx` ✅ DONE
- `src/pages/Home/Home.jsx` ⚠️ NEEDS TESTING

### What's Done:

- storyService.js has all API calls implemented
- StoryCard.jsx displays stories with like button

### What You Need to Verify:

#### Home.jsx - Check the like handler matches StoryCard's expected prop:

StoryCard expects `onLikeUpdate` prop:

```javascript
<StoryCard
  key={story._id}
  story={story}
  onLikeUpdate={handleLikeUpdate} // Make sure this matches!
/>
```

The current Home.jsx may be passing `onLike` instead. Check and fix if needed.

#### Test with Backend:

1. Run the backend server
2. Create a test story
3. Verify stories load on `/home`
4. Test like/unlike functionality

---
