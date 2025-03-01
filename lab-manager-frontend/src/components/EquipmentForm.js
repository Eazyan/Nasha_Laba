import React, { useState } from "react";
import axios from "axios";

function EquipmentForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [availabilityStart, setAvailabilityStart] = useState("");
  const [availabilityEnd, setAvailabilityEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEquipment = {
      name,
      description,
      start_time: availabilityStart,
      end_time: availabilityEnd
    };

    // Отправка данных на сервер для создания оборудования и временного слота
    axios
      .post("http://127.0.0.1:8000/equipments_with_slots/", newEquipment)
      .then((response) => {
        alert("Equipment and time slot added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the equipment and slot!", error);
      });
  };

  return (
    <div>
      <h1>Add Equipment</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <label>Availability Start:</label>
        <input
          type="time"
          value={availabilityStart}
          onChange={(e) => setAvailabilityStart(e.target.value)}
          required
        />
        <br />
        <label>Availability End:</label>
        <input
          type="time"
          value={availabilityEnd}
          onChange={(e) => setAvailabilityEnd(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Equipment</button>
      </form>
    </div>
  );
}

export default EquipmentForm;
