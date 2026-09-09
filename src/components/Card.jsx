import React from 'react';

// De achterkant van een kaart. Toont alleen het onderwerp.
function Card({ kaart, onOpen }) {
  return (
    <button
      type="button"
      className="kaart"
      onClick={() => onOpen(kaart)}
    >
      <span className="kaart-label">{kaart.label}</span>
    </button>
  );
}

export default Card;
