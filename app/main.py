from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import crud, schemas, database
from typing import List 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Функция для получения сессии базы данных
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем доступ с любых доменов (на проде можно указать конкретные домены)
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Маршрут для создания пользователя
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)

# Маршрут для получения всех пользователей
@app.get("/users/", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db=db)

# Маршрут для создания оборудования с временными слотами
@app.post("/equipments_with_slots/", response_model=schemas.Equipment)
def create_equipment_with_slots(equipment_data: schemas.EquipmentCreate, db: Session = Depends(get_db)):
    db_equipment = models.Equipment(
        name=equipment_data.name,
        description=equipment_data.description
    )
    
    db.add(db_equipment)
    db.commit()
    db.refresh(db_equipment)  # Получаем ID добавленного оборудования

    # Создаем временной слот для этого оборудования
    db_time_slot = models.TimeSlot(
        equipment_id=db_equipment.id,
        start_time=equipment_data.start_time,
        end_time=equipment_data.end_time
    )
    db.add(db_time_slot)

    db.commit()
    db.refresh(db_equipment)  # Обновляем оборудование снова
    return db_equipment


# Маршрут для получения всех временных слотов
@app.get("/time-slots/", response_model=List[schemas.TimeSlot])
def get_time_slots(db: Session = Depends(get_db)):
    time_slots = crud.get_time_slots(db=db)
    
    # Преобразуем datetime в строку
    for slot in time_slots:
        slot.start_time = slot.start_time.isoformat()  # Преобразуем datetime в строку
        slot.end_time = slot.end_time.isoformat()      # Преобразуем datetime в строку
    
    return time_slots


# Маршрут для создания нового бронирования
@app.post("/bookings/", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db=db, booking=booking)

# Маршрут для получения всех бронирований
@app.get("/bookings/", response_model=List[schemas.Booking])
def get_bookings(db: Session = Depends(get_db)):
    return crud.get_bookings(db=db)

@app.get("/equipments/", response_model=List[schemas.Equipment])
def get_equipment(db: Session = Depends(get_db)):
    return crud.get_equipment_list(db=db)

@app.post("/equipments/", response_model=schemas.Equipment)
def create_equipment(equipment: schemas.EquipmentCreate, db: Session = Depends(get_db)):
    return crud.create_equipment(db=db, equipment=equipment)
