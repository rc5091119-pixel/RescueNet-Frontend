import { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Notifications:", data);

      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  async function acceptAlert(alertID) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/alerts/${alertID}/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || data.message || "Failed to accept alert");
        return;
      }

      alert(data.message);

      fetchNotifications();
    } catch (err) {
      console.error("Accept alert failed:", err);
      alert("Failed to accept alert");
    }
  }

  if (loading) {
    return <h2>Loading notifications...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.ID}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <p>
              <strong>Notification ID:</strong> {notification.ID}
            </p>

            <p>
              <strong>Alert ID:</strong> {notification.AlertID}
            </p>

            <p>
              <strong>Status:</strong> {notification.Status}
            </p>

            <p>
              <strong>Created By:</strong>{" "}
              {notification.CreatorName?.Valid
              ? notification.CreatorName.String
              : "Unknown User"}
            </p>

            <button
              disabled={notification.Status === "accepted"}
              onClick={() => acceptAlert(notification.AlertID)}
            >
              {notification.Status === "accepted"
                ? "Accepted"
                : "Accept Alert"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;