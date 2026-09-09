// Laadt automatisch alle kaarten uit de map /kaarten.
// Elke kaart is een submap met drie bestanden:
//   meta.json   -> { "label": "...", "order": 1 }
//   intro.md    -> korte uitleg in Markdown (begint met # Titel)
//   Program.cs  -> een voorbeeld in C#
//
// Een nieuwe kaart toevoegen? Maak een nieuwe submap met deze drie bestanden.
// De site pikt hem vanzelf op.

const context = require.context('../../kaarten', true, /\.(md|cs|json)$/);

function unwrap(mod) {
  return mod && mod.default !== undefined ? mod.default : mod;
}

function folderOf(key) {
  // key ziet eruit als "./01-datatypes/meta.json"
  return key.replace(/^\.\//, '').split('/')[0];
}

const kaartenPerMap = {};

context.keys().forEach((key) => {
  const map = folderOf(key);
  if (!kaartenPerMap[map]) {
    kaartenPerMap[map] = {};
  }

  if (key.endsWith('meta.json')) {
    kaartenPerMap[map].meta = unwrap(context(key));
  } else if (key.endsWith('intro.md')) {
    kaartenPerMap[map].intro = unwrap(context(key));
  } else if (key.endsWith('Program.cs')) {
    kaartenPerMap[map].code = unwrap(context(key));
  }
});

function titelUitMarkdown(markdown) {
  const eersteRegel = (markdown || '').split('\n')[0].trim();
  return eersteRegel.replace(/^#\s*/, '');
}

const kaarten = Object.keys(kaartenPerMap)
  .map((map) => {
    const item = kaartenPerMap[map];
    const meta = item.meta || {};
    return {
      id: map,
      label: meta.label || map,
      order: typeof meta.order === 'number' ? meta.order : 999,
      titel: titelUitMarkdown(item.intro),
      intro: item.intro || '',
      code: (item.code || '').replace(/\s+$/, ''),
      compleet: Boolean(item.meta && item.intro && item.code),
    };
  })
  .filter((kaart) => kaart.compleet)
  .sort((a, b) => a.order - b.order);

export default kaarten;
