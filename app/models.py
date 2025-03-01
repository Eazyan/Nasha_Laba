from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# Модель для оборудования
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

class Equipment(Base):
    __tablename__ = "equipments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    availability_start = Column(String)  # Время начала доступности
    availability_end = Column(String)    # Время окончания доступности

    # Связь с временными слотами
    time_slots = relationship("TimeSlot", back_populates="equipment")


# Модель для временных слотов
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class TimeSlot(Base):
    __tablename__ = "time_slots"

    id = Column(Integer, primary_key=True, index=True)
    equipment_id = Column(Integer, ForeignKey("equipments.id"))
    start_time = Column(String)  # Время начала
    end_time = Column(String)    # Время окончания

    # Связь с оборудованием и бронированиями
    equipment = relationship("Equipment", back_populates="time_slots")
    bookings = relationship("Booking", back_populates="time_slot")


# Модель для бронирований
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    time_slot_id = Column(Integer, ForeignKey("time_slots.id"))

    user = relationship("User", back_populates="bookings")
    time_slot = relationship("TimeSlot", back_populates="bookings")


from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

# Модель для пользователя
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)

    # Связь с бронированиями
    bookings = relationship("Booking", back_populates="user")


