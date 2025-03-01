from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    email: str
    password_hash: str  # Хешированный пароль

    class Config:
        orm_mode = True

class User(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class EquipmentCreate(BaseModel):
    name: str
    description: str

    class Config:
        orm_mode = True

class Equipment(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        orm_mode = True

class TimeSlotCreate(BaseModel):
    equipment_id: int
    start_time: str  # Время начала
    end_time: str    # Время окончания

    class Config:
        orm_mode = True

class TimeSlot(BaseModel):
    id: int
    equipment_id: int
    start_time: str  # Теперь это строка
    end_time: str    # Теперь это строка

    class Config:
        orm_mode = True


class BookingCreate(BaseModel):
    user_id: int
    time_slot_id: int

    class Config:
        orm_mode = True

class Booking(BaseModel):
    id: int
    user_id: int
    time_slot_id: int

    class Config:
        orm_mode = True
