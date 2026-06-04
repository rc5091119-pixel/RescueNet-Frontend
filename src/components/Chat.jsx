import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  const { roomID } = useParams();

  const [roomInfo, setRoomInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchRoomInfo();
    fetchMessages();

    const token = localStorage.getItem("token");

    const ws = new WebSocket(
      `ws://localhost:8080/ws/rooms/${roomID}?token=${token}`
    );

    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      console.log("WS Message:", msg);

      setMessages((prev) => [...prev, msg]);
    };

    ws.onclose = () => {
      console.log("WebSocket Closed");
    };

    return () => {
      ws.close();
    };
  }, [roomID]);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  async function fetchRoomInfo() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/${roomID}/info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Room Info:", data);

      setRoomInfo(data);
    } catch (err) {
      console.error("Failed to fetch room info:", err);
    }
  }

  async function fetchMessages() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/${roomID}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Messages:", data);

      setMessages(data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  }

  function sendMessage() {
    if (!wsRef.current) return;

    if (content.trim() === "") return;

    const text = content;

    wsRef.current.send(text);

    setMessages((prev) => [
      ...prev,
      {
        ID: Date.now().toString(),
        SenderName: {
          String: "Me",
          Valid: true,
        },
        Content: text,
      },
    ]);

    setContent("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚑 Rescue Group Chat</h2>

      <div
        style={{
          padding: "12px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h3>🚑 Rescue Group</h3>

        <p>
          <strong>Created By:</strong>{" "}
          {roomInfo?.CreatorName?.Valid
            ? roomInfo.CreatorName.String
            : "Unknown User"}
        </p>

        <p>
          <strong>📍 Alert Location:</strong>{" "}
          {roomInfo
            ? `${roomInfo.Latitude}, ${roomInfo.Longitude}`
            : "Loading..."}
        </p>
      </div>

      <div
        style={{
          border: "1px solid black",
          height: "400px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.ID}
            style={{
              marginBottom: "10px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "5px",
            }}
          >
            <strong>
              {msg.SenderName?.Valid
                ? msg.SenderName.String
                : msg.SenderID || "Unknown User"}
            </strong>

            <p>{msg.Content}</p>
          </div>
        ))}
        
        <div ref={messagesEndRef}></div>
      </div>

      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type message..."
        style={{
          width: "300px",
          marginRight: "10px",
        }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;