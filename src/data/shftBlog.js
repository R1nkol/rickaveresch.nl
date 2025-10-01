export const shftBlogPosts = [
{
    slug: "2025-09-20-2025-09-30-documentation",
    title: "Documentatie en reflectie",
    startDate: "2025-09-20",
    endDate: "2025-09-30",
    content: `Ik heb deze tijd goed gebruikt om na te denken over hoe het eindproduct eruit moet zien. Eerst heb ik een lijst gemaakt met alle features die ik nog wil toevoegen. Vervolgens heb ik per feature bekeken hoe ik deze het beste kan aanpakken.

Op dit moment ben ik bezig met de ontwikkeling van de features die in de demo van de game komen. Zo kan ik zo snel mogelijk een demo laten zien aan anderen. Daarna ga ik verder met de rest van de features.`,
},
{
    slug: "2025-09-15-busy",
    title: "Update voor de toekomst",
    date: "2025-09-15",
    content: `Op dit moment heb ik het erg druk met stage. In de vakantie had ik ook al weinig tijd om aan het project te werken, omdat ik toen zes dagen per week werkte. Dat betekent helaas dat er voorlopig wat minder updates zullen zijn. 

In plaats van alles meteen uit te werken, ben ik nu vooral bezig met het verder uitdenken van ideeën en concepten. Op die manier hoop ik later minder fouten te maken in designkeuzes en het project professioneler aan te pakken zodra ik weer meer tijd heb.`,
},
{
    slug: "2025-09-11-2025-09-12-playerlogic-split-upgrades-seeding",
    title: "Spelerlogica gesplitst, stat‑modules en upgrade‑seeding",
    startDate: "2025-09-11",
    endDate: "2025-09-12",
    content: `Op 11 en 12 september heb ik de spelerlogica opgesplitst in aparte componenten voor meer overzicht en uitbreidbaarheid. De stat‑berekening voor upgrades is verplaatst naar losse modules, waardoor het systeem flexibeler is geworden. De seeding van upgrades is gecentraliseerd en de stat‑formattering is verbeterd. Daarnaast zijn er extra upgrades toegevoegd en bestaande effecten verder verfijnd.`,
},
{
    slug: "2025-09-10-multiplayer-sync-verwijderd-upgrade-context-flags",
    title: "Multiplayer‑sync verwijderd; upgrade‑context‑flags geïntroduceerd",
    date: "2025-09-10",
    content: `Op 10 september heb ik de multiplayer‑synchronisatie uit het project gehaald om de codebase eenvoudiger en stabieler te maken. Dit heb ik gedaan omdat ik eerst wil focussen op de basis van de game voordat ik multiplayer toevoeg.
    
Ook heb ik het upgrade-systeem verbeterd. Nu kunnen upgrades per level andere effecten hebben, afhankelijk van de context. Dit maakt het systeem flexibeler en interessanter.`,
},
{
    slug: "2025-08-09-2025-08-10-shader-vhs-noise-resolutie",
    title: "Shader‑experimenten: VHS‑effect en statische ruis",
    startDate: "2025-08-09",
    endDate: "2025-08-10",
    content: `Op 9 en 10 augustus ben ik bezig geweest met het VHS‑effect voor een retro-uitstraling. Daarnaast zijn resolutiewijzigingen getest en is de schermverhouding verbreed.
    
Origineel wilde ik dat de game alleen een 1x1 aspect ratio zou hebben, maar dat limiteerde mij met het ontwerpen van de levels. Vandaar dat ik heb besloten dat de main aspect ratio nog steeds 1x1 is, maar dat de aspect ratio veranderd kan worden tot 16:9. Dit wordt gedaan als je bijvoorbeeld naar een ander level gaat.`,
},
{
    slug: "2025-07-24-2025-07-25-portalmenu-side-mode-slowmo-fixes",
    title: "Portalmenu aangevuld, side‑mode‑experimenten en bugfixes",
    startDate: "2025-07-24",
    endDate: "2025-07-25",
    content: `Op 24 en 25 juli heb ik het portalmenu uitgebreid met een duidelijke indicatie van het volgende perspectief. Daarnaast zijn er wat bugs opgelost voor de side‑player en de dash/houd‑aan‑lucht‑functionaliteit.`,
},
{
    slug: "2025-07-21-2025-07-23-shopupgrades-kleurpaletten-arena-fixes",
    title: "Shop‑upgrades gefikst en kleurpaletten toegevoegd",
    startDate: "2025-07-21",
    endDate: "2025-07-23",
    content: `Tussen 21 en 23 juli heb ik bugs met shop‑upgrades opgelost en zijn er andere kleurpaletten toegevoegd. Daarnaast zijn er fixes gemaakt aan de levels, gamemodes zijn aangepast en de buttonfocus in het menu is verbeterd.`,
},
{
    slug: "2025-07-20-portalmenu-datatransfer-camerashake",
    title: "Portalmenu functioneel, data‑overdracht tussen levels",
    startDate: "2025-07-20",
    content: `Op 20 juli heb ik het portalmenu volledig functioneel gemaakt. Spelers kunnen nu via het menu tussen levels wisselen, waarbij data correct wordt overgedragen. De camera-shake is verbeterd voor meer impact tijdens gameplay. Daarnaast zijn er nog wat bugs opgelost.`,
},
{
    slug: "2025-07-13-2025-07-14-shopmenu-portalmenu-teun-leaved",
    title: "Shopmenu gestart, portalmenu-functionaliteit en Teun gestopt",
    startDate: "2025-07-13",
    endDate: "2025-07-14",
    content: `Op 13 en 14 juli is een eerste demo van het shopmenu opgezet. Er zijn fixes gemaakt aan networking en de healthbar. Ook is het begin gemaakt aan de functionaliteit voor het portalmenu. 

Verder heeft Teun het project verlaten, dus ga ik nu alleen verder. Teun zei dat hij het op dat moment te druk had met school en andere projecten. Vanaf dit punt ga ik alleen verder met de ontwikkeling.`,
},
{
    slug: "2025-07-08-2025-07-09-dynamische-maxhealth-singleplayer-fixes",
    title: "Dynamische max‑health geïmplementeerd, fixes voor singleplayer‑lobby",
    startDate: "2025-07-08",
    endDate: "2025-07-09",
    content: `Op 8 en 9 juli heb ik het health-systeem verder geperfectioneerd. Samen met Teun heb ik daarnaast gewerkt aan multiplayer: je kunt nu een lobby maken, mensen uitnodigen en joinen.`,
},
{
    slug: "2025-07-04-2025-07-07-buttonfocus-hp-knockback",
    title: "Buttonfocus met tweens, HP-systeem en knockback",
    startDate: "2025-07-04",
    endDate: "2025-07-07",
    content: `Van 4 tot en met 7 juli ben ik bezig geweest met veel visuele verbeteringen. Zoals buttonfocus in de UI die nu met tweens en aangepaste kleuren werkt voor betere visuele feedback.
    
Ook zat ik bij het vorige project heel erg te struggelen met het health systeem, ik wist niet hoe ik een goed en leuk health systeem kon maken. En nu heb ik een health systeem kunnen maken die goed bij de game past.`,
},
{
    slug: "2025-05-01-2025-07-01-import-restructuring-movement-shooting",
    title: "Importfase, herstructurering, movement en shooting verbeterd",
    startDate: "2025-05-01",
    endDate: "2025-07-01",
    content: `In deze periode ben ik bezig geweest om alles van het vorige project wat nuttig is te importeren naar het nieuwe project. Dingen zoals alles wat met rigidbodies te maken heeft, hebben we niet geimporteerd aangezien dat te complex was om het te laten werken want dat is erg zwaar voor een bullethell game.

Daarnaast heb ik gewerkt aan het verbeteren van de movement en shooting code, zodat het beter voelt om te spelen. Ook heb ik gewerkt aan een betere structuur voor de scripts, zodat het makkelijker is om dingen te vinden en aan te passen in de toekomst.`,
},
{
    slug: "2025-04-26-frisse-start",
    title: "Frisse start: project opnieuw begonnen",
    date: "2025-04-26",
    content: `Op 26 maart zijn we opnieuw begonnen. Ons oude project was echt te rommelig geworden met veel onnodige bestanden en code.
    
Toen we dit project begonnen, hadden we nog niet echt een duidelijk idee van wat we precies wilden maken. We wisten alleen dat we een game met een leaderboard wilden maken. Daarom hebben we in het oude project veel dingen uitgeprobeerd, waardoor het een chaos werd.

Nu hebben we een veel beter beeld van wat we willen bereiken en kunnen we gerichter werken aan de game.`,
},
{
    slug: "2025-04-16-physics-refactor-steam-auth",
    title: "Physics-refactor, stuiter-vijand en Steam-authenticatie",
    startDate: "2025-04-14",
    endDate: "2025-04-16",
    content: `Ik ben verder gegaan met alles omzetten naar physics bodies. Dit was lastiger dan verwacht dus dat viel flink tegen. Ook is de oude auth code verwijderd en is er een begin gemaakt met Steam-authenticatie.`,
},
{
    slug: "2025-04-09-portal-steam-bouncer-rigidbody",
    title: "Portaal-effect, Steam-extensie, bouncer-vijand en physics-omschakeling",
    startDate: "2025-04-04",
    endDate: "2025-04-09",
    content: `Vandaag werd alles flink omgegooid. Ik heb de player- en enemy-logica opgesplitst in aparte scripts voor betere organisatie. Ook heb ik gewerkt aan een soort portal effect zodat je tussen twee levels kan switchen met een smooth effect. Ook probeerde ik alles over te zetten naar rigidbodies maar dit is nog niet helemaal af.`,
},
{
    slug: "2025-04-03-upgrade-menu-cleanup",
    title: "Upgrade-menu compleet, code opgeschoond en labels bijgewerkt",
    startDate: "2025-03-26",
    endDate: "2025-04-03",
    content: `Vandaag heb ik alle oude upgrade bestanden verwijderd en alle oude code die we niet meer gebruiken opgeruimd. Het upgrade-menu is nu compleet met alle functionaliteit, inclusief indicatoren of een upgrade betaalbaar is.`,
},
{
    slug: "2025-03-13-shop-skilltree-upgrades",
    title: "Shop makeover, skill-tree zoom en upgrade-logica herschreven",
    startDate: "2025-03-13",
    endDate: "2025-03-17",
    content: `Ik ben de afgelopen dagen flink bezig geweest om de winkel een grafische make-over te geven, met nieuwe kaarten; het skill-tree-zoomen werd definitief gerepareerd. De upgrade-logica werd herschreven om nieuwe upgrades eenvoudiger in te voegen.`,
},
{
    slug: "2025-03-09-wave-explosives-spawn",
    title: "Wave-systeem, explosievijanden en spawn-animaties",
    startDate: "2025-03-09",
    endDate: "2025-03-10",
    content: `Ik heb een begin gemaakt aan wat meer variatie in het spel, waaronder een wave-systeem, explosievijanden en spawn-animaties.`,
},
{
    slug: "2025-03-03-backend-leaderboard-coins",
    title: "Backend veiligheid, zwevende coins en leaderboard live",
    startDate: "2025-03-03",
    endDate: "2025-03-06",
    content: `Vandaag heeft Teun de veiligheid van de backend aangepast en het leaderboard systeem aan de backend toegevoegd. Ik ben bezig geweest met wat design fixes zoals de coins hebben nu een betere animatie en het leaderboard heeft nu ook een betere look met animations.`,
},
{
    slug: "2025-03-01-2025-03-03-polishronde",
    title: "Grote polishronde: death-menu, slow-motion, audio en meer",
    startDate: "2025-03-01",
    endDate: "2025-03-03",
    content: `Van 1 tot en met 3 maart ben ik bezig geweest met een grote polishronde. Het death-menu is uitgebreid en er is een slow-motion effect toegevoegd wanneer de speler doodgaat. Ook is er een audiosysteem opgezet en is er nu een login- en logoutknop aanwezig.

Daarnaast is het opslaan van ronde-data voorbereid. De intro-animaties zijn vloeiender gemaakt en instellingen worden nu persistent opgeslagen. De eerste basislevel en shopmenu’s zijn toegevoegd, de speler heeft een death-animatie gekregen en er is een Steam-knop in de UI verschenen.

Ook is de look en feel van de game verbeterd, ik heb gewerkt aan shaders en heb een vhs-effect toegevoegd met nog wat extra filters zoals, color abberation, pixelatie en reflecties.`,
},
{
    slug: "2025-02-28-melee-side-character",
    title: "Melee aanval voor side character",
    date: "2025-02-28",
    content: `Ik heb de melee aanval voor het side character gemaakt. We hebben nu besloten dat de topdown character alleen een gun krijgt en de side character alleen een melee wapen. Dit maakt het verschil tussen de twee perspectieven duidelijker en zorgt voor meer variatie in de gameplay.
    
Teun heeft vandaag resolutie proberen toe te voegen alleen met fullscreen ging het niet helemaal goed. We hebben besloten dat er geen optie komt om je resolutie aan te passen, maar voor nu alleen fullscreen en de max framerate.`,
},
{
  slug: "2025-02-25-2025-02-27-gameplay-enemies-upgrades",
  title: "Gameplay uitbreidingen: fixes, enemies en upgrades",
  startDate: "2025-02-25",
  endDate: "2025-02-27",
  content: `Van 25 tot en met 27 februari kreeg de game meer inhoud en logica. Ik verbeterde de player-functionaliteit en loste bugs in het login-menu op. Daarna maakte ik de eerste enemy die de speler aanvalt, met coins die droppen als hij gekild wordt. Op 27 februari werd de eerste werkende upgrade-functionaliteit toegevoegd, waaronder snelheid en damage, en paste Teun de backend aan zodat upgrades ook opgeslagen konden worden in de database.`,
},
{
  slug: "2025-02-21-2025-02-24-menus-settings",
  title: "Menus en settings: death-menu en fullscreen-opties",
  startDate: "2025-02-21",
  endDate: "2025-02-24",
  content: `In deze periode zijn de eerste menu’s opgezet. Op 21 februari maakte Teun een eenvoudig death-menu, vooral als oefening in Godot. Paar dagen later, op 24 februari, begon ik aan een settingsmenu toevoegen waarmee fullscreen en framerate ingesteld konden worden, al werkte resolutie toen nog niet goed.`,
},
{
  slug: "2025-02-17-2025-02-20-fundamenten",
  title: "Eerste fundamenten: idee, HTTP-requests, player updates en login",
  startDate: "2025-02-17",
  endDate: "2025-02-20",
  content: `De eerste dagen hebben we ons volledig gefocust op de basis te bedenken/maken. Op 17 februari ontstond het idee om een game te maken waarin je wisselt tussen topdown en side-scrolling perspectief, en werd de eerste versie van de spelers geïmplementeerd.

Een dag later kwamen de eerste HTTP-requests erbij. Op 19 februari maakte ik de speler dash- en schietfunctionaliteit. En op 20 februari werd het eerste login-systeem gebouwd, ik deed de frontend hiervoor en Teun de backend, en ik bedacht de eerste ideeën voor een upgradesysteem, we wisten hier nog niet precies hoe we dit wilden aanpakken.`,
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
