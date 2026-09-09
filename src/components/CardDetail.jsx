import React, { useEffect } from 'react';
import { marked } from 'marked';
import CodeBlock from './CodeBlock';

// Verwijdert de eerste # Titel-regel; die tonen we apart als kop.
function introZonderTitel(markdown) {
  return markdown.replace(/^#\s.*\n?/, '');
}

function CardDetail({ kaart, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const introHtml = marked.parse(introZonderTitel(kaart.intro));

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-label={kaart.titel}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="detail-kop">
          <h2 className="detail-titel">{kaart.titel}</h2>
          <button type="button" className="detail-sluit" onClick={onClose}>
            Sluiten
          </button>
        </div>

        <div
          className="detail-intro"
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />

        <h3 className="detail-subkop">Voorbeeld</h3>
        <CodeBlock code={kaart.code} />
      </div>
    </div>
  );
}

export default CardDetail;
