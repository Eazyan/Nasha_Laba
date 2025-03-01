import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Timeline.css';

const Timeline = () => {
  const [equipments, setEquipments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // Загружаем оборудование
    axios.get('http://127.0.0.1:8000/equipments/')
      .then((response) => {
        setEquipments(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке оборудования:', error);
      });

    // Загружаем временные слоты
    axios.get('http://127.0.0.1:8000/time-slots/')
      .then((response) => {
        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке временных слотов:', error);
      });
  }, []);

  // Форматируем время в HH:MM
  const formatTime = (time) => {
    if (!time) return "00:00";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  // Функция для расчета позиции и высоты карточки бронирования
  const calculatePosition = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Переводим время в минуты с начала дня (например, с 08:00)
    const startTotalMinutes = (startHour - 8) * 60 + startMinute;
    const endTotalMinutes = (endHour - 8) * 60 + endMinute;

    const top = startTotalMinutes * 2; // 2 пикселя за минуту
    const height = (endTotalMinutes - startTotalMinutes) * 2;

    return { top, height };
  };

  return (
    <div className="timeline">
      <div className="timeline-header">
        {/* Столбцы для каждого часа с 08:00 до 23:00 */}
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} className="timeline-hour">{`${8 + i}:00`}</div>
        ))}
      </div>

      <div className="timeline-body">
        {/* Отображаем временные слоты для каждого оборудования */}
        {equipments.map((equipment, index) => {
          const startTime = formatTime(equipment.availability_start);
          const endTime = formatTime(equipment.availability_end);

          // Рассчитываем позицию и высоту карточки
          const { top, height } = calculatePosition(startTime, endTime);

          return (
            <div key={index} className="timeline-slot" style={{ top: `${top}px`, height: `${height}px` }}>
              <div className="timeline-slot-info">
                <strong>{equipment.name}</strong>
                <p>{equipment.description}</p>
                <p>{startTime} - {endTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
