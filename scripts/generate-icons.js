// Genereert de PWA-iconen. Draait eenmalig: node scripts/generate-icons.js
// Maakt een donker vierkant met een lichte # (verwijst naar C#), zonder externe libs.

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const bg = [30, 30, 30]; // #1e1e1e (editorkleur)
const fg = [212, 212, 212]; // #d4d4d4

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function makePng(size) {
  const bars = Math.round(size * 0.09); // dikte van de balken
  const g1 = Math.round(size * 0.34);
  const g2 = Math.round(size * 0.62);
  const h1 = Math.round(size * 0.34);
  const h2 = Math.round(size * 0.62);
  const marge = Math.round(size * 0.2);

  function isHash(x, y) {
    const inRange = x >= marge && x <= size - marge && y >= marge && y <= size - marge;
    if (!inRange) return false;
    const vert = (x >= g1 && x < g1 + bars) || (x >= g2 && x < g2 + bars);
    const horiz = (y >= h1 && y < h1 + bars) || (y >= h2 && y < h2 + bars);
    return vert || horiz;
  }

  const raw = Buffer.alloc((size * 4 + 1) * size);
  let pos = 0;
  for (let y = 0; y < size; y++) {
    raw[pos++] = 0; // filter type 0
    for (let x = 0; x < size; x++) {
      const c = isHash(x, y) ? fg : bg;
      raw[pos++] = c[0];
      raw[pos++] = c[1];
      raw[pos++] = c[2];
      raw[pos++] = 255;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const outDir = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

[192, 512].forEach((size) => {
  const file = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(file, makePng(size));
  console.log('geschreven:', file);
});
