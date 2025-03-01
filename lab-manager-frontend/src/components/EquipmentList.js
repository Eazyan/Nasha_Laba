import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EquipmentDetails from './EquipmentDetails';
import './EquipmentList.css';

const EquipmentList = () => {
    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/equipments/')
            .then(response => {
                setEquipments(response.data);
            })
            .catch(error => {
                setError('Error fetching data');
                console.error(error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/equipments/${id}/`)
            .then(response => {
                setEquipments(equipments.filter(equipment => equipment.id !== id));
            })
            .catch(error => {
                console.error('Error deleting equipment', error);
            });
    };

    const handleDetails = (equipment) => {
        setSelectedEquipment(equipment);
    };

    const closeModal = () => {
        setSelectedEquipment(null);
    };

    return (
        <div className="equipment-list">
            {error && <p>{error}</p>}
            <h2>Available Equipment</h2>
            <div className="equipment-cards">
                {equipments.map(equipment => (
                    <div key={equipment.id} className="equipment-card">
                        <h3>{equipment.name}</h3>
                        <p>{equipment.description}</p>
                        <button onClick={() => handleDetails(equipment)}>Details</button>
                        <button onClick={() => handleDelete(equipment.id)}>Delete</button>
                    </div>
                ))}
            </div>

            <EquipmentDetails equipment={selectedEquipment} closeModal={closeModal} />
        </div>
    );
};

export default EquipmentList;
