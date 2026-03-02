export interface Article {
  slug: string;
  titre: string;
  date: string;
  categorie: string;
  extrait: string;
  contenu: string;
  image: string;
  tempsLecture: number;
}

export const articles: Article[] = [
  {
    slug: "secrets-pate-parfaite",
    titre: "Les secrets d'une pâte parfaite",
    date: "2024-01-15",
    categorie: "Technique",
    extrait:
      "La pâte à pizza est une science autant qu'un art. Découvrez comment le choix de la farine, l'hydratation et la fermentation longue transforment une simple pâte en quelque chose d'exceptionnel.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200",
    tempsLecture: 5,
    contenu: `
      <h2>Le choix de la farine : la base de tout</h2>
      <p>La farine Tipo 00 est le secret bien gardé de tous les grands pizzaïolos italiens. Contrairement à la farine ordinaire, la Tipo 00 est moulue très finement — le "00" désigne le degré de raffinage le plus élevé de la classification italienne. Cette finesse exceptionnelle donne à la pâte une texture soyeuse, presque veloutée, qui s'étire sans se déchirer.</p>
      <p>Sa teneur en protéines, comprise entre 11 et 13%, permet de développer un réseau de gluten solide mais élastique. Ce réseau est ce qui retient les bulles de gaz produites par la fermentation, créant cette structure alvéolée si caractéristique de la vraie pizza napolitaine.</p>
      <blockquote>
        <p>"La qualité de la farine représente 40% du résultat final. On ne fait pas une grande pizza avec une farine ordinaire."</p>
        <cite>— Claudia, fondatrice du Four de Claudia</cite>
      </blockquote>

      <h2>L'hydratation : l'équilibre délicat</h2>
      <p>L'hydratation d'une pâte à pizza — c'est-à-dire la quantité d'eau par rapport à la farine — est l'un des facteurs les plus critiques. Chez Le Four de Claudia, nous travaillons avec un taux d'hydratation de 65 à 68%, ce qui est légèrement supérieur à la moyenne.</p>
      <p>Une pâte plus hydratée est certes plus difficile à travailler — elle colle, elle se dérobe — mais le résultat est incomparable. La croûte est plus légère, plus aérée, avec une mâche qui alterne entre le croustillant de l'extérieur et le moelleux de l'intérieur. C'est ce contraste de textures qui fait toute la différence.</p>
      <ul>
        <li><strong>55-60% d'hydratation</strong> : pâte ferme, facile à étaler, croûte dense</li>
        <li><strong>60-65% d'hydratation</strong> : équilibre classique napolitain</li>
        <li><strong>65-70% d'hydratation</strong> : pâte extensible, croûte légère et alvéolée</li>
        <li><strong>70%+ d'hydratation</strong> : pâte très collante, réservée aux experts</li>
      </ul>

      <h2>La fermentation longue : patience et complexité</h2>
      <p>Si il y a un secret que les pizzaïolos professionnels gardent jalousement, c'est celui de la fermentation. Chez nous, la pâte repose pendant <strong>48 à 72 heures au réfrigérateur</strong> — une fermentation à froid qui transforme profondément la chimie de la pâte.</p>
      <p>Pendant cette longue maturation, les levures et les bactéries lactiques travaillent lentement. Elles décomposent les sucres complexes, développent des acides organiques (lactique et acétique) qui donnent cette légère acidité si caractéristique, et produisent des arômes qui n'existent tout simplement pas dans une pâte faite à la dernière minute.</p>
      <p>La fermentation longue a aussi un effet sur la digestibilité : les enzymes décomposent partiellement le gluten, rendant la pizza plus légère et moins "lourde" sur l'estomac. C'est pourquoi on peut manger une pizza napolitaine le soir et se sentir léger le lendemain matin.</p>

      <h2>Le pétrissage : construire le réseau de gluten</h2>
      <p>Le pétrissage est l'étape où l'on "construit" littéralement la structure de la pâte. Le gluten — ce réseau de protéines qui donne à la pâte son élasticité — se développe par le mouvement mécanique du pétrissage.</p>
      <p>La méthode traditionnelle napolitaine privilégie un pétrissage à la main, d'abord en pliant et repliant la pâte, puis en travaillant de l'extérieur vers l'intérieur dans un mouvement circulaire. Ce geste, transmis de génération en génération, permet de sentir sous les paumes la pâte se transformer progressivement : d'abord rugueuse et collante, elle devient lisse, élastique, presque vivante.</p>
      <p>Après le pétrissage, vient le repos — un premier repos de 30 minutes (le "pointage") avant de diviser la pâte en pâtons individuels. Ces pâtons seront ensuite placés dans des boîtes hermétiques et envoyés au réfrigérateur pour leur longue fermentation.</p>

      <h2>L'étalage : les mains, jamais le rouleau</h2>
      <p>La dernière étape avant la garniture est l'étalage — et ici, le rouleau à pâtisserie est strictement interdit. Le rouleau écrase les bulles de gaz accumulées pendant la fermentation, détruisant tout le travail précédent.</p>
      <p>L'étalage à la main, en faisant tourner la pâte et en la soulevant pour la laisser s'étirer par gravité, préserve toutes ces précieuses alvéoles. C'est une technique qui demande de la pratique, mais qui fait toute la différence dans la texture finale de la pizza.</p>
    `,
  },
  {
    slug: "cuisson-feu-de-bois",
    titre: "Pourquoi la cuisson au feu de bois change tout",
    date: "2024-02-08",
    categorie: "Tradition",
    extrait:
      "À 400°C, la magie opère en 90 secondes. Découvrez la science et la poésie de la cuisson au four à bois — pourquoi cette méthode millénaire reste irremplaçable.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200",
    tempsLecture: 4,
    contenu: `
      <h2>400°C : une chaleur que les fours modernes ne peuvent pas atteindre</h2>
      <p>Un four à pizza professionnel au gaz atteint au maximum 300°C. Un four à bois traditionnel, lui, monte facilement à 400°C et peut même atteindre 450°C lorsque le feu est à son apogée. Cette différence de température peut sembler anodine, mais elle change absolument tout au résultat final.</p>
      <p>La chaleur d'un four à bois agit sur trois niveaux simultanément : la chaleur directe du sol en pierre réfractaire, qui cuit la base de la pizza ; la chaleur rayonnée par la voûte du four, qui cuit le dessus ; et la chaleur convective de l'air chaud chargé de vapeur et de fumée, qui enveloppe la pizza de toutes parts.</p>
      <blockquote>
        <p>"Le four à bois, c'est un instrument de musique. Il faut l'apprivoiser, apprendre à lire la couleur des flammes, sentir la chaleur avec sa peau."</p>
        <cite>— Claudia</cite>
      </blockquote>

      <h2>La réaction de Maillard : l'origine du goût</h2>
      <p>La réaction de Maillard est une réaction chimique qui se produit lorsque des acides aminés et des sucres réducteurs sont exposés à une chaleur intense. C'est elle qui est responsable du brunissement et des arômes complexes dans le pain grillé, la viande saisie, le café torréfié — et bien sûr, la pizza cuite au feu de bois.</p>
      <p>À 400°C, cette réaction se produit presque instantanément sur la pâte, créant ces petites taches noires caractéristiques — le "leopardage" — qui sont la marque d'une vraie pizza napolitaine. Ces taches ne sont pas des brûlures : elles concentrent des centaines de composés aromatiques différents qui font la complexité gustative incomparable d'une pizza au feu de bois.</p>

      <h2>90 secondes : la cuisson éclair</h2>
      <p>C'est l'une des données les plus surprenantes pour les non-initiés : une pizza dans un four à bois à 400°C cuit en <strong>60 à 90 secondes</strong>. Pas 10 minutes, pas 15 minutes — 90 secondes.</p>
      <p>Cette cuisson ultra-rapide a plusieurs conséquences remarquables. La garniture n'a pas le temps de sécher ou de surcuire — la tomate reste vive et acidulée, la mozzarella fond mais garde sa fraîcheur laiteuse, les herbes gardent leur couleur et leur parfum. La pâte, elle, est saisie si rapidement à l'extérieur qu'elle garde une humidité résiduelle à l'intérieur, créant ce contraste entre le croustillant de la croûte et le moelleux du cœur.</p>
      <p>Pour réussir cette cuisson éclair, le pizzaïolo doit tourner la pizza à mi-cuisson avec une pelle en métal — la <em>paletta</em> — pour assurer une cuisson uniforme malgré l'asymétrie de la chaleur dans le four.</p>

      <h2>Les arômes de fumée : une signature irremplaçable</h2>
      <p>Le bois que nous utilisons n'est pas choisi au hasard. Nous privilégions des bois durs — chêne, hêtre, parfois un peu de pommier pour les soirées spéciales — qui brûlent longtemps, produisent peu de fumée noire, et dégagent une chaleur intense et stable.</p>
      <p>Ces bois libèrent pendant la combustion des composés phénoliques — gaïacol, syringol — qui se déposent sur la pizza et lui donnent cette légère note fumée, terreuse, qui est absolument impossible à reproduire autrement. C'est cette signature aromatique qui fait qu'une pizza au feu de bois est reconnaissable entre mille, même les yeux fermés.</p>

      <h2>L'âme du four</h2>
      <p>Après 25 ans d'utilisation, notre four à bois a développé ce que les Italiens appellent l'"âme" — les parois en briques réfractaires ont absorbé des années de feux, de pizzas, de vapeur. La pierre elle-même est imprégnée d'arômes. Chaque pizza que nous cuisons bénéficie de ce patrimoine invisible.</p>
      <p>C'est pourquoi les grands fours à pizza napolitains se transmettent de génération en génération, et pourquoi, malgré tous les progrès technologiques, aucun four électrique ou à gaz n'a jamais vraiment réussi à reproduire ce que seul le feu de bois peut offrir.</p>
    `,
  },
  {
    slug: "tomates-san-marzano",
    titre: "La tomate San Marzano : reine de la sauce",
    date: "2024-04-10",
    categorie: "Ingrédients",
    extrait:
      "Longues, charnues, presque sans graines — les tomates San Marzano ne ressemblent à aucune autre. Découvrez pourquoi elles sont protégées par une DOP et pourquoi aucune autre tomate ne leur arrive à la cheville sur une pizza.",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200",
    tempsLecture: 4,
    contenu: `
      <h2>Une tomate pas comme les autres</h2>
      <p>La San Marzano est une variété de tomate allongée, cultivée exclusivement dans la plaine du Sarno, en Campanie, au pied du Vésuve. Ce terroir volcanique unique — un sol riche en minéraux, un microclimat sec et ensoleillé, une eau légèrement minérale — donne à ces tomates des caractéristiques gustatives que l'on ne retrouve nulle part ailleurs dans le monde.</p>
      <p>Visuellement, elles se distinguent immédiatement : plus longues que larges, à la peau fine et rouge profond, avec très peu de graines et une chair dense, presque sèche. C'est précisément cette faible teneur en eau et en graines qui les rend si précieuses pour la pizza : elles donnent une sauce concentrée, naturellement sucrée, avec une acidité équilibrée qui n'écrase jamais les autres saveurs.</p>
      <blockquote>
        <p>"Quand on pose de bonnes San Marzano sur une pâte, la pizza est déjà à moitié réussie."</p>
        <cite>— Claudia</cite>
      </blockquote>

      <h2>La DOP : une protection méritée</h2>
      <p>Depuis 1996, la <em>Pomodoro San Marzano dell'Agro Sarnese-Nocerino</em> bénéficie d'une Désignation d'Origine Protégée (DOP). Ce label garantit que les tomates sont cultivées dans une zone géographique précisément délimitée, selon des méthodes traditionnelles — cueillette à la main, tri manuel, mise en conserve dans le jus naturel de la tomate sans conservateur ni colorant.</p>
      <p>Malheureusement, la réputation des San Marzano a aussi engendré une multitude de contrefaçons. Sur le marché mondial, on trouve des milliers de boîtes portant ce nom mais ne contenant aucune vraie San Marzano DOP. La seule façon de s'assurer de l'authenticité est de vérifier la présence du logo DOP sur la boîte et du numéro de lot traçable jusqu'à la coopérative productrice.</p>

      <h2>Comment on les travaille chez Claudia</h2>
      <p>Nous utilisons les San Marzano exclusivement en conserve — la mise en boîte se fait dans les heures suivant la récolte, ce qui fige leur maturité parfaite. Nous écrasons les tomates à la main, avec nos paumes, jamais au mixeur. Ce geste simple fait toute la différence : il préserve les fibres de la chair et donne à la sauce une texture rustique, avec de petits morceaux qui fondent à la cuisson.</p>
      <p>Notre sauce ne contient que quatre ingrédients : tomates San Marzano DOP, sel de mer, basilic frais, et un filet d'huile d'olive extra vierge. Pas d'ail, pas d'oignon, pas de sucre ajouté. Pas de cuisson préalable : la sauce va crue sur la pâte et cuit en 90 secondes dans le four à bois. C'est tout. C'est suffisant.</p>

      <h2>Pourquoi les autres tomates ne conviennent pas</h2>
      <p>La tomate ordinaire de supermarché contient en moyenne 94% d'eau. La San Marzano, elle, tourne autour de 88-90%. Cette différence, aussi modeste qu'elle paraisse, se traduit sur la pizza : avec une tomate ordinaire, l'eau libérée à la cuisson détrempe la pâte et dilue tous les arômes. La sauce devient grise, fade, aqueuse.</p>
      <p>L'acidité joue aussi un rôle capital. Les San Marzano ont un pH plus élevé que les tomates standard — elles sont moins acides — ce qui les rend plus douces, plus rondes en bouche. Sur une pizza, cette douceur naturelle équilibre parfaitement la richesse de la mozzarella et l'intensité des garnitures.</p>
    `,
  },
  {
    slug: "histoire-pizza-naples-monde",
    titre: "De Naples au monde : l'histoire fascinante de la pizza",
    date: "2024-05-03",
    categorie: "Histoire",
    extrait:
      "Street food des pauvres au XVIIIe siècle, symbole mondial de la cuisine italienne aujourd'hui — retracez l'incroyable voyage de la pizza à travers les siècles, de la rue napolitaine à votre assiette.",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1200",
    tempsLecture: 6,
    contenu: `
      <h2>Les origines : bien avant l'Italie</h2>
      <p>La pizza, dans son sens le plus large — une galette de pâte garnie — est l'une des plus vieilles recettes de l'humanité. Les Égyptiens, les Grecs, les Romains préparaient déjà des galettes de pain plat agrémentées d'huile, d'herbes et de fromage. Les soldats romains connaissaient le <em>panis focacius</em>, un pain plat cuit sur les pierres chaudes du feu de camp.</p>
      <p>Mais la pizza telle que nous la connaissons — avec sa pâte fine, son disque de tomato et son fromage fondu — est une invention résolument napolitaine, qui n'a véritablement pris forme qu'à la fin du XVIIIe siècle, après que la tomate, importée d'Amérique, eut été acceptée dans la cuisine européenne (les Européens la considéraient d'abord comme toxique).</p>

      <h2>Naples au XVIIIe siècle : la pizza des <em>lazzaroni</em></h2>
      <p>À Naples, à la fin du XVIIIe siècle, la pizza est la nourriture des pauvres. Les <em>lazzaroni</em> — nom donné aux classes populaires napolitaines — constituent une masse de 50 000 personnes sans logement fixe qui vivent dans la rue. Ils ont besoin d'une nourriture bon marché, nourrissante, que l'on mange debout, avec les mains, sans couverts.</p>
      <p>Les <em>pizzaioli</em> ambulants répondent à ce besoin avec leurs grandes plates garnis de tomate, de lard, de fromage ou d'anchois. La pizza se vend quelques centimes, parfois à crédit — les <em>pizzaioli</em> les plus généreux accordaient jusqu'à une semaine de délai à leurs clients réguliers, une pratique appelée <em>"pizza a otto"</em> (pizza à huit jours).</p>

      <h2>La Margherita et la légitimation royale</h2>
      <p>La grande rupture dans l'histoire de la pizza survient en 1889, à l'occasion de la visite du roi Umberto I et de la reine Margherita à Naples. Le pizzaïolo Raffaele Esposito, réputé être le meilleur de la ville, est convié à préparer des pizzas pour la cour royale. Il crée pour l'occasion trois variétés, dont une aux couleurs du drapeau italien : rouge (tomate), blanc (mozzarella), vert (basilic).</p>
      <p>La reine, dit-on, manifesta une préférence marquée pour cette pizza tricolore. Esposito lui dédia aussitôt, la baptisant <em>Pizza Margherita</em>. Cette anecdote — peut-être partiellement mythifiée — marque symboliquement la sortie de la pizza du monde populaire et son entrée dans une sphère plus respectable. Si la reine mangeait de la pizza, c'est qu'elle valait la peine d'être mangée.</p>
      <blockquote>
        <p>"La Margherita n'est pas une pizza parmi d'autres. C'est le modèle, l'étalon, la grammaire de tout le reste."</p>
        <cite>— Claudia</cite>
      </blockquote>

      <h2>L'émigration italienne et la conquête du monde</h2>
      <p>C'est l'émigration italienne qui va propulser la pizza à la conquête du monde. Entre 1880 et 1930, des millions d'Italiens — majoritairement originaires du Sud — quittent leur pays pour les États-Unis, l'Argentine, le Brésil. Ils emportent avec eux leurs recettes, leurs techniques, leur culture alimentaire.</p>
      <p>À New York, les premiers pizzerias ouvrent dans le quartier de Little Italy dès 1905. La pizza y subit ses premières transformations : la pâte devient plus épaisse (pour nourrir une main-d'œuvre ouvrière), les portions plus grandes, les garnitures plus généreuses. La New York-style pizza, avec sa grande part triangulaire que l'on plie en deux, est née.</p>
      <p>Dans les années 1950 et 1960, avec le développement de la culture fast-food et l'apparition des chaînes industrielles, la pizza devient le plat le plus consommé des États-Unis — et rapidement du monde entier.</p>

      <h2>La reconnaissance UNESCO et le renouveau artisanal</h2>
      <p>En 2017, l'<em>Arte del Pizzaiolo Napoletano</em> est inscrite au patrimoine culturel immatériel de l'UNESCO — une reconnaissance historique pour une pratique née dans les rues d'une ville et devenue patrimoine de l'humanité.</p>
      <p>Depuis les années 2010, on assiste partout dans le monde à un puissant mouvement de retour aux sources : des artisans passionnés rejettent les raccourcis industriels, ressortent les recettes ancestrales, commandent la Tipo 00 italienne, investissent dans des fours à bois. C'est dans ce mouvement que s'inscrit Le Four de Claudia — non pas comme une tendance, mais comme une conviction.</p>
    `,
  },
  {
    slug: "huile-olive-finitions-pizza",
    titre: "L'huile d'olive : le dernier geste qui fait tout",
    date: "2024-06-18",
    categorie: "Ingrédients",
    extrait:
      "Un filet d'huile d'olive extra vierge sur la pizza qui sort du four — geste anodin en apparence, secret absolu en réalité. Tout ce que vous ignorez (peut-être) sur l'or vert de la cuisine italienne.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200",
    tempsLecture: 4,
    contenu: `
      <h2>Extra vierge : une dénomination stricte</h2>
      <p>Le terme "extra vierge" n'est pas un argument marketing — c'est une catégorie légale rigoureusement définie par l'Union Européenne. Pour porter cette dénomination, une huile d'olive doit satisfaire deux critères cumulatifs : un taux d'acidité libre inférieur à 0,8% (mesuré par analyse chimique) et l'absence de défauts gustatifs (évalué par un panel d'experts organoleptiques agréés).</p>
      <p>En pratique, seule l'huile obtenue par première pression à froid des olives — sans traitement chimique, sans chaleur excessive — peut prétendre à cette classification. C'est une huile vivante, chargée de polyphénols antioxydants, d'arômes complexes, d'une légère amertume et d'un piquant en finale qui sont les marqueurs d'une grande qualité.</p>

      <h2>Les variétés et leurs personnalités</h2>
      <p>Comme le vin, l'huile d'olive reflète le cépage — ici, la variété d'olive — et le terroir. Les principales variétés italiennes développent des profils très différents :</p>
      <ul>
        <li><strong>Nocellara del Belice</strong> (Sicile) : fruitée, douce, légèrement herbacée. Idéale pour finir une pizza Margherita ou une pizza aux légumes.</li>
        <li><strong>Coratina</strong> (Pouilles) : intense, très amère, puissamment poivrée. Réservée aux pizzas qui peuvent tenir tête à son caractère — fromages forts, charcuteries.</li>
        <li><strong>Taggiasca</strong> (Ligurie) : délicate, légèrement beurrée, douce. Parfaite pour les pizzas aux fruits de mer.</li>
        <li><strong>Frantoio</strong> (Toscane) : herbacée, artichaut, amande fraîche. Polyvalente, elle convient à presque toutes les pizzas.</li>
      </ul>
      <blockquote>
        <p>"On ne met pas la même huile sur une pizza Margherita et sur une Frutti di Mare. L'huile, c'est comme un accord de vin — ça se choisit."</p>
        <cite>— Claudia</cite>
      </blockquote>

      <h2>Avant ou après la cuisson ?</h2>
      <p>C'est l'une des questions qui divisent les pizzaïolos. La réponse, comme souvent en cuisine, est : les deux — mais pas la même huile.</p>
      <p><strong>Avant la cuisson</strong>, on peut appliquer un filet d'huile sur les ingrédients qui bénéficient d'une légère torréfaction : les champignons, les oignons, les poivrons. L'huile va caraméliser légèrement et intensifier ces saveurs. Pour cet usage, une huile d'olive ordinaire vierge suffit — les composés aromatiques fragiles de l'extra vierge disparaîtraient de toute façon à 400°C.</p>
      <p><strong>Après la cuisson</strong>, c'est là qu'entre en scène l'extra vierge de qualité. La pizza sort du four à 400°C, et un généreux filet est aussitôt versé en spirale sur la surface encore brûlante. La chaleur de la pizza — mais pas les flammes du four — réveille instantanément tous les arômes volatils de l'huile sans les détruire. C'est ce geste final qui termine la pizza, qui l'unifie, qui lui donne cet éclat brillant et ce parfum enveloppant.</p>

      <h2>Reconnaître une bonne huile</h2>
      <p>Quelques repères simples pour ne pas se tromper à l'achat :</p>
      <ul>
        <li><strong>La couleur</strong> ne dit rien sur la qualité — une huile peut être dorée ou verte sans que cela soit révélateur. En revanche, méfiez-vous d'une huile trop pâle et transparente.</li>
        <li><strong>La date de récolte</strong> (différente de la date limite d'utilisation) est le meilleur indicateur. Privilégiez les huiles de la dernière récolte — une huile a une vie optimale de 12 à 18 mois après la récolte.</li>
        <li><strong>Le piquant en gorge</strong> est un signe de qualité, pas un défaut. C'est la signature de l'oléocanthal, un polyphénol aux propriétés anti-inflammatoires. Si votre huile ne pique pas du tout, elle est soit vieille, soit de mauvaise qualité.</li>
        <li><strong>Le flacon opaque</strong> protège l'huile de l'oxydation par la lumière. Préférez les emballages en métal ou en verre teinté.</li>
      </ul>
    `,
  },
  {
    slug: "choisir-bonne-mozzarella",
    titre: "Comment choisir une bonne mozzarella",
    date: "2024-03-22",
    categorie: "Ingrédients",
    extrait:
      "Fior di latte ou bufala ? Fraîche ou industrielle ? Tout ce que vous devez savoir pour reconnaître une vraie mozzarella — et comprendre pourquoi ça change tout sur votre pizza.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200",
    tempsLecture: 3,
    contenu: `
      <h2>Fior di latte vs. Mozzarella di bufala : quelle différence ?</h2>
      <p>Il existe deux grandes familles de mozzarella authentique : le <strong>fior di latte</strong>, fabriqué à partir de lait de vache, et la <strong>mozzarella di bufala Campana DOP</strong>, fabriquée à partir de lait de bufflonne. Ces deux fromages partagent le même procédé de fabrication — la filature, cette technique qui consiste à travailler la caillé dans de l'eau très chaude pour lui donner sa texture fibreuse et élastique — mais leurs profils gustatifs sont radicalement différents.</p>
      <p>Le fior di latte est plus doux, plus lacté, légèrement sucré. Il fond merveilleusement bien à la cuisson, se diffuse uniformément sur la pizza, et crée ce voile de fromage fondu caractéristique de la Margherita napolitaine. C'est la mozzarella que nous utilisons pour la grande majorité de nos pizzas.</p>
      <p>La bufala, elle, est beaucoup plus caractérisée — plus acide, plus parfumée, avec une texture plus crémeuse et une teneur en matières grasses plus élevée. Son goût prononcé en fait l'ingrédient star de certaines pizzas où on la pose à cru après la cuisson, comme sur notre Parma ou notre Buffalina Piquante.</p>

      <h2>Les indicateurs de fraîcheur</h2>
      <p>Une mozzarella fraîche de qualité se reconnaît à plusieurs indices qui ne trompent pas :</p>
      <ul>
        <li><strong>L'aspect visuel</strong> : la surface doit être lisse, brillante, légèrement nacrée. Toute décoloration jaunâtre ou surface rugueuse trahit un manque de fraîcheur.</li>
        <li><strong>La texture</strong> : quand on la coupe, elle doit résister légèrement sous le couteau et présenter une texture fibreuse à l'intérieur. Une mozzarella qui s'effondre ou qui colle est trop vieille ou de mauvaise qualité.</li>
        <li><strong>Le lait</strong> : coupez-la et observez le liquide qui s'en échappe. Il doit être blanc laiteux, légèrement crémeux. Un liquide clair et aqueux indique une mozzarella industrielle bourrée d'eau.</li>
        <li><strong>L'odeur</strong> : fraîche et laiteuse, légèrement acidulée. Toute odeur aigre ou ammoniaquée est un mauvais signe.</li>
      </ul>
      <blockquote>
        <p>"Une bonne mozzarella doit avoir le goût du lait frais. Si elle n'a pas de goût, elle n'en aura pas non plus sur votre pizza."</p>
        <cite>— Claudia</cite>
      </blockquote>

      <h2>Comment elle fond : la clé pour la pizza</h2>
      <p>Toutes les mozzarellas ne fondent pas de la même façon — et pour la pizza, c'est crucial. Une mozzarella trop humide va libérer son eau pendant la cuisson et détremper la pâte. C'est le problème numéro un avec les mozzarellas industrielles : elles contiennent jusqu'à 65% d'eau et transforment votre pizza en piscine.</p>
      <p>Pour éviter ce problème, nous découpons notre mozzarella la veille et la laissons égoutter une nuit sur un torchon propre au réfrigérateur. Cette simple étape élimine l'excès d'humidité et garantit une fonte propre, uniforme, sans flaques d'eau indésirables.</p>
      <p>La mozzarella idéale pour la pizza fond en formant des poches de fromage fondu séparées par de légères traces de dorure — ce qu'on appelle le <em>maculato</em> en italien. C'est l'aspect visuel caractéristique d'une vraie Margherita napolitaine.</p>

      <h2>Notre approvisionnement</h2>
      <p>Nous nous approvisionnons auprès d'un fromager artisanal qui reçoit ses mozzarellas directement de Campanie deux fois par semaine. La fraîcheur est non-négociable pour nous : une mozzarella de plus de 48h n'a plus sa place sur nos pizzas.</p>
      <p>Pour la bufala, nous utilisons exclusivement de la Mozzarella di Bufala Campana DOP — la dénomination d'origine protégée qui garantit que le fromage est produit dans la région de Campanie avec du lait de bufflonnes élevées selon des méthodes traditionnelles. C'est un engagement de qualité et de traçabilité que nous ne compromettrons jamais.</p>
    `,
  },
];
