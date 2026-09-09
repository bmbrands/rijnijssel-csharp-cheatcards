import React, { useEffect } from 'react';

// Kiest een positieve, grappige uitslag die past bij de score.
function kiesMeme(percentage) {
  if (percentage >= 100) {
    return {
      emoji: '\u{1F3C6}',
      boven: 'Flawless victory',
      onder: 'De compiler is sprakeloos',
      tekst: 'Alles goed! Jij en C# zijn nu officieel beste vrienden.',
    };
  }
  if (percentage >= 70) {
    return {
      emoji: '\u{1F680}',
      boven: 'Bijna perfect',
      onder: 'Ship it',
      tekst: 'Sterk werk, je bent echt goed op weg.',
    };
  }
  if (percentage >= 40) {
    return {
      emoji: '\u{1F4AA}',
      boven: 'Warmdraaien',
      onder: 'Nog een rondje',
      tekst: 'Prima basis. Oefen nog even door, dan sta je er.',
    };
  }
  return {
    emoji: '\u{1F41B}',
    boven: 'Bug gevonden',
    onder: 'In jezelf? Nee joh',
    tekst: 'Elke expert begon met een foutmelding. Gewoon doorgaan!',
  };
}

function GameResult({ goed, totaal, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const percentage = totaal > 0 ? Math.round((goed / totaal) * 100) : 0;
  const meme = kiesMeme(percentage);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="uitslag"
        role="dialog"
        aria-modal="true"
        aria-label="Uitslag"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="meme">
          <div className="meme-boven">{meme.boven}</div>
          <div className="meme-vlak" aria-hidden="true">
            {meme.emoji}
          </div>
          <div className="meme-onder">{meme.onder}</div>
        </div>

        <p className="uitslag-score">
          {goed} van de {totaal} goed
        </p>
        <p className="uitslag-tekst">{meme.tekst}</p>

        <button type="button" className="uitslag-knop" onClick={onClose}>
          Sluiten
        </button>
      </div>
    </div>
  );
}

export default GameResult;
