import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import StoryDetail from './pages/StoryDetail/StoryDetail.jsx';
import CreateStory from './pages/CreateStory/CreateStory.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const location = useLocation();
  const hideNavbar = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateStory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
