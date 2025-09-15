export const shftBlogPosts = [
{
    slug: "2025-09-14-player-side-refactor-upgrades",
    title: "Grote refactor van PlayerSide.gd en upgrade‑systeem uitgebreid",
    date: "2025-09-14",
    content: `Op 14 september is PlayerSide.gd grondig opgeschoond: de UI-code is vereenvoudigd en component‑UIDs zijn toegevoegd voor betere structuur en onderhoudbaarheid. Het upgrade‑systeem is uitgebreid met nieuwe upgrades en diverse bugs zijn opgelost voor een stabielere ervaring.`,
},
{
    slug: "2025-09-11-2025-09-12-playerlogic-split-upgrades-seeding",
    title: "Spelerlogica gesplitst, stat‑modules en upgrade‑seeding",
    startDate: "2025-09-11",
    endDate: "2025-09-12",
    content: `Op 11 en 12 september is de spelerlogica opgesplitst in aparte movement- en damage‑componenten voor meer overzicht en uitbreidbaarheid. De stat‑berekening voor upgrades is verplaatst naar losse modules, waardoor het systeem flexibeler is geworden. De seeding van upgrades is gecentraliseerd en de stat‑formattering is verbeterd. Daarnaast zijn er extra upgrades toegevoegd en bestaande effecten verder verfijnd.`,
},
{
    slug: "2025-09-10-multiplayer-sync-verwijderd-upgrade-context-flags",
    title: "Multiplayer‑sync verwijderd; upgrade‑context‑flags geïntroduceerd",
    date: "2025-09-10",
    content: `Op 10 september is de multiplayer‑synchronisatie uit het project gehaald om de codebase eenvoudiger en stabieler te maken. Tegelijk zijn upgrade‑context‑flags toegevoegd, waarmee upgrades nu afhankelijk van de spelsituatie geactiveerd of gedeactiveerd kunnen worden. Dit maakt het systeem flexibeler en beter uitbreidbaar voor toekomstige features.`,
},
{
    slug: "2025-08-09-2025-08-10-shader-vhs-noise-resolutie",
    title: "Shader‑experimenten: VHS‑effect en statische ruis",
    startDate: "2025-08-09",
    endDate: "2025-08-10",
    content: `Op 9 en 10 augustus zijn er shader‑experimenten uitgevoerd, waaronder een VHS‑effect en statische ruis voor een retro-uitstraling. Daarnaast zijn resolutiewijzigingen getest en is de schermverhouding verbreed voor een betere presentatie op verschillende schermen.`,
},
{
    slug: "2025-07-24-2025-07-25-portalmenu-side-mode-slowmo-fixes",
    title: "Portalmenu aangevuld, side‑mode‑experimenten en bugfixes",
    startDate: "2025-07-24",
    endDate: "2025-07-25",
    content: `Op 24 en 25 juli is het portalmenu uitgebreid met een duidelijke indicatie van het volgende perspectief. Er zijn experimenten gedaan met side‑mode, waaronder slow‑motion na het voltooien van levels en het toevoegen van nieuwe kleurpaletten voor meer variatie. Daarnaast zijn fouten opgelost rond de side‑player en de dash/houd‑aan‑lucht‑functionaliteit.`,
},
{
    slug: "2025-07-21-2025-07-23-shopupgrades-kleurpaletten-arena-fixes",
    title: "Shop‑upgrades gefikst en kleurpaletten toegevoegd",
    startDate: "2025-07-21",
    endDate: "2025-07-23",
    content: `Tussen 21 en 23 juli zijn bugs met shop‑upgrades opgelost en zijn er kleurpaletten toegevoegd voor meer visuele variatie. Daarnaast zijn er fixes doorgevoerd aan de arena, gamemodes zijn aangepast en de buttonfocus in het menu is verbeterd.`,
},
{
    slug: "2025-07-20-portalmenu-datatransfer-camerashake",
    title: "Portalmenu functioneel, data‑overdracht tussen levels",
    startDate: "2025-07-20",
    content: `Op 20 juli is het portalmenu volledig functioneel gemaakt. Spelers kunnen nu via het menu tussen levels wisselen, waarbij data correct wordt overgedragen. De camera-shake is verbeterd voor meer impact tijdens gameplay. Daarnaast zijn diverse bugs opgelost voor een stabielere ervaring.`,
},
{
    slug: "2025-07-13-2025-07-14-shopmenu-portalmenu-teun-leaved",
    title: "Shopmenu gestart, portalmenu-functionaliteit en Teun gestopt",
    startDate: "2025-07-13",
    endDate: "2025-07-14",
    content: `Op 13 en 14 juli is het shopmenu opgezet en later werkend gemaakt. Er zijn fixes doorgevoerd aan networking en de healthbar. Ook is het begin gemaakt aan de functionaliteit voor het portalmenu. Verder heeft Teun het project verlaten, dus ga ik nu alleen verder.`,
},
{
    slug: "2025-07-08-2025-07-09-dynamische-maxhealth-singleplayer-fixes",
    title: "Dynamische max‑health geïmplementeerd, fixes voor singleplayer‑lobby",
    startDate: "2025-07-08",
    endDate: "2025-07-09",
    content: `Op 8 en 9 juli is het health-systeem uitgebreid: de maximale health van de speler kan nu dynamisch veranderen, bijvoorbeeld door upgrades of events. Daarnaast zijn er diverse bugs opgelost in de singleplayer-lobby, waardoor het opstarten en verlaten van een sessie betrouwbaarder werkt.`,
},
{
    slug: "2025-07-04-2025-07-07-buttonfocus-hp-knockback",
    title: "Buttonfocus met tweens, HP-systeem en knockback",
    startDate: "2025-07-04",
    endDate: "2025-07-07",
    content: `Van 4 tot en met 7 juli zijn er meerdere verbeteringen doorgevoerd. De buttonfocus in de UI werkt nu met tweens en aangepaste kleuren voor betere visuele feedback. Het HP-systeem is verbeterd en de healthbar werkt nu correct. Daarnaast is knockback toegevoegd voor het topdown-personage, wat de gameplay responsiever maakt.`,
},
{
    slug: "2025-04-26-frisse-start",
    title: "Frisse start: project opnieuw begonnen",
    date: "2025-03-26",
    content: `Op 26 maart zijn we opnieuw begonnen. Ons oude project was veel te rommelig, dus hebben we besloten om een frisse start te maken. De codebase is opgeschoond en we hebben een duidelijkere structuur opgezet om toekomstige ontwikkeling makkelijker te maken.`,
},
{
    slug: "2025-04-16-physics-refactor-steam-auth",
    title: "Physics-refactor, stuiter-vijand en Steam-authenticatie",
    startDate: "2025-04-14",
    endDate: "2025-04-16",
    content: `De physics-refactor ging door; een stuiterende vijand werd toegevoegd en de eerste simpele implementatie van Steam-authenticatie verscheen. Oude auth-code moet nog worden opgeruimd.`,
},
{
    slug: "2025-04-09-portal-steam-bouncer-rigidbody",
    title: "Portaal-effect, Steam-extensie, bouncer-vijand en physics-omschakeling",
    startDate: "2025-04-04",
    endDate: "2025-04-09",
    content: `Grote features kwamen erbij: een portaal-effect, een Steam-extensie en een nieuwe “bouncer”-vijand. Tegelijkertijd startte de omschakeling naar een fysica-gebaseerde aanpak met rigidbodies.`,
},
{
    slug: "2025-04-03-upgrade-menu-cleanup",
    title: "Upgrade-menu compleet, code opgeschoond en labels bijgewerkt",
    startDate: "2025-03-26",
    endDate: "2025-04-03",
    content: `Oude upgradebestanden en verouderde code werden opgeruimd. Details zoals labels in het settings-menu en shopinfo werden bijgewerkt. Het upgrade-menu kreeg volledige functionaliteit, inclusief indicatoren of een upgrade betaalbaar is.`,
},
{
    slug: "2025-03-13-shop-skilltree-upgrades",
    title: "Shop makeover, skill-tree zoom en upgrade-logica herschreven",
    startDate: "2025-03-13",
    endDate: "2025-03-17",
    content: `De winkel kreeg een grafische make-over met nieuwe kaarten; het skill-tree-zoomen werd definitief gerepareerd. De upgrade-logica werd herschreven om nieuwe upgrades eenvoudiger in te voegen.`,
},
{
    slug: "2025-03-09-wave-explosives-spawn",
    title: "Wave-systeem, explosievijanden en spawn-animaties",
    startDate: "2025-03-09",
    endDate: "2025-03-10",
    content: `Meer variatie in het spel: een wave-systeem, explosievijanden en spawn-animaties. Explosieschade en de HP-overlay werden verfijnd voor betere feedback.`,
},
{
    slug: "2025-03-03-backend-leaderboard-coins",
    title: "Backend veiligheid, zwevende coins en leaderboard live",
    startDate: "2025-03-03",
    endDate: "2025-03-06",
    content: `Backend-veiligheid kreeg versleutelde tijdstempels. Coins “zweven” nu visueel, en het leaderboard-systeem ging live met kleurenfixes en werkende highscores.`,
},
{
    slug: "2025-03-01-2025-03-03-polishronde",
    title: "Grote polishronde: death-menu, slow-motion, audio en meer",
    startDate: "2025-03-01",
    endDate: "2025-03-03",
    content: `Van 1 tot en met 3 maart ben ik bezig geweest met een grote polishronde. Het death-menu is uitgebreid en er is een slow-motion effect toegevoegd wanneer de speler doodgaat. Ook is er een audiosysteem opgezet en is er nu een login- en logoutknop aanwezig.

Daarnaast is het opslaan van ronde-data voorbereid. De intro-animaties zijn vloeiender gemaakt en instellingen worden nu persistent opgeslagen. De eerste basislevel en shopmenu’s zijn toegevoegd, de speler heeft een death-animatie gekregen en er is een Steam-knop in de UI verschenen.`,
},

{
  slug: "2025-02-17-2025-02-20-fundamenten",
  title: "Eerste fundamenten: idee, HTTP-requests, player updates en login",
  startDate: "2025-02-17",
  endDate: "2025-02-20",
  content: `De eerste dagen stonden volledig in het teken van de basis leggen. Op 17 februari ontstond het idee om een game te maken waarin je wisselt tussen topdown en side-scrolling perspectief, en werd de eerste versie van de spelers geïmplementeerd. Een dag later kwamen de eerste HTTP-requests erbij. Op 19 februari kreeg de speler dash- en schietfunctionaliteit. Tot slot werd op 20 februari het eerste login-systeem gebouwd, met zowel frontend als backend, en ontstonden de eerste ideeën voor een upgradesysteem.`,
},
{
  slug: "2025-02-21-2025-02-24-menus-settings",
  title: "Menus en settings: death-menu en fullscreen-opties",
  startDate: "2025-02-21",
  endDate: "2025-02-24",
  content: `In deze periode zijn de eerste menu’s opgezet. Op 21 februari maakte Teun een eenvoudig death-menu, vooral als oefening in Godot. Enkele dagen later, op 24 februari, werd een settingsmenu toegevoegd waarmee fullscreen en framerate ingesteld konden worden, al werkte resolutie toen nog niet goed.`,
},
{
  slug: "2025-02-25-2025-02-27-gameplay-enemies-upgrades",
  title: "Gameplay uitbreidingen: fixes, enemies en upgrades",
  startDate: "2025-02-25",
  endDate: "2025-02-27",
  content: `Van 25 tot en met 27 februari kreeg de game meer inhoud en logica. Eerst werden de player-functionaliteit verbeterd en bugs in het login-menu opgelost. Daarna verscheen de eerste enemy die de speler actief aanvalt, met coins die droppen bij zijn dood. Op 27 februari werd de eerste werkende upgrade-functionaliteit toegevoegd, waaronder snelheid en damage, en paste Teun de backend aan zodat upgrades ook opgeslagen konden worden.`,
},

  {
    slug: "2025-02-28-melee-side-character",
    title: "Melee aanval voor side character",
    date: "2025-02-28",
    content: `Rick heeft eindelijk de melee aanval voor het side character gemaakt. We hebben nu besloten dat de topdown character alleen een gun krijgt en de side character alleen een melee wapen. Dit maakt het verschil tussen de twee perspectieven duidelijker en zorgt voor meer variatie in de gameplay.
    
Teun heeft vandaag resolutie proberen toe te voegen alleen met fullscreen ging het niet helemaal goed. We hebben besloten dat er geen optie komt om je resolutie aan te passen, maar voor nu alleen fullscreen en de max framerate.`,
  },
  {
    slug: "2025-02-16-init",
    title: "Start van het project",
    date: "2025-02-16",
    content: `Ik en mijn klasgenoot Teun zijn begonnen met het ontwikkelen van het project.

We hadden het idee om een game te maken met een leaderboard, we hebben laravel hiervoor gekozen als backend aangezien we hier al bekend mee waren.
Steam heeft een gratis SDK voor het implementeren van leaderboards, maar Teun wou dit liever zelf implementeren.`,
  },
];
