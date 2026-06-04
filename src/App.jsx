import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Location from "./components/Location";
import CreateAlert from "./components/CreateAlert";
import Notifications from "./components/Notifications";
import Rooms from "./components/Rooms";
import Chat from "./components/Chat";

function App() {
  const userName = localStorage.getItem("user_name");

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
  };

  return (
    <BrowserRouter>
      <nav
        style={{
          backgroundColor: "#0f172a",
          color: "white",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          🚑 RescueNet
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "25px",
            alignItems: "center",
          }}
        >
          <Link
            to="/location"
            style={navLinkStyle}
          >
            📍 Location
          </Link>

          <Link
            to="/create-alert"
            style={navLinkStyle}
          >
            🚨 Alert
          </Link>

          <Link
            to="/notifications"
            style={navLinkStyle}
          >
            🔔 Notifications
          </Link>

          <Link
            to="/rooms"
            style={navLinkStyle}
          >
            👥 Groups
          </Link>
        </div>

        {/* User */}
        <div
          style={{
            fontWeight: "500",
          }}
        >
          {userName || "Guest"}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/location"
          element={<Location />}
        />

        <Route
          path="/create-alert"
          element={<CreateAlert />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        <Route
          path="/chat/:roomID"
          element={<Chat />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;