# Rick Averesch – persoonlijke website

Welkom op [rickaveresch.nl](https://rickaveresch.nl), mijn online portfolio voor games, projecten en webontwikkeling.

## Over de site
Deze site combineert mijn interesse in programmeren, design en animatie.

## Gebruikte technologieën
- Next.js
- Tailwind CSS
- JavaScript
- Canvas & shaders (achtergrondanimaties)
- Framer Motion voor animaties

## Wat vind je hier?
- Overzicht van projecten met screenshots en korte beschrijvingen
- Visuele experimenten (animaties en shaders)
- Instelbare achtergronden en sliders

## Installatie en ontwikkeling
```bash
git clone https://github.com/R1nkol/rickaveresch.nl.git
cd rickaveresch.nl
npm install
npm run dev
```

De devserver gebruikt `.next-dev` voor gegenereerde bestanden. `npm run build`
en `npm start` gebruiken `.next`, zodat een productiebuild de draaiende
devserver niet verstoort. Start maar één devserver tegelijk per checkout.

Krijg je na een configuratiewijziging nog oude chunk- of CSS-fouten? Stop de
devserver met `Ctrl+C`, start `npm run dev` opnieuw en ververs de browser met
`Ctrl+F5`.

## Database (Supabase)

Het contactformulier slaat berichten op in PostgreSQL bij Supabase. De verbinding
loopt uitsluitend via de server; er zijn geen publieke Supabase API-sleutels nodig.

1. Kopieer `.env.example` naar `.env.local`.
2. Vul `DATABASE_URL` in met de URI uit Supabase > Connect en vervang de
   wachtwoordplaceholder door het databasewachtwoord (URL-encode speciale tekens).
   Kies de **Transaction pooler** voor serverless hosting of een netwerk zonder
   IPv6. De gebruikersnaam is dan `postgres.<project-ref>`, de databasenaam `postgres`.
   Gebruik `sslmode=verify-full` voor een versleutelde, geverifieerde verbinding.
   De Supabase-pooler gebruikt het publieke rootcertificaat uit
   `src/lib/supabaseCa.mjs`; certificaat- en hostnaamcontrole blijven ingeschakeld.
3. Voer `npm run db:setup` eenmalig uit om de contacttabel en index aan te maken.
4. Controleer met `npm run db:check` of schrijven en teruglezen werken. De
   testtransactie wordt teruggedraaid, zodat geen testbericht achterblijft.
5. Herstart de devserver na een wijziging in `.env.local`.

Het schema staat in `supabase/migrations/20261020120000_create_contact_messages.sql`.
Row Level Security staat aan; de publieke rollen `anon` en `authenticated` hebben
geen toegang tot de contactberichten. De server gebruikt de databaseverbinding.

Stel bij je hostingprovider dezelfde `DATABASE_URL` in voordat je de site opnieuw
deployt. `.env.local` is uitgesloten van Git en wordt niet meegepubliceerd.
