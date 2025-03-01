import React, { useState } from "react";
import axios from "axios";

function BookingForm() {
  const [userId, setUserId] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      user_id: userId,
      equipment_id: equipmentId,
      start_time: startTime,
      end_time: endTime,
    };

    axios
      .post("http://127.0.0.1:8000/bookings/", newBooking)
      .then((response) => {
        alert("Booking created successfully!");
      })
      .catch((error) => {
        console.error("There was an error creating the booking!", error);
      });
  };

  return (
    <div>
      <h1>Book Equipment</h1>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <br />
        <label>Equipment ID:</label>
        <input
          type="text"
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
          required
        />
        <br />
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <br />
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <br />
        <button type="submit">Book Equipment</button>
      </form>
    </div>
  );
}

export default BookingForm;
