import React from "react";

const KitModal = ({ kit, onClose }) => (
  <div className="kit-modal">
    <h3>{kit.name}</h3>
    <p>Location: {kit.location}</p>
    <p>Address: {kit.address}</p>
    {/* Add more details as needed */}
    <button onClick={onClose}>Close</button>
  </div>
);

export default KitModal;
