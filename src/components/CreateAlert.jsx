function CreateAlert() {
  async function handleAlert() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/alerts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Alert Created!");
    } catch (err) {
      console.error(err);
      alert("Failed to Create Alert");
    }
  }

  return (
    <div>
      <h2>Create Alert</h2>

      <button onClick={handleAlert}>
        Send Emergency Alert
      </button>
    </div>
  );
}

export default CreateAlert;