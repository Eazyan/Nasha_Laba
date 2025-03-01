import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Timeline.css';

const Timeline = () => {
  const [bookings, setBookings] = useState([]);
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    // Загружаем бронирования
    axios.get('http://127.0.0.1:8000/bookings/')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });

    // Загружаем оборудование
    axios.get('http://127.0.0.1:8000/equipments/')
      .then((response) => {
        setEquipments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching equipment:', error);
      });
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  // Функция для расчета позиции бронирования по времени с учетом минут
  const calculateRow = (startTime, endTime) => {
    const [startHour] = startTime.split(':').map(Number); // Забираем только часы
    const [endHour] = endTime.split(':').map(Number); // Забираем только часы

    // Переводим время в минуты с начала дня
    const startTotalMinutes = startHour * 60; // Часы в минуты + минуты
    const endTotalMinutes = endHour * 60; // Часы в минуты + минуты

    return [startTotalMinutes, endTotalMinutes];
  };

  return (
    <div className="timeline">
      <table>
        <thead>
          <tr>
            {/* Столбцы для каждого часа с 08:00 до 23:00 */}
            {Array.from({ length: 16 }, (_, i) => (
              <th key={i}>{`${8 + i}:00`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Проходим по каждому бронированию */}
          {bookings.map((booking, index) => {
            const equipment = equipments.find(e => e.id === booking.equipment_id);
            const startTime = formatTime(booking.start_time.split('T')[1].slice(0, 5));
            const endTime = formatTime(booking.end_time.split('T')[1].slice(0, 5));

            const [startTotalMinutes, endTotalMinutes] = calculateRow(startTime, endTime);

            const startHour = Math.floor(startTotalMinutes / 60);  // Переводим минуты в часы
            const endHour = Math.floor(endTotalMinutes / 60);  // Переводим минуты в часы

            // Расчет colSpan с учетом минут
            const duration = endTotalMinutes - startTotalMinutes;
            const colSpan = duration <= 60 ? 1 : Math.ceil(duration / 60);  // Количество ячеек для бронирования

            return (
              <tr key={index}>
                {/* Пустые ячейки до начала бронирования */}
                {Array.from({ length: startHour - 8 }).map((_, idx) => <td key={idx}></td>)}
                
                {/* Ячейки для бронирования */}
                <td colSpan={colSpan} className="booking-cell">
                  <div className="booking-info">
                    <strong>{equipment ? equipment.name : 'Loading...'}</strong>
                    <p>{equipment ? equipment.description : 'Loading...'}</p>
                    <p>{startTime} - {endTime}</p>
                  </div>
                </td>
                
                {/* Пустые ячейки после окончания бронирования */}
                {Array.from({ length: 23 - endHour }).map((_, idx) => <td key={idx}></td>)}
                {/* Добавляем пустую ячейку для столбца 23:00 */}
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;
