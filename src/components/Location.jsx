import { useState } from "react";

function Location() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  async function handleLocation() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lat: Number(lat),
            lng: Number(lng),
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Location Updated!");
    } catch (err) {
      console.error(err);
      alert("Location Update Failed");
    }
  }

  return (
    <div>
      <h2>Update Location</h2>

      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLocation}>
        Update Location
      </button>
    </div>
  );
}

export default Location;