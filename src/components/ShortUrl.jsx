import React from 'react';

// Korte, advertentievrije URL (eigen domein) om op de laptop in te typen.
// Wijzig hier als je een ander kort adres instelt op de server.
const KORTE_URL = 'basbrands.nl/cs';

function ShortUrl() {
  return (
    <div className="korte-url">
      <p className="korte-url-label">Typ dit adres in je browser:</p>
      <p className="korte-url-adres">{KORTE_URL}</p>
    </div>
  );
}

export default ShortUrl;
