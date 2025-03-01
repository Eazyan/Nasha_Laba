from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import crud, schemas, database, models
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Функция для получения сессии базы данных
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Маршрут для создания нового оборудования
@app.post("/equipments/", response_model=schemas.Equipment)
def create_equipment(equipment: schemas.EquipmentCreate, db: Session = Depends(get_db)):
    return crud.create_equipment(db=db, equipment=equipment)

# Маршрут для получения списка оборудования
@app.get("/equipments/", response_model=List[schemas.Equipment])
def get_equipment(db: Session = Depends(get_db)):
    return crud.get_equipment_list(db=db)

# Маршрут для создания нового временного слота
@app.post("/time-slots/", response_model=schemas.TimeSlot)
def create_time_slot(time_slot: schemas.TimeSlotCreate, db: Session = Depends(get_db)):
    return crud.create_time_slot(db=db, time_slot=time_slot)

# Маршрут для получения всех временных слотов
@app.get("/time-slots/", response_model=List[schemas.TimeSlot])
def get_time_slots(db: Session = Depends(get_db)):
    return crud.get_time_slots(db=db)

# Маршрут для создания нового бронирования
@app.post("/bookings/", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db=db, booking=booking)

@app.post("/equipments_with_slots/", response_model=schemas.Equipment)
def create_equipment_with_slots(equipment_data: schemas.EquipmentCreate, db: Session = Depends(get_db)):
    db_equipment = models.Equipment(
        name=equipment_data.name,
        description=equipment_data.description,
        availability_start=equipment_data.availability_start,
        availability_end=equipment_data.availability_end
    )

    db.add(db_equipment)
    db.commit()
    db.refresh(db_equipment)

    # Создание временного слота для этого оборудования
    db_time_slot = models.TimeSlot(
        equipment_id=db_equipment.id,
        start_time=equipment_data.start_time,
        end_time=equipment_data.end_time
    )
    db.add(db_time_slot)

    db.commit()
    db.refresh(db_equipment)
    return db_equipment
