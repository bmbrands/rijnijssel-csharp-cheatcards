import React from 'react';
import Card from './Card';

function CardGrid({ kaarten, onOpen }) {
  return (
    <div className="kaart-grid">
      {kaarten.map((kaart) => (
        <Card key={kaart.id} kaart={kaart} onOpen={onOpen} />
      ))}
    </div>
  );
}

export default CardGrid;
