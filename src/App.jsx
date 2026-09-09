import React, { useState, useCallback, useRef } from 'react';
import kaarten from './data/cards';
import CardGrid from './components/CardGrid';
import CardDetail from './components/CardDetail';
import QrCode from './components/QrCode';
import ShortUrl from './components/ShortUrl';
import GameResult from './components/GameResult';

const normaliseer = (tekst) => (tekst || '').trim().toLowerCase();

function App() {
  const [gekozenKaart, setGekozenKaart] = useState(null);
  const [game, setGame] = useState(null);
  const [laadStatus, setLaadStatus] = useState('idle');
  const [gameActief, setGameActief] = useState(false);
  const [vraagIndex, setVraagIndex] = useState(0);
  const [uitslag, setUitslag] = useState(null);

  // Ref houdt de voortgang direct bij, ook bij snelle klikken achter elkaar.
  const voortgang = useRef({ index: 0, goed: 0 });

  const toonQr = new URLSearchParams(window.location.search).get('showqr') === '1';
  const toonUrl = new URLSearchParams(window.location.search).get('showurl') === '1';

  const haalGame = useCallback(async () => {
    setLaadStatus('laden');
    try {
      // Cache-buster zodat een nieuw geupload gamebestand meteen wordt opgehaald.
      const res = await fetch(`game.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) {
        setGame(null);
        setLaadStatus('geen');
        return;
      }
      const data = await res.json();
      const vragen = Array.isArray(data.vragen) ? data.vragen.slice(0, 10) : [];
      if (vragen.length === 0) {
        setGame(null);
        setLaadStatus('geen');
        return;
      }
      setGame({ nummer: data.nummer, vragen });
      setLaadStatus('gevonden');
    } catch (e) {
      setGame(null);
      setLaadStatus('fout');
    }
  }, []);

  const startGame = () => {
    setGekozenKaart(null);
    setUitslag(null);
    voortgang.current = { index: 0, goed: 0 };
    setVraagIndex(0);
    setGameActief(true);
  };

  const stopGame = () => {
    setGameActief(false);
    voortgang.current = { index: 0, goed: 0 };
    setVraagIndex(0);
  };

  const beantwoord = (kaart) => {
    const { index, goed } = voortgang.current;
    const vraag = game.vragen[index];
    const juist = normaliseer(kaart.label) === normaliseer(vraag.antwoord);
    const nieuwGoed = goed + (juist ? 1 : 0);
    const volgende = index + 1;

    if (volgende >= game.vragen.length) {
      voortgang.current = { index: 0, goed: 0 };
      setUitslag({ goed: nieuwGoed, totaal: game.vragen.length });
      setGameActief(false);
      setVraagIndex(0);
    } else {
      voortgang.current = { index: volgende, goed: nieuwGoed };
      setVraagIndex(volgende);
    }
  };

  // Tijdens een game opent een kaart niet, maar telt hij als antwoord.
  const kiesKaart = (kaart) => {
    if (gameActief) {
      beantwoord(kaart);
    } else {
      setGekozenKaart(kaart);
    }
  };

  const startLabel =
    game && game.nummer !== undefined ? `Start game ${game.nummer}` : 'Start game';

  return (
    <div className="app">
      <header className="app-kop">
        <div className="app-kop-rij">
          <div>
            <h1>C# onderwerpen</h1>
            <p className="app-uitleg">
              Klik op een kaart voor een korte uitleg en een voorbeeld.
            </p>
          </div>
          <div className="kop-knoppen">
            <button
              type="button"
              className="kop-knop"
              onClick={haalGame}
              disabled={laadStatus === 'laden'}
            >
              {laadStatus === 'laden' ? 'Zoeken...' : 'Herlaad game'}
            </button>
            {game && !gameActief && (
              <button
                type="button"
                className="kop-knop kop-knop-primair"
                onClick={startGame}
              >
                {startLabel}
              </button>
            )}
            {gameActief && (
              <button type="button" className="kop-knop" onClick={stopGame}>
                Stop game
              </button>
            )}
          </div>
        </div>
        {laadStatus === 'geen' && (
          <p className="kop-status">Geen game gevonden op de server.</p>
        )}
        {laadStatus === 'fout' && (
          <p className="kop-status">Kon de game niet laden. Probeer het opnieuw.</p>
        )}
      </header>

      {gameActief && game && (
        <div className="game-banner">
          <p className="game-voortgang">
            Vraag {vraagIndex + 1} van {game.vragen.length}
          </p>
          <p className="game-vraag">{game.vragen[vraagIndex].vraag}</p>
          <p className="game-hint">Klik op de kaart met het juiste antwoord.</p>
        </div>
      )}

      <main>
        <CardGrid kaarten={kaarten} onOpen={kiesKaart} />
      </main>

      {toonQr && <QrCode />}
      {toonUrl && <ShortUrl />}

      {gekozenKaart && !gameActief && (
        <CardDetail kaart={gekozenKaart} onClose={() => setGekozenKaart(null)} />
      )}

      {uitslag && (
        <GameResult
          goed={uitslag.goed}
          totaal={uitslag.totaal}
          onClose={() => setUitslag(null)}
        />
      )}
    </div>
  );
}

export default App;
