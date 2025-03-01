import React, { useState } from "react";
import axios from "axios";

function EquipmentForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [availabilityStart, setAvailabilityStart] = useState("");
  const [availabilityEnd, setAvailabilityEnd] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEquipment = {
      name,
      description,
      availability_start: availabilityStart,
      availability_end: availabilityEnd,
      start_time: startTime,
      end_time: endTime,
    };

    axios
      .post("http://127.0.0.1:8000/equipments/", newEquipment)
      .then((response) => {
        alert("Оборудование добавлено!");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении оборудования", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Название:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <label>Описание:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <label>Начало доступности:</label>
      <input
        type="time"
        value={availabilityStart}
        onChange={(e) => setAvailabilityStart(e.target.value)}
        required
      />
      <br />
      <label>Конец доступности:</label>
      <input
        type="time"
        value={availabilityEnd}
        onChange={(e) => setAvailabilityEnd(e.target.value)}
        required
      />
      <br />
      <label>Начало временного слота:</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <br />
      <label>Конец временного слота:</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <br />
      <button type="submit">Добавить оборудование</button>
    </form>
  );
}

export default EquipmentForm;
