import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingForm() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/time-slots/")
      .then((response) => {
        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      user_name: userName,
      time_slot_id: selectedSlot,
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
      <h1>Забронировать прибор</h1>
      <form onSubmit={handleSubmit}>
        <label>Имя:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <label>Выберите временной слот:</label>
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Выберите слот</option>
          {timeSlots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {`${slot.start_time} - ${slot.end_time}`}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Забронировать</button>
      </form>
    </div>
  );
}

export default BookingForm;
