import React from 'react';
import './EquipmentDetails.css';

const EquipmentDetails = ({ equipment, closeModal }) => {
    if (!equipment) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{equipment.name}</h2>
                <p>{equipment.description}</p>
                <p><strong>Availability:</strong> {equipment.availability_start} to {equipment.availability_end}</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default EquipmentDetails;
