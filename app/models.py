from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# Модель для пользователя
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)  # Хешированный пароль

    bookings = relationship("Booking", back_populates="user")  # Связь с бронированиями

class Equipment(Base):
    __tablename__ = "equipments"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)

    time_slots = relationship("TimeSlot", back_populates="equipment")  # Связь с временными слотами

class TimeSlot(Base):
    __tablename__ = "time_slots"
    
    id = Column(Integer, primary_key=True, index=True)
    equipment_id = Column(Integer, ForeignKey("equipments.id"))
    start_time = Column(String)  # Время начала
    end_time = Column(String)  # Время окончания
    
    equipment = relationship("Equipment", back_populates="time_slots")
    bookings = relationship("Booking", back_populates="time_slot")  # Связь с бронированиями


# Модель для бронирований
class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    time_slot_id = Column(Integer, ForeignKey("time_slots.id"))
    
    user = relationship("User", back_populates="bookings")  # Связь с пользователем
    time_slot = relationship("TimeSlot", back_populates="bookings")  # Связь с временным слотом
