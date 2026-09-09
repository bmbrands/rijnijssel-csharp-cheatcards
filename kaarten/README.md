# Kaarten

Elke kaart is een submap in deze map. De site laadt alle submappen automatisch.

## Een nieuwe kaart toevoegen

1. Maak een nieuwe submap, bijvoorbeeld `10-onderwerp`.
   Het nummer bepaalt mee de volgorde, maar `order` in `meta.json` is leidend.
2. Zet er drie bestanden in:

### `meta.json`

```json
{
  "label": "onderwerp",
  "order": 10
}
```

- `label` is de tekst op de kaart (de achterkant).
- `order` bepaalt de volgorde in het rooster (laag getal eerst).

### `intro.md`

De korte uitleg in Markdown. De eerste regel is de titel:

```md
# Titel

Hier komt de korte uitleg. Je mag `inline code`, lijstjes en meerdere
alinea's gebruiken.
```

### `Program.cs`

Het voorbeeld in C#. Dit wordt getoond met syntax highlighting.

Meer is niet nodig. Herstart daarna de dev-server (`npm start`) als die nog draaide.

## Nieuwe kaarten publiceren naar de PWA

De site is een progressive web app. Nieuwe kaarten komen automatisch bij de
studenten binnen zodra je een nieuwe versie publiceert:

1. Voeg de kaart(en) toe zoals hierboven.
2. Bouw de site: `npm run build`.
3. Zet de inhoud van de map `dist/` op je webserver (https).

De service worker haalt bij het volgende online bezoek de nieuwe versie op en
laadt de pagina eenmalig opnieuw, zodat de nieuwe kaarten meteen zichtbaar zijn.
Offline blijft de laatst opgehaalde versie werken.

