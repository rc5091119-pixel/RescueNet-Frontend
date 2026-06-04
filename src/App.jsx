import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Location from "./components/Location";
import CreateAlert from "./components/CreateAlert";
import Notifications from "./components/Notifications";
import Rooms from "./components/Rooms";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <Link to="/register">Register</Link>{" "}
        | <Link to="/login">Login</Link>{" "}
        | <Link to="/location">Location</Link>{" "}
        | <Link to="/create-alert">Create Alert</Link>{" "}
        | <Link to="/notifications">Notifications</Link>{" "}
        | <Link to="/rooms">Rooms</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/location" element={<Location />} />
        <Route path="/create-alert" element={<CreateAlert />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/chat/:roomID" element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;