from sqlalchemy.orm import Session
from . import models, schemas

# Создание нового пользователя
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=user.password_hash  # Хешированный пароль
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Получение всех пользователей
def get_users(db: Session):
    return db.query(models.User).all()

def create_equipment_with_slots(db: Session, equipment_data: dict, slots: list):
    db_equipment = models.Equipment(
        name=equipment_data["name"],
        description=equipment_data["description"]
    )
    
    db.add(db_equipment)
    db.commit()  # Сначала сохраняем оборудование
    db.refresh(db_equipment)  # Обновляем данные оборудования (получаем его ID)

    # Создание временных слотов для этого оборудования
    for slot in slots:
        db_time_slot = models.TimeSlot(
            equipment_id=db_equipment.id,
            start_time=slot["start_time"],
            end_time=slot["end_time"]
        )
        db.add(db_time_slot)

    db.commit()  # Сохраняем временные слоты
    db.refresh(db_equipment)  # Обновляем оборудование снова
    return db_equipment


# Получение всех временных слотов
def get_time_slots(db: Session):
    time_slots = db.query(models.TimeSlot).all()
    return time_slots

def get_equipment_list(db: Session):
    return db.query(models.Equipment).all()

# Получение всех бронирований
def get_bookings(db: Session):
    return db.query(models.Booking).all()

# Создание нового бронирования
def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(
        user_id=booking.user_id,
        time_slot_id=booking.time_slot_id
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def create_equipment(db: Session, equipment: schemas.EquipmentCreate):
    db_equipment = models.Equipment(
        name=equipment.name,
        description=equipment.description
    )
    db.add(db_equipment)
    db.commit()
    db.refresh(db_equipment)
    return db_equipment

