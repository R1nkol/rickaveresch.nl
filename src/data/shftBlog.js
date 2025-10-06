export const shftBlogPosts = [
  {
    slug: "2025-09-20-2025-09-30-documentation",
    title: {
      nl: "Documentatie en reflectie",
      en: "Documentation and reflection",
    },
    startDate: "2025-09-20",
    endDate: "2025-09-30",
    content: {
      nl: `Ik heb deze tijd goed gebruikt om na te denken over hoe het eindproduct eruit moet zien. Eerst heb ik een lijst gemaakt met alle features die ik nog wil toevoegen. Vervolgens heb ik per feature bekeken hoe ik deze het beste kan aanpakken.

Op dit moment ben ik bezig met de ontwikkeling van de features die in de demo van de game komen. Zo kan ik zo snel mogelijk een demo laten zien aan anderen. Daarna ga ik verder met de rest van de features.`,
      en: `I used this time to think carefully about what the final product should look like. I started by listing all the features I still want to add, and then looked at the best approach for each one.

Right now I'm working on the features that will be in the game's demo so I can show something to others as soon as possible. After that I'll continue with the rest of the features.`,
    },
  },
  {
    slug: "2025-09-15-busy",
    title: {
      nl: "Update voor de toekomst",
      en: "Looking ahead",
    },
    date: "2025-09-15",
    content: {
      nl: `Op dit moment heb ik het erg druk met stage. In de vakantie had ik ook al weinig tijd om aan het project te werken, omdat ik toen zes dagen per week werkte. Dat betekent helaas dat er voorlopig wat minder updates zullen zijn.

In plaats van alles meteen uit te werken, ben ik nu vooral bezig met het verder uitdenken van ideeën en concepten. Op die manier hoop ik later minder fouten te maken in designkeuzes en het project professioneler aan te pakken zodra ik weer meer tijd heb.`,
      en: `I'm really busy with my internship right now. Even during the holidays I barely had time for the project because I was working six days a week. Unfortunately that means there will be fewer updates for a while.

Instead of building everything immediately, I'm focusing on refining ideas and concepts. This should help me avoid design mistakes later and tackle the project more professionally once I have more time again.`,
    },
  },
  {
    slug: "2025-09-11-2025-09-12-playerlogic-split-upgrades-seeding",
    title: {
      nl: "Spelerlogica gesplitst, stat-modules en upgrade-seeding",
      en: "Player logic split, stat modules and upgrade seeding",
    },
    startDate: "2025-09-11",
    endDate: "2025-09-12",
    content: {
      nl: `Op 11 en 12 september heb ik de spelerlogica opgesplitst in aparte componenten voor meer overzicht en uitbreidbaarheid. De stat-berekening voor upgrades is verplaatst naar losse modules, waardoor het systeem flexibeler is geworden. De seeding van upgrades is gecentraliseerd en de stat-formattering is verbeterd. Daarnaast zijn er extra upgrades toegevoegd en bestaande effecten verder verfijnd.`,
      en: `On 11 and 12 September I split the player logic into separate components to keep things organized and extensible. I moved the stat calculations for upgrades into dedicated modules, making the system more flexible. Upgrade seeding is now centralized, stat formatting is cleaner, and I added more upgrades while polishing the existing effects.`,
    },
  },
  {
    slug: "2025-09-10-multiplayer-sync-verwijderd-upgrade-context-flags",
    title: {
      nl: "Multiplayer-sync verwijderd; upgrade-context-flags geïntroduceerd",
      en: "Multiplayer sync removed; upgrade context flags added",
    },
    date: "2025-09-10",
    content: {
      nl: `Op 10 september heb ik de multiplayer-synchronisatie uit het project gehaald om de codebase eenvoudiger en stabieler te maken. Dit heb ik gedaan omdat ik eerst wil focussen op de basis van de game voordat ik multiplayer toevoeg.

Ook heb ik het upgrade-systeem verbeterd. Nu kunnen upgrades per level andere effecten hebben, afhankelijk van de context. Dit maakt het systeem flexibeler en interessanter.`,
      en: `On 10 September I removed multiplayer synchronization to keep the codebase simpler and more stable. I want to focus on the core gameplay before adding multiplayer.

I also improved the upgrade system. Upgrades can now have different effects per level depending on the context, which makes the system much more flexible and interesting.`,
    },
  },
  {
    slug: "2025-08-09-2025-08-10-shader-vhs-noise-resolutie",
    title: {
      nl: "Shader-experimenten: VHS-effect en statische ruis",
      en: "Shader experiments: VHS effect and static noise",
    },
    startDate: "2025-08-09",
    endDate: "2025-08-10",
    content: {
      nl: `Op 9 en 10 augustus ben ik bezig geweest met het VHS-effect voor een retro-uitstraling. Daarnaast zijn resolutiewijzigingen getest en is de schermverhouding verbreed.

Origineel wilde ik dat de game alleen een 1x1 aspect ratio zou hebben, maar dat limiteerde mij met het ontwerpen van de levels. Vandaar dat ik heb besloten dat de main aspect ratio nog steeds 1x1 is, maar dat de aspect ratio veranderd kan worden tot 16:9. Dit wordt gedaan als je bijvoorbeeld naar een ander level gaat.`,
      en: `On 9 and 10 August I worked on a VHS-style shader to give the game a retro vibe. I also experimented with resolution changes and widened the aspect ratio.

Originally I wanted the game to stay at a strict 1x1 aspect ratio, but that limited level design. The main aspect ratio is still 1x1, yet it can now expand up to 16:9 when you move to another level.`,
    },
  },
  {
    slug: "2025-07-24-2025-07-25-portalmenu-side-mode-slowmo-fixes",
    title: {
      nl: "Portalmenu aangevuld, side-mode-experimenten en bugfixes",
      en: "Portal menu updates, side mode experiments and fixes",
    },
    startDate: "2025-07-24",
    endDate: "2025-07-25",
    content: {
      nl: `Op 24 en 25 juli heb ik het portalmenu uitgebreid met een duidelijke indicatie van het volgende perspectief. Daarnaast zijn er wat bugs opgelost voor de side-player en de dash/houd-aan-lucht-functionaliteit.`,
      en: `On 24 and 25 July I expanded the portal menu with clear indicators showing the next perspective. I also fixed some bugs for the side player and the dash/air-hold mechanics.`,
    },
  },
  {
    slug: "2025-07-21-2025-07-23-shopupgrades-kleurpaletten-arena-fixes",
    title: {
      nl: "Shop-upgrades gefikst en kleurpaletten toegevoegd",
      en: "Shop upgrades fixed and colour palettes added",
    },
    startDate: "2025-07-21",
    endDate: "2025-07-23",
    content: {
      nl: `Tussen 21 en 23 juli heb ik bugs met shop-upgrades opgelost en zijn er andere kleurpaletten toegevoegd. Daarnaast zijn er fixes gemaakt aan de levels, gamemodes zijn aangepast en de buttonfocus in het menu is verbeterd.`,
      en: `Between 21 and 23 July I fixed bugs with shop upgrades and added new colour palettes. I also tweaked levels, adjusted game modes, and improved button focus in the menu.`,
    },
  },
  {
    slug: "2025-07-20-portalmenu-datatransfer-camerashake",
    title: {
      nl: "Portalmenu functioneel, data-overdracht tussen levels",
      en: "Portal menu functional, data transfer between levels",
    },
    startDate: "2025-07-20",
    content: {
      nl: `Op 20 juli heb ik het portalmenu volledig functioneel gemaakt. Spelers kunnen nu via het menu tussen levels wisselen, waarbij data correct wordt overgedragen. De camera-shake is verbeterd voor meer impact tijdens gameplay. Daarnaast zijn er nog wat bugs opgelost.`,
      en: `On 20 July I made the portal menu fully functional. Players can now switch between levels through the menu with data transferring correctly. I improved the camera shake for more impact during gameplay and fixed a few more bugs.`,
    },
  },
  {
    slug: "2025-07-13-2025-07-14-shopmenu-portalmenu-teun-leaved",
    title: {
      nl: "Shopmenu gestart, portalmenu-functionaliteit en Teun gestopt",
      en: "Shop menu start, portal menu progress and Teun stepped away",
    },
    startDate: "2025-07-13",
    endDate: "2025-07-14",
    content: {
      nl: `Op 13 en 14 juli is een eerste demo van het shopmenu opgezet. Er zijn fixes gemaakt aan networking en de healthbar. Ook is het begin gemaakt aan de functionaliteit voor het portalmenu.

Verder heeft Teun het project verlaten, dus ga ik nu alleen verder. Teun zei dat hij het op dat moment te druk had met school en andere projecten. Vanaf dit punt ga ik alleen verder met de ontwikkeling.`,
      en: `On 13 and 14 July I built the first demo of the shop menu. I fixed networking issues and the health bar, and started adding portal menu functionality.

Teun left the project around this time because he was too busy with school and other work, so I’ll be continuing on my own from here.`,
    },
  },
  {
    slug: "2025-07-08-2025-07-09-dynamische-maxhealth-singleplayer-fixes",
    title: {
      nl: "Dynamische max-health geïmplementeerd, fixes voor singleplayer-lobby",
      en: "Dynamic max health and singleplayer lobby fixes",
    },
    startDate: "2025-07-08",
    endDate: "2025-07-09",
    content: {
      nl: `Op 8 en 9 juli heb ik het health-systeem verder geperfectioneerd. Samen met Teun heb ik daarnaast gewerkt aan multiplayer: je kunt nu een lobby maken, mensen uitnodigen en joinen.`,
      en: `On 8 and 9 July I refined the health system. Teun and I also worked on multiplayer: you can now create a lobby, invite people, and join games.`,
    },
  },
  {
    slug: "2025-07-04-2025-07-07-buttonfocus-hp-knockback",
    title: {
      nl: "Buttonfocus met tweens, HP-systeem en knockback",
      en: "Button focus tweens, HP system and knockback",
    },
    startDate: "2025-07-04",
    endDate: "2025-07-07",
    content: {
      nl: `Van 4 tot en met 7 juli ben ik bezig geweest met veel visuele verbeteringen. Zoals buttonfocus in de UI die nu met tweens en aangepaste kleuren werkt voor betere visuele feedback.

Ook zat ik bij het vorige project heel erg te struggelen met het health systeem, ik wist niet hoe ik een goed en leuk health systeem kon maken. En nu heb ik een health systeem kunnen maken die goed bij de game past.`,
      en: `Between 4 and 7 July I focused on visual improvements, like button focus in the UI with tweens and custom colours for better feedback.

In the previous project I really struggled with the health system. This time I managed to build one that fits the game much better.`,
    },
  },
  {
    slug: "2025-05-01-2025-07-01-import-restructuring-movement-shooting",
    title: {
      nl: "Importfase, herstructurering, movement en shooting verbeterd",
      en: "Import phase, restructuring, better movement and shooting",
    },
    startDate: "2025-05-01",
    endDate: "2025-07-01",
    content: {
      nl: `In deze periode ben ik bezig geweest om alles van het vorige project wat nuttig is te importeren naar het nieuwe project. Dingen zoals alles wat met rigidbodies te maken heeft, hebben we niet geïmporteerd aangezien dat te complex was om het te laten werken want dat is erg zwaar voor een bullethell game.

Daarnaast heb ik gewerkt aan het verbeteren van de movement en shooting code, zodat het beter voelt om te spelen. Ook heb ik gewerkt aan een betere structuur voor de scripts, zodat het makkelijker is om dingen te vinden en aan te passen in de toekomst.`,
      en: `During this period I imported everything useful from the previous project into the new one. Anything related to rigidbodies was left behind because it was too complex and heavy for a bullet hell game.

I also improved the movement and shooting code so the game feels better to play, and reorganised the scripts to make future changes easier.`,
    },
  },
  {
    slug: "2025-04-26-frisse-start",
    title: {
      nl: "Frisse start: project opnieuw begonnen",
      en: "Fresh start: rebooting the project",
    },
    date: "2025-04-26",
    content: {
      nl: `Vandaag hebben we besloten om helemaal opnieuw te beginnen. Het vorige project was te rommelig geworden en we wilden een betere basis neerzetten.

We hebben alle belangrijke lessen meegenomen en nieuwe doelen gesteld. Nu hebben we een veel beter beeld van wat we willen bereiken en kunnen we gerichter werken aan de game.`,
      en: `Today we decided to start completely from scratch. The previous project had become too messy and we wanted a better foundation.

We kept the most important lessons and set new goals. Now we have a much clearer vision of what we want to build and can work on the game with more focus.`,
    },
  },
  {
    slug: "2025-04-16-physics-refactor-steam-auth",
    title: {
      nl: "Physics-refactor, stuiter-vijand en Steam-authenticatie",
      en: "Physics refactor, bouncing enemy and Steam auth",
    },
    startDate: "2025-04-14",
    endDate: "2025-04-16",
    content: {
      nl: `Ik ben verder gegaan met alles omzetten naar physics bodies. Dit was lastiger dan verwacht dus dat viel flink tegen. Ook is de oude auth code verwijderd en is er een begin gemaakt met Steam-authenticatie.`,
      en: `I continued converting everything to physics bodies. That turned out to be harder than expected. We also removed the old authentication code and started implementing Steam authentication.`,
    },
  },
  {
    slug: "2025-04-09-portal-steam-bouncer-rigidbody",
    title: {
      nl: "Portaal-effect, Steam-extensie, bouncer-vijand en physics-omschakeling",
      en: "Portal effect, Steam extension, bouncer enemy and physics overhaul",
    },
    startDate: "2025-04-04",
    endDate: "2025-04-09",
    content: {
      nl: `Vandaag werd alles flink omgegooid. Ik heb de player- en enemy-logica opgesplitst in aparte scripts voor betere organisatie. Ook heb ik gewerkt aan een soort portal effect zodat je tussen twee levels kan switchen met een smooth effect. Ook probeerde ik alles over te zetten naar rigidbodies maar dit is nog niet helemaal af.`,
      en: `Today was a big shake-up. I split the player and enemy logic into separate scripts to keep things organised. I also worked on a portal effect so you can smoothly switch between two levels. I tried moving everything over to rigidbodies as well, but that isn’t finished yet.`,
    },
  },
  {
    slug: "2025-04-03-upgrade-menu-cleanup",
    title: {
      nl: "Upgrade-menu compleet, code opgeschoond en labels bijgewerkt",
      en: "Upgrade menu complete, code cleanup and updated labels",
    },
    startDate: "2025-03-26",
    endDate: "2025-04-03",
    content: {
      nl: `Vandaag heb ik alle oude upgrade bestanden verwijderd en alle oude code die we niet meer gebruiken opgeruimd. Het upgrade-menu is nu compleet met alle functionaliteit, inclusief indicatoren of een upgrade betaalbaar is.`,
      en: `Today I removed all of the old upgrade files and cleaned up unused code. The upgrade menu is now complete with all functionality, including indicators that show whether you can afford an upgrade.`,
    },
  },
  {
    slug: "2025-03-13-shop-skilltree-upgrades",
    title: {
      nl: "Shop makeover, skill-tree zoom en upgrade-logica herschreven",
      en: "Shop makeover, skill tree zoom and rewritten upgrades",
    },
    startDate: "2025-03-13",
    endDate: "2025-03-17",
    content: {
      nl: `Ik ben de afgelopen dagen flink bezig geweest om de winkel een grafische make-over te geven, met nieuwe kaarten; het skill-tree-zoomen werd definitief gerepareerd. De upgrade-logica werd herschreven om nieuwe upgrades eenvoudiger in te voegen.`,
      en: `Over the past few days I gave the shop a major visual makeover with new cards. I finally fixed zooming in the skill tree and rewrote the upgrade logic so new upgrades are easier to add.`,
    },
  },
  {
    slug: "2025-03-09-wave-explosives-spawn",
    title: {
      nl: "Wave-systeem, explosievijanden en spawn-animaties",
      en: "Wave system, explosive enemies and spawn animations",
    },
    startDate: "2025-03-09",
    endDate: "2025-03-10",
    content: {
      nl: `Ik heb een begin gemaakt aan wat meer variatie in het spel, waaronder een wave-systeem, explosievijanden en spawn-animaties.`,
      en: `I started adding more variety to the game, including a wave system, explosive enemies, and spawn animations.`,
    },
  },
  {
    slug: "2025-03-03-backend-leaderboard-coins",
    title: {
      nl: "Backend veiligheid, zwevende coins en leaderboard live",
      en: "Backend security, floating coins and live leaderboard",
    },
    startDate: "2025-03-03",
    endDate: "2025-03-06",
    content: {
      nl: `Vandaag heeft Teun de veiligheid van de backend aangepast en het leaderboard systeem aan de backend toegevoegd. Ik ben bezig geweest met wat design fixes zoals de coins hebben nu een betere animatie en het leaderboard heeft nu ook een betere look met animations.`,
      en: `Today Teun improved the backend security and added the leaderboard system. I focused on design tweaks: the coins now have better animation and the leaderboard looks nicer with animations.`,
    },
  },
  {
    slug: "2025-03-01-2025-03-03-polishronde",
    title: {
      nl: "Grote polishronde: death-menu, slow-motion, audio en meer",
      en: "Major polish pass: death menu, slow motion, audio and more",
    },
    startDate: "2025-03-01",
    endDate: "2025-03-03",
    content: {
      nl: `Van 1 tot en met 3 maart ben ik bezig geweest met een grote polishronde. Het death-menu is uitgebreid en er is een slow-motion effect toegevoegd wanneer de speler doodgaat. Ook is er een audiosysteem opgezet en is er nu een login- en logoutknop aanwezig.

Daarnaast is het opslaan van ronde-data voorbereid. De intro-animaties zijn vloeiender gemaakt en instellingen worden nu persistent opgeslagen. De eerste basislevel en shopmenu’s zijn toegevoegd, de speler heeft een death-animatie gekregen en er is een Steam-knop in de UI verschenen.

Ook is de look en feel van de game verbeterd, ik heb gewerkt aan shaders en heb een vhs-effect toegevoegd met nog wat extra filters zoals, color abberation, pixelatie en reflecties.`,
      en: `From 1 to 3 March I did a big polish pass. The death menu is now more elaborate and there’s a slow-motion effect when the player dies. I set up the audio system and added login/logout buttons.

I prepared saving round data, smoothed out intro animations, and made settings persist. The first base level and shop menus are in, the player has a death animation, and there’s now a Steam button in the UI.

I also improved the look and feel with new shaders and added a VHS effect along with colour aberration, pixelation, and reflections.`,
    },
  },
  {
    slug: "2025-02-28-melee-side-character",
    title: {
      nl: "Melee aanval voor side character",
      en: "Melee attack for the side character",
    },
    date: "2025-02-28",
    content: {
      nl: `Ik heb de melee aanval voor het side character gemaakt. We hebben nu besloten dat de topdown character alleen een gun krijgt en de side character alleen een melee wapen. Dit maakt het verschil tussen de twee perspectieven duidelijker en zorgt voor meer variatie in de gameplay.

Teun heeft vandaag resolutie proberen toe te voegen alleen met fullscreen ging het niet helemaal goed. We hebben besloten dat er geen optie komt om je resolutie aan te passen, maar voor nu alleen fullscreen en de max framerate.`,
      en: `I implemented the melee attack for the side character. We decided the top-down character only gets a gun and the side character only gets a melee weapon. That makes the difference between the two perspectives clearer and adds variety to the gameplay.

Teun tried to add resolution settings today, but fullscreen didn’t work properly. We decided to keep it simple for now with fullscreen and a max framerate option.`,
    },
  },
  {
    slug: "2025-02-25-2025-02-27-gameplay-enemies-upgrades",
    title: {
      nl: "Gameplay uitbreidingen: fixes, enemies en upgrades",
      en: "Gameplay updates: fixes, enemies and upgrades",
    },
    startDate: "2025-02-25",
    endDate: "2025-02-27",
    content: {
      nl: `Van 25 tot en met 27 februari kreeg de game meer inhoud en logica. Ik verbeterde de player-functionaliteit en loste bugs in het login-menu op. Daarna maakte ik de eerste enemy die de speler aanvalt, met coins die droppen als hij gekild wordt. Op 27 februari werd de eerste werkende upgrade-functionaliteit toegevoegd, waaronder snelheid en damage, en paste Teun de backend aan zodat upgrades ook opgeslagen konden worden in de database.`,
      en: `Between 25 and 27 February the game gained a lot of content and logic. I improved the player functionality, fixed login menu bugs, and created the first enemy that attacks the player with coins dropping on defeat. On 27 February I added the first working upgrades—like speed and damage—and Teun updated the backend so upgrades could be stored in the database.`,
    },
  },
  {
    slug: "2025-02-21-2025-02-24-menus-settings",
    title: {
      nl: "Menus en settings: death-menu en fullscreen-opties",
      en: "Menus and settings: death menu and fullscreen options",
    },
    startDate: "2025-02-21",
    endDate: "2025-02-24",
    content: {
      nl: `In deze periode zijn de eerste menu’s opgezet. Op 21 februari maakte Teun een eenvoudig death-menu, vooral als oefening in Godot. Paar dagen later, op 24 februari, begon ik aan een settingsmenu toevoegen waarmee fullscreen en framerate ingesteld konden worden, al werkte resolutie toen nog niet goed.`,
      en: `This period was about setting up the first menus. On 21 February Teun created a simple death menu to practice in Godot. A few days later, on 24 February, I started on a settings menu for fullscreen and framerate, although resolution didn’t work properly yet.`,
    },
  },
  {
    slug: "2025-02-17-2025-02-20-fundamenten",
    title: {
      nl: "Eerste fundamenten: idee, HTTP-requests, player updates en login",
      en: "Foundations: concept, HTTP requests, player updates and login",
    },
    startDate: "2025-02-17",
    endDate: "2025-02-20",
    content: {
      nl: `De eerste dagen hebben we ons volledig gefocust op de basis te bedenken/maken. Op 17 februari ontstond het idee om een game te maken waarin je wisselt tussen topdown en side-scrolling perspectief, en werd de eerste versie van de spelers geïmplementeerd.

Een dag later kwamen de eerste HTTP-requests erbij. Op 19 februari maakte ik de speler dash- en schietfunctionaliteit. En op 20 februari werd het eerste login-systeem gebouwd, ik deed de frontend hiervoor en Teun de backend, en ik bedacht de eerste ideeën voor een upgradesysteem, we wisten hier nog niet precies hoe we dit wilden aanpakken.`,
      en: `We spent the first few days defining the core. On 17 February we came up with the idea of a game that switches between top-down and side-scrolling perspectives, and implemented the first version of the players.

The next day we added the first HTTP requests. On 19 February I implemented dash and shooting for the player. On 20 February we built the first login system—Teun handled the backend and I took care of the frontend—and we brainstormed the first upgrade system ideas, even though we weren’t sure about the final approach yet.`,
    },
  },
  {
    slug: "2025-02-16-init",
    title: {
      nl: "Start van het project",
      en: "Project kickoff",
    },
    date: "2025-02-16",
    content: {
      nl: `Ik en mijn klasgenoot Teun zijn begonnen met het ontwikkelen van het project.

We hadden het idee om een game te maken met een leaderboard, we hebben laravel hiervoor gekozen als backend aangezien we hier al bekend mee waren.
Steam heeft een gratis SDK voor het implementeren van leaderboards, maar Teun wou dit liever zelf implementeren.`,
      en: `My classmate Teun and I started developing the project.

We wanted to build a game with a leaderboard and chose Laravel for the backend because we already knew it.
Steam offers a free SDK for leaderboards, but Teun preferred to implement it himself.`,
    },
  },
];
