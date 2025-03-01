from sqlalchemy.orm import Session
from . import models, schemas

# Функция для создания нового оборудования
def create_equipment(db: Session, equipment: schemas.EquipmentCreate):
    db_equipment = models.Equipment(
        name=equipment.name,
        description=equipment.description,
        availability_start=equipment.availability_start,
        availability_end=equipment.availability_end
    )
    db.add(db_equipment)
    db.commit()
    db.refresh(db_equipment)
    return db_equipment

# Функция для получения всех оборудования
def get_equipment_list(db: Session):
    return db.query(models.Equipment).all()

# Функция для создания нового временного слота
def create_time_slot(db: Session, time_slot: schemas.TimeSlotCreate):
    db_time_slot = models.TimeSlot(
        equipment_id=time_slot.equipment_id,
        start_time=time_slot.start_time,
        end_time=time_slot.end_time
    )
    db.add(db_time_slot)
    db.commit()
    db.refresh(db_time_slot)
    return db_time_slot

# Функция для получения всех временных слотов
def get_time_slots(db: Session):
    return db.query(models.TimeSlot).all()

# Функция для создания нового бронирования
def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(
        user_id=booking.user_id,
        time_slot_id=booking.time_slot_id
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking
