import React, { useState } from "react";
import axios from "axios";

function TimeSlotForm() {
  const [equipmentId, setEquipmentId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTimeSlot = {
      equipment_id: equipmentId,
      start_time: startTime,
      end_time: endTime,
    };

    axios
      .post("http://127.0.0.1:8000/time-slots/", newTimeSlot)
      .then((response) => {
        alert("Временной слот добавлен успешно!");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении временного слота:", error);
      });
  };

  return (
    <div>
      <h1>Добавить временной слот</h1>
      <form onSubmit={handleSubmit}>
        <label>ID оборудования:</label>
        <input
          type="text"
          value={equipmentId}
          onChange={(e) => setEquipmentId(e.target.value)}
          required
        />
        <br />
        <label>Время начала:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <br />
        <label>Время окончания:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <br />
        <button type="submit">Добавить слот</button>
      </form>
    </div>
  );
}

export default TimeSlotForm;
