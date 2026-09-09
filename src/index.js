import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// PWA: registreer de service worker (alleen in de productiebuild).
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then((registratie) => {
      // Controleer bij elk bezoek of er een nieuwe versie klaarstaat.
      registratie.update();
    });

    // Herlaad eenmalig zodra een nieuwe service worker de controle overneemt,
    // zodat nieuwe kaarten meteen zichtbaar zijn.
    let herladen = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (herladen) return;
      herladen = true;
      window.location.reload();
    });
  });
}
