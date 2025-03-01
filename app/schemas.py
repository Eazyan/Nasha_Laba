from pydantic import BaseModel
from typing import List, Optional


class EquipmentCreate(BaseModel):
    name: str
    description: str
    availability_start: str  # Время начала доступности
    availability_end: str    # Время окончания доступности
    start_time: str          # Время начала временного слота
    end_time: str            # Время окончания временного слота

    class Config:
        orm_mode = True

class Equipment(EquipmentCreate):
    id: int

    class Config:
        orm_mode = True


# Схема для создания временного слота
class TimeSlotCreate(BaseModel):
    equipment_id: int
    start_time: str  # Время начала
    end_time: str    # Время окончания

    class Config:
        orm_mode = True

# Схема для чтения временного слота
class TimeSlot(TimeSlotCreate):
    id: int

    class Config:
        orm_mode = True

# Схема для создания бронирования
class BookingCreate(BaseModel):
    user_id: int
    time_slot_id: int

    class Config:
        orm_mode = True

# Схема для чтения бронирования
class Booking(BookingCreate):
    id: int

    class Config:
        orm_mode = True
