import React, { useState, useEffect } from "react";
import axios from "axios";
import './EquipmentList.css';  // Добавим стили для карточек

function EquipmentList() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    // Получаем список оборудования с сервера
    axios
      .get("http://127.0.0.1:8000/equipments/")
      .then((response) => {
        setEquipments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching equipments:", error);
      });
  }, []);

  return (
    <div className="equipment-list">
      <h1>Список оборудования</h1>
      <div className="equipment-grid">
        {equipments.map((equipment) => (
          <div className="equipment-card" key={equipment.id}>
            <div className="card-header">
              <h3>{equipment.name}</h3>
            </div>
            <div className="card-body">
              <p>{equipment.description}</p>
            </div>
            <div className="card-footer">
              <button className="book-button">Забронировать</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EquipmentList;
