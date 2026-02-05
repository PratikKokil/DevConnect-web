import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ProfileView from "./components/ProfileView";

function App() {
  const user = useSelector((store) => store.user);

  return (
    <BrowserRouter>
      <Routes>

        {/* Login route */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        {/* App layout */}
        <Route path="/" element={<Body />}>
          <Route
            index
            element={user ? <Feed /> : <Navigate to="/login" replace />}
          />
          <Route
            path="profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="connections"
            element={user ? <Connections /> : <Navigate to="/login" replace />}
          />
          <Route
            path="requests"
            element={user ? <Requests /> : <Navigate to="/login" replace />}
          />
          <Route
            path="view/profile/:id"
            element={user ? <ProfileView /> : <Navigate to="/login" replace />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
