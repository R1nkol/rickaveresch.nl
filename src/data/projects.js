export const projects = [
  {
    slug: "shft",
    title: { nl: "SHFT", en: "SHFT" },
    description: {
      nl: "Mijn eerste project dat ik professioneel wil uitbrengen op Steam.",
      en: "My first project that I want to release professionally on Steam.",
    },
    imageSrc: "/Images/SHFT.png",
    link: "/projects/shft",
    tags: ["Godot"],
    badge: { nl: "Nu in ontwikkeling!", en: "Currently in development!" },
    details: {
      nl: [
        "SHFT is een project dat ik aan het ontwikkelen ben. Het project is nog erg vroeg in ontwikkeling. Het concept draait om het wisselen tussen twee genres: een topdown bullet-hell waarin je constant op enemies moet schieten, en een 2D sideview platformer survival waarin je juist moet focussen op het ontwijken van de enemies. Tijdens het spelen kun je upgrades kopen voor je personage, die het spel makkelijker kunnen maken, maar soms kunnen er ook nadelen aan zitten.",
        "Op dit moment ben ik druk bezig om de game veel meer persoonlijkheid te geven. Omdat het vorige project een rommel was geworden, ben ik helemaal opnieuw begonnen om alles vanaf het begin goed op te bouwen. Ook de naam is gewijzigd van Versura naar SHFT, al weten we nog niet zeker of dat de definitieve naam blijft. Door deze herstart duurt het ontwikkelen iets langer dan oorspronkelijk gepland, maar het uiteindelijke doel is nog steeds om de game op Steam uit te brengen.",
        "De afbeelding van de gameplay is nog van het oude project en niet helemaal accuraat meer, maar geeft wel een idee van hoe de gameplay eruit kan zien.",
      ],
      en: [
        "SHFT is a project I’m actively developing and it’s still in a very early stage. The core concept is switching between two genres: a top-down bullet hell where you constantly shoot enemies, and a 2D side-view platformer survival mode where dodging enemies is the focus. While playing you can buy upgrades for your character that make things easier, but some of them also come with downsides.",
        "Right now I’m giving the game much more personality. The previous version turned into a mess, so I restarted the entire project to rebuild everything properly from scratch. The name also changed from Versura to SHFT, although that might still change. Because of this reboot development is taking a bit longer than planned, but the end goal is still to release the game on Steam.",
        "The gameplay image is from the older project and isn’t fully accurate anymore, but it still gives an idea of what the gameplay could look like.",
      ],
    },
    technologies: ["Godot"],
    heroImage: "/Images/SHFT.png",
    gallery: ["/Images/SHFT.png", "/Images/SHFT_1.png", "/Images/Versura.png"],
    extraLinks: [
      { href: "/projects/shft/blog", label: { nl: "SHFT Blog", en: "SHFT Blog" } },
    ],
  },
  {
    slug: "cyberbox",
    title: { nl: "CyberBox", en: "CyberBox" },
    description: {
      nl: "Mijn eerste uitgebreide project met Godot.",
      en: "My first large-scale project made with Godot.",
    },
    imageSrc: "/Images/CyberBox.png",
    link: "/projects/cyberbox",
    tags: ["Godot"],
    badge: { nl: "Speelbare demo!", en: "Playable demo!" },
    details: {
      nl: [
        "Cyberbox was mijn eerste grote project met Godot. Het was een puzzle platformer waarmee ik begon in 2021. Het was een physics based puzzle platformer, waarbij je een beetje out of the box moest denken om levels op te lossen om verder te komen in het spel.",
        "Op dit moment ben ik bezig om de game te recreëren zodat je het in de browser kan spelen. Zo heel ver ben ik daar nog niet mee, maar je kan het eerste level al wel spelen. Zodat je een beetje een idee hebt hoe de game eruit ziet, wat de artstyle is en hoe de mechanics werken.",
        "Het was een project waar ik veel van heb geleerd, helemaal omdat ik toen ik dit startte nog niet op school zat voor enige vorm van development. Helaas is dit project nooit afgekomen omdat ik gewoon te grote plannen had, maar ik ben er nog steeds trots op.",
      ],
      en: [
        "CyberBox was my first big project in Godot. I started it in 2021 as a physics-based puzzle platformer where you have to think outside the box to solve levels and progress.",
        "I’m currently recreating the game so it can run in the browser. It’s still early, but you can already play the first level to get a feel for the visuals and mechanics.",
        "I learned a lot from this project, especially because when I started it I wasn’t yet studying any form of development at school. The project never reached completion because my ambitions were a bit too big, but I’m still proud of it.",
      ],
    },
    technologies: ["Godot"],
    heroImage: "/Images/CyberBox.png",
    gallery: ["/Images/CyberBox_1.png", "/Images/CyberBox_2.png", "/Images/CyberBox_3.png"],
    extraLinks: [
      { href: "/projects/cyberbox/game", label: { nl: "Speel CyberBox!", en: "Play CyberBox!" } },
    ],
  },
  {
    slug: "pureduels",
    title: { nl: "Pure Duels", en: "Pure Duels" },
    description: {
      nl: "Een eenvoudige lokale multiplayer brawler.",
      en: "A simple local multiplayer brawler.",
    },
    imageSrc: "/Images/PureDuels.png",
    link: "/projects/pureduels",
    tags: ["Godot"],
    badge: { nl: "Speelbare demo!", en: "Playable demo!" },
    details: {
      nl: [
        "Pure duels heb ik als passieproject voor mezelf gemaakt om nou te kijken wat ik allemaal kon maken met Godot.",
        "Het spel heb ik in begin 2023 gemaakt en ben er 2 weekjes mee bezig geweest. Ik heb toen die tijd veel assets van CyberBox hergebruikt, maar het hele idee achter Pure Duels is heel anders dan CyberBox.",
        "In de lokale versie van Pure Duels was lokale multiplayer mogelijk, maar toen ik het in de browserversie uitprobeerde, merkte ik dat de code die ik daarvoor had geschreven niet werkte in de browser. Vandaar dat de tweede speler nu alleen maar stil staat.",
        "Later zou ik graag nog zo'n soort spel maken, met de simpele stijl die ik in dit project heb gebruikt. Maar eerst wil ik me focussen op SHFT.",
        "Hoewel ik met CyberBox een webversie heb gemaakt, is Pure Duels gewoon een simpele port. Het kan dus zijn dat het niet helemaal soepel loopt in de browser. Dit komt omdat het project effecten bevat die wat zwaarder zijn voor de browser om te verwerken. Dit is te veranderen in de settings.",
      ],
      en: [
        "I built Pure Duels as a passion project to see what I could create with Godot on my own.",
        "I made the game in early 2023 over the course of two weeks. I reused quite a few assets from CyberBox, but the idea behind Pure Duels is completely different.",
        "The local version originally supported multiplayer, but when I ported it to the browser I discovered the multiplayer code didn’t work there. That’s why the second player just stands still in the web build.",
        "I’d love to make another game like this with the same simple style, but first I want to focus on SHFT.",
        "Unlike CyberBox, Pure Duels is basically a straightforward port. It might not run perfectly smoothly in the browser because some of the effects are demanding. You can tweak this in the settings.",
      ],
    },
    technologies: ["Godot"],
    heroImage: "/Images/PureDuels.png",
    gallery: [
      "/Images/PureDuels_5.png",
      "/Images/PureDuels_1.png",
      "/Images/PureDuels_2.png",
      "/Images/PureDuels_3.png",
      "/Images/PureDuels_4.png",
      "/GIFS/PureDuelsGIF.gif",
    ],
    extraLinks: [
      { href: "/projects/pureduels/game", label: { nl: "Speel Pure Duels!", en: "Play Pure Duels!" } },
    ],
  },
  {
    slug: "project-zuna",
    title: { nl: "Project Zuna", en: "Project Zuna" },
    description: {
      nl: "Eerste site waar ik Next.js met database integratie gebruikte.",
      en: "My first site using Next.js with database integration.",
    },
    imageSrc: "/Images/ProjectZuna_1.png",
    link: "/projects/project-zuna",
    tags: ["Next.js", "React", "TypeScript", "MySQL"],
    badge: { nl: "Bezoekbare website", en: "Visit the website!" },
    details: {
      nl: [
        "Project Zuna is een site gemaakt voor Dolf en Floris Wardenaar. Zij wilden een groot feest geven in hun schuur omdat Floris 20 werd en voor zijn opleiding slaagde en Dolf werd 25.",
        "Ik heb de site gemaakt met Next.js en een MySQL database. Op de site konden mensen zich inschrijven voor het feest en aangeven voor welk muziekgenre ze het meest hyped waren. Ook konden ze een bericht achterlaten voor Dolf en Floris.",
        "Ik heb veel van dit project geleerd, ik ben beter geworden in het gebruiken van Canvas voor achtergrond­effecten, en heb hierdoor ook eindelijk ervaring opgedaan met de database-kant van Next.js. Dankzij dit project heb ik nu ook een database­connectie opgezet met mijn eigen website, omdat ik nu precies weet hoe je dat met Next.js configureert en integreert."
      ],
      en: [
        "Project Zuna is a site I built for Dolf and Floris Wardenaar. They wanted to throw a big party in their barn to celebrate Floris turning 20 and graduating, and Dolf turning 25.",
        "I created the site using Next.js and a MySQL database. Visitors could sign up for the party and indicate which music genre they were most excited about. They could also leave a message for Dolf and Floris.",
        "I learned a lot from this project, improving my skills with Canvas for background effects, and gaining experience with the database side of Next.js. Thanks to this project, I was able to set up a database connection for my own website, as I now know exactly how to configure and integrate it with Next.js."
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "MySQL"],
    heroImage: "/Images/ProjectZuna_1.png",
    gallery: [],
    extraLinks: [
      { href: "https://www.projectzuna.nl/", label: { nl: "Ga naar de website", en: "Visit the website" } },
    ],

  },
  {
    slug: "apkapot",
    title: { nl: "APKapot", en: "APKapot" },
    description: {
      nl: "Een school project waarbij we een APK keuring website hebben gemaakt.",
      en: "A school project where we built an MOT inspection website.",
    },
    imageSrc: "/Images/APKapot_1.png",
    link: "/projects/apkapot",
    tags: ["Laravel", "TypeScript", "MySQL", "API", "Vue"],
    details: {
      nl: [
        "APKapot is een schoolproject dat we in een team van drie hebben ontwikkeld: een complete website voor het plannen en beheren van APK-keuringen.",
        "Klanten kunnen eenvoudig online een afspraak plannen, waarna een manager deze goedkeurt en een monteur toewijst. De monteur voert de keuring uit, maakt werkorders aan en doet indien nodig reparaties met toestemming van de klant. Na afronding ontvangt de klant automatisch een e-mail via Resend en stelt de manager de factuur op.",
        "We hebben o.a. Resend gebruikt voor e-mails, de Google Search Console API voor alle images van de auto's, de ChatGPT API voor een klantenservice, de RDW API voor voertuigdata en Amazon S3 voor veilige opslag van afbeeldingen.",
      ],
      en: [
        "APKapot is a school project we built with a team of three, a full platform for scheduling and managing Dutch MOT inspections.",
        "Customers can easily book an appointment online. A manager approves the booking, assigns a mechanic, and the mechanic performs the inspection, creates work orders, and handles any repairs with the customer’s approval. Once finished, the customer automatically receives an email via Resend and the manager prepares the invoice.",
        "We used Resend for email, the Google Search Console API to fetch car images, the ChatGPT API for customer support, the Dutch RDW API for vehicle data, and Amazon S3 for secure image storage.",
      ],
    },
    technologies: ["Laravel", "TypeScript", "MySQL", "API", "Vue"],
    heroImage: "/Images/APKapot_1.png",
    gallery: ["/Images/APKapot_2.png", "/Images/APKapot_3.png", "/Images/APKapot_4.png"],
  },
  {
    slug: "songswipe",
    title: { nl: "Song swipe", en: "Song swipe" },
    description: {
      nl: "Mijn eerste project waarbij ik heb gewerkt met een externe API.",
      en: "My first project where I worked with an external API.",
    },
    imageSrc: "/Images/SongSwipe.png",
    link: "/projects/songswipe",
    tags: ["Laravel", "MySQL", "API"],
    details: {
      nl: [
        "SongSwipe was een schoolproject dat we in groepen van drie hebben uitgevoerd. De klas mocht zelf een projectidee kiezen dat we interessant vonden om te maken.",
        "Uiteindelijk kozen we voor ‘SongSwipe’, een soort Tinder voor muziek, waarbij je nummers kunt swipen op basis van wat je leuk vind. Hiervoor maakten we gebruik van de Spotify API.",
        "Het was voor mij de eerste keer dat ik met een externe API werkte, wat het project extra uitdagend en leerzaam maakte. We hebben veel tijd gestoken in het begrijpen en toepassen van de API, en ik vond het een erg leuke ervaring.",
      ],
      en: [
        "SongSwipe was a school project we tackled in teams of three. The class could pitch ideas we were excited to build.",
        "We ended up with ‘SongSwipe’, basically Tinder for music, where you swipe through tracks you like. We integrated the Spotify API to make it work.",
        "It was my first time working with an external API, which made the project both challenging and educational. We spent a lot of time understanding and using the API, and I really enjoyed the experience.",
      ],
    },
    technologies: ["Laravel", "MySQL", "Spotify API"],
    heroImage: "/Images/SongSwipe.png",
    gallery: [],
  },
  {
    slug: "blog-site",
    title: { nl: "Blog site", en: "Blog site" },
    description: {
      nl: "Een eenvoudige blog site gemaakt met Laravel.",
      en: "A simple blog website built with Laravel.",
    },
    imageSrc: "/Images/BlogSite1.png",
    link: "/projects/blog-site",
    tags: ["Laravel", "TypeScript", "Vue", "MySQL"],
    details: {
      nl: [
        "Dit was een klein project die ik op stage bij RohaanIT moest maken om kennis te maken met hun stijl en manier van coderen.",
        "Het is een simpele versie van een blog/social media site, waarbij je posts kan maken, liken, reageren, op die reacties kan reageren en liken en waar je kan volgen en ontvolgen.",
        "Het was een leuk project om een weekje aan te werken en heb er veel van geleerd. Hiervoor had ik nog niet heel veel ervaring met TypeScript en Vue, dus dat was een leuke uitdaging.",
      ],
      en: [
        "This was a small project I created during my internship at RohaanIT to get familiar with their coding style.",
        "It’s a simple blog / social media site where you can create posts, like them, comment, reply to comments, and follow or unfollow other users.",
        "It was a fun week-long project and I learned a lot from it. Before this I didn’t have much experience with TypeScript and Vue, so it was a great challenge.",
      ],
    },
    technologies: ["Laravel", "TypeScript", "Vue", "MySQL"],
    heroImage: "/Images/BlogSite1.png",
    gallery: [
      "/Images/BlogSite1.png",
      "/Images/BlogSite2.png",
      "/Images/BlogSite3.png",
      "/Images/BlogSite4.png",
      "/Images/BlogSite5.png",
    ],
  },
  {
    slug: "cavegame",
    title: { nl: "Cave Game", en: "Cave Game" },
    description: {
      nl: "Een 2D-platformer waarin je levels aanpast om grondstoffen te verzamelen.",
      en: "A 2D platformer where you reshape levels to gather resources.",
    },
    imageSrc: "/Images/CaveGame.png",
    link: "/projects/cavegame",
    tags: ["Godot"],
    details: {
      nl: [
        "Dit is een project waar ik een tijd aan heb gewerkt. Het idee was om een platformer te maken waarin je je een weg door de levels hakt om verder te komen en onderweg resources verzamelt. Ik ben uiteindelijk gestopt met dit project, vooral omdat ik het moeilijk vond om een passende artstyle te vinden waar ik tevreden over was. Rond die tijd begon ik ook aan mijn andere project, Versura, waardoor de focus verschoof.",
        "Dit project heeft me wel veel geleerd over de Godot engine, bijvoorbeeld hoe je een inventory systeem kan maken, hoe de speler een level kan hakken (een level kan aanpassen in game) en hoe ik dan die aangepaste levels kan opslaan.",
      ],
      en: [
        "This is a project I spent quite some time on. The idea was a platformer where you carve your way through levels to progress while collecting resources. I eventually stopped because I struggled to find an art style I was happy with, and around that time I started working on my other project, Versura, which shifted my focus.",
        "The project still taught me a lot about the Godot engine, how to build an inventory system, how to let the player modify levels in-game, and how to save those altered levels.",
      ],
    },
    technologies: ["Godot"],
    heroImage: "/Images/CaveGame.png",
    gallery: [
      "/Images/CaveGame_1.png",
      "/Images/CaveGame_2.png",
      "/Images/CaveGame_3.png",
    ],
  },
  {
    slug: "eventplay",
    title: { nl: "MBO EventPlay", en: "MBO EventPlay" },
    description: {
      nl: "Mijn eerste solo-project waarbij ik gebruik heb gemaakt van Laravel.",
      en: "My first solo project built with Laravel.",
    },
    imageSrc: "/Images/EventPlay.png",
    link: "/projects/eventplay",
    tags: ["Laravel", "Tailwind", "MySQL"],
    details: {
      nl: [
        "EventPlay was een solo schoolproject en mijn eerste ervaring met het zelfstandig ontwikkelen van een volledige webapplicatie. Het idee achter het project was om een platform te bouwen waarmee scholen sportevenementen konden organiseren, waarbij leerlingen zich konden inschrijven voor verschillende activiteiten.",
        "Het hoofddoel was om een functionerend systeem te maken met een automatisch gegenereerd bracket-systeem. Leerlingen konden eenvoudig via een bestand worden toegevoegd, in plaats van handmatig invoeren. Naast het standaard bracket-algoritme heb ik ook een extra wedstrijdvorm toegevoegd: een knock-outronde waarbij iedere deelnemer één keer tegen alle anderen speelde. Degene met de meeste overwinningen werd de uiteindelijke winnaar.",
        "Dit project was voor mij erg leerzaam, vooral omdat ik het volledig zelfstandig moest ontwerpen, bouwen en afronden. Het gaf me een goed beeld van hoe het is om een project van begin tot eind uit te voeren, zonder dat taken onder meerdere mensen verdeeld zijn.",
      ],
      en: [
        "EventPlay was a solo school project and my first time independently developing a full web application. The idea was to build a platform that schools could use to organize sports events, allowing students to register for different activities.",
        "The main goal was to create a working system with an automatically generated bracket. Students could be imported from a file instead of entering them manually. On top of the standard bracket algorithm I added another competition format: a knockout round where every participant plays everyone else once, and the player with the most wins becomes the overall winner.",
        "The project was very educational because I had to design, build, and finish everything on my own. It gave me a clear understanding of what it’s like to execute a project from start to finish without dividing tasks among multiple people.",
      ],
    },
    technologies: ["Laravel", "Tailwind", "MySQL"],
    heroImage: "/Images/EventPlay.png",
    gallery: [],
  },
  {
    slug: "chatapp",
    title: { nl: "Chat app", en: "Chat app" },
    description: {
      nl: "Een chatapplicatie ontwikkeld in C# met behulp van ASP.NET.",
      en: "A chat application built in C# using ASP.NET.",
    },
    imageSrc: "/Images/PapenChat.png",
    link: "/projects/chatapp",
    tags: ["C#", "ASP.NET", "DotNet"],
    details: {
      nl: [
        "Voor school kregen we de opdracht om een chatapplicatie te ontwikkelen waarin gebruikers vrienden konden toevoegen, uitnodigingen konden versturen en met elkaar konden chatten. We begonnen met een team van vijf personen, maar doordat twee groepsleden uitvielen, hebben we het project uiteindelijk met z’n drieën afgerond.",
        "De backend van de applicatie hebben we ontwikkeld in C# met behulp van ASP.NET. Dit was voor ons erg wennen, aangezien we tot dat moment voornamelijk met Laravel werkten.",
        "Ondanks dat de chatapp aan het einde nog niet volledig functioneel was, hebben we toch interessante onderdelen weten te implementeren. Zo hebben we onder andere geëxperimenteerd met het integreren van een AI-chatbot, geïnspireerd op de AI-functie van Snapchat.",
      ],
      en: [
        "For school we had to build a chat application where users could add friends, send invitations, and chat with each other. We started with a team of five, but after two members dropped out we finished the project with just three people.",
        "We built the backend in C# with ASP.NET. That took some getting used to, because up to that point we mainly worked with Laravel.",
        "Even though the chat app wasn’t completely finished, we still implemented some interesting features, including an experiment with integrating an AI chatbot inspired by Snapchat’s AI feature.",
      ],
    },
    technologies: ["C#", "DotNet"],
    heroImage: "/Images/PapenChat.png",
    gallery: [],
  },
];
