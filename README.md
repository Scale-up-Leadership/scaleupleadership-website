# Website Scale-up Leadership

De website van [scaleupleadership.nl](https://www.scaleupleadership.nl). Een statische site, gebouwd met [Eleventy](https://www.11ty.dev/), gehost op Netlify. De inhoud is aan te passen via een beheerscherm op `/admin`, zonder code.

## Hoe het in elkaar zit

```
src/
  _data/            de inhoud van de site, als JSON
    site.json       menu, footer, contactgegevens
    team.json       de scale up leaders
    pagina/         per pagina één bestand met alle teksten
  _includes/
    basis.njk       de vaste schil: menu, footer, slotblok
    artikel.njk     de opmaak van een blog, event of nieuwsbericht
  actueel/          de losse items, één markdown-bestand per item
  css/stijl.css     alle opmaak
  img/              logo en foto's
  *.njk             de pagina's zelf
admin/              het beheerscherm
```

De scheiding is bewust: **`_data` is inhoud en de rest is opmaak.** Wie teksten wijzigt komt alleen in `_data` en in `actueel`, en kan de vormgeving dus niet per ongeluk stukmaken.

## Lokaal draaien

Je hebt Node 20 of hoger nodig.

```bash
npm install
npm start
```

De site draait dan op `http://localhost:8080`. Wijzigingen zie je meteen.

Een losse build maken:

```bash
npm run build
```

Het resultaat komt in `_site`. Die map staat niet in git, want Netlify bouwt hem zelf.

## Publiceren

Netlify is gekoppeld aan de `main` branch. Elke wijziging die daar binnenkomt, ook een wijziging via het beheerscherm, zet automatisch een nieuwe versie live. Dat duurt ongeveer een minuut.

Gaat er iets mis, dan kun je in Netlify onder Deploys terug naar een eerdere versie. Er gaat dus nooit iets echt verloren.

## Het beheerscherm

Te bereiken via `/admin`. Draait op [Sveltia CMS](https://sveltiacms.app/), de opvolger van Decap CMS. De inrichting staat in `admin/config.yml`.

Wat er te wijzigen valt:

- **Pagina's**: alle teksten, koppen, knoppen en kaarten van de zes pagina's.
- **Algemeen**: menu, footer, contactgegevens en het blok onderaan elke pagina.
- **Het team**: scale up leaders toevoegen, aanpassen of weghalen, met foto.
- **Actueel**: blogs, events, nieuws en podcastafleveringen toevoegen. Nieuwe items verschijnen vanzelf op de pagina Actueel en de drie nieuwste ook op de homepage.

### Voor de inrichting nog te doen

1. Zet in `admin/config.yml` bij `repo` de juiste naam van de repository.
2. Geef iedereen die inhoud mag wijzigen toegang tot de repository.
3. Wil je dat redacteuren inloggen zonder GitHub-account, zet dan de backend op `git-gateway` en zet Netlify Identity aan. Werkt dat niet meer, houd dan `github` aan en geef iedere redacteur een eigen gratis GitHub-account.

## Het contactformulier

Het formulier op `/contact/` gebruikt Netlify Forms. Na verzenden komt de bezoeker op `/bedankt/`.

**Let op, dit gaat vaak mis:** Netlify herkent formulieren niet vanzelf. Je moet in Netlify onder `Forms` de formulierdetectie aanzetten **en daarna opnieuw deployen**. Zonder die tweede stap komt er niets binnen. Stel in datzelfde scherm ook in naar welk mailadres de meldingen gaan.

## De scan

`/scan` verwijst nu via een redirect in `netlify.toml` naar de losse scanpagina. Draait de scan straks op een subdomein, pas dan alleen die regel aan.

## Wat je niet in het beheerscherm kunt

- Een nieuwe pagina met een nieuwe indeling maken.
- De vormgeving aanpassen: kleuren, lettertypes, afstanden.
- De volgorde van secties op een pagina veranderen.

Dat gaat via de code in deze repository. De huisstijl staat in `src/css/stijl.css` bovenaan als CSS-variabelen, dus een kleur wijzigen is één regel.

## Huisstijl in het kort

- Magenta `#EC008C` voor knoppen en accenten, spaarzaam gebruiken.
- Oranje `#F78F3B` is de merkkleur: de ring, het logo, de streepjes.
- Tekst `#181818`, introtekst `#5E6163`, achtergronden wit of `#F5F5F6`.
- Koppen in Sora, lopende tekst in Poppins. Geen derde lettertype.
- De oranje ring met de magenta stip loopt altijd van de beeldrand af.
- Nederlands, informeel, je en jij. Geen gedachtestreepjes en geen komma voor het woord "en".
