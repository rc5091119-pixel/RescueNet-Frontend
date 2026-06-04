import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/my-rooms",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Rooms:", data);

      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading rooms...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Rooms</h2>

      {rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        rooms.map((roomID) => (
          <div
            key={roomID}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Room ID:</strong> {roomID}
            </p>

            <button
              onClick={() =>
                navigate(`/chat/${roomID}`)
              }
            >
              Open Chat
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Rooms;