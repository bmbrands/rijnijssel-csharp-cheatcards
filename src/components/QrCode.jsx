import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const SITE_URL = 'https://moodle.sonsbeekmedia.nl/csharp';

// Toont een QR-code die naar de site verwijst, zodat je hem op je mobiel opent.
function QrCode() {
  return (
    <div className="qr-container">
    <div className="qr">
      <QRCodeCanvas value={SITE_URL} size={200} level="M" />
      <p className="qr-tekst">Scan om op je mobiel te openen</p>
      <p className="qr-url">{SITE_URL}</p>
    </div>
    </div>
  );
}

export default QrCode;
