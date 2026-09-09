import React, { useState } from 'react';
import kaarten from './data/cards';
import CardGrid from './components/CardGrid';
import CardDetail from './components/CardDetail';
import QrCode from './components/QrCode';

function App() {
  const [gekozenKaart, setGekozenKaart] = useState(null);
  const toonQr = new URLSearchParams(window.location.search).get('showqr') === '1';

  return (
    <div className="app">
      <header className="app-kop">
        <h1>C# onderwerpen</h1>
        <p className="app-uitleg">
          Klik op een kaart voor een korte uitleg en een voorbeeld.
        </p>
      </header>

      <main>
        <CardGrid kaarten={kaarten} onOpen={setGekozenKaart} />
      </main>

      {toonQr && <QrCode />}

      {gekozenKaart && (
        <CardDetail kaart={gekozenKaart} onClose={() => setGekozenKaart(null)} />
      )}
    </div>
  );
}

export default App;
