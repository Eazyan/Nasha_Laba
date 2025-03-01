import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EquipmentList from "./components/EquipmentList";
import EquipmentForm from "./components/EquipmentForm";
import UserForm from "./components/UserForm";
import BookingForm from "./components/BookingForm";
import Timeline from "./components/Timeline";  // Не забудьте импортировать компонент для /timeline
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<EquipmentList />} />
          <Route path="/add-equipment" element={<EquipmentForm />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/book-equipment" element={<BookingForm />} />
          <Route path="/timeline" element={<Timeline />} />  {/* Добавьте этот маршрут */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
