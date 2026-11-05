/**
 * LES ANIMAUX DU SITE — seul fichier à modifier pour changer les textes.
 *
 * Forme d'un animal (identique à un futur document MongoDB / réponse GET /api/animals) :
 *   id          clé React stable + slug d'URL de la fiche (/animaux/ours)
 *   index       numéro affiché dans la pagination
 *   name        titre (h1)          latin   nom scientifique
 *   tagline     accroche au-dessus du titre
 *   description paragraphe de l'accueil (et chapô de la fiche)
 *   details     paragraphes supplémentaires de la fiche « En savoir plus »
 *   facts       fiche d'identité [{ label, value }] (ordre libre, nombre libre)
 *   observe     conseil d'observation
 *   place       lieu d'observation affiché dans l'en-tête (doit exister dans places.js)
 *   accent/glow couleur de l'animal et sa version translucide (aura, halo, cadre)
 *   focus       position de l'animal dans la photo, en % : centre de l'aura et
 *               cadrage sur écran étroit (object-position) pour ne pas couper l'animal
 *   image/thumb imports Vite (hash + vérification : une image manquante casse le build, pas la prod)
 *   links.video null → bouton affiché mais non cliquable (SmartLink) ; 'https://…' → vrai lien
 *
 * ⚠ Textes provisoires rédigés à partir de sources naturalistes générales :
 *    à relire / remplacer par ceux de l'auteur, et chiffres à vérifier avant publication.
 *
 * Ajouter un 8e animal : ses 2 WebP + un objet ici. Aucun CSS ni composant à toucher.
 */
import chouetteHero from '@/assets/images/hero/chouette-hero.webp';
import oursHero from '@/assets/images/hero/ours-hero.webp';
import marmotteHero from '@/assets/images/hero/marmotte-hero.webp';
import loupHero from '@/assets/images/hero/loup-hero.webp';
import aigleHero from '@/assets/images/hero/aigle-hero.webp';
import tetrasHero from '@/assets/images/hero/grand_tetras-hero.webp';
import isardHero from '@/assets/images/hero/isard-hero.webp';

import chouetteThumb from '@/assets/images/thumbs/chouette-thumb.webp';
import oursThumb from '@/assets/images/thumbs/ours-thumb.webp';
import marmotteThumb from '@/assets/images/thumbs/marmotte-thumb.webp';
import loupThumb from '@/assets/images/thumbs/loup-thumb.webp';
import aigleThumb from '@/assets/images/thumbs/aigle-thumb.webp';
import tetrasThumb from '@/assets/images/thumbs/grand_tetras-thumb.webp';
import isardThumb from '@/assets/images/thumbs/isard-thumb.webp';

export const animals = [
  {
    id: 'chouette',
    index: '01',
    name: 'Chouette de Tengmalm',
    latin: 'Aegolius funereus',
    tagline: 'La veilleuse des forêts d’altitude',
    description:
      'Petite chouette aux grands yeux jaunes, elle niche dans les anciennes loges de pic noir des sapinières et pinèdes de montagne. Discrète le jour, elle chasse les campagnols à la nuit tombée.',
    details: [
      'Pas plus grande qu’un merle bien nourri, la chouette de Tengmalm se reconnaît à sa grosse tête ronde, à ses « sourcils » blancs qui lui donnent un air étonné et à ses yeux jaune vif. Dans les Pyrénées, elle fréquente les vieilles forêts de sapins et de pins à crochets, entre 1 200 et 2 000 m environ.',
      'Elle ne creuse pas son nid : elle occupe les cavités abandonnées par le pic noir. La conservation des vieux arbres et des arbres morts sur pied est donc essentielle à sa survie. Son chant, une série de « pou-pou-pou » rapides, porte loin dans les nuits de fin d’hiver.',
    ],
    facts: [
      { label: 'Taille', value: '22 à 27 cm' },
      { label: 'Envergure', value: '50 à 62 cm' },
      { label: 'Poids', value: '100 à 200 g (femelle plus lourde)' },
      { label: 'Habitat', value: 'Vieilles forêts de conifères d’altitude' },
      { label: 'Régime', value: 'Petits rongeurs, petits oiseaux' },
      { label: 'Statut', value: 'Espèce protégée en France' },
    ],
    observe:
      'De février à avril, à la nuit tombée, quand les mâles chantent. On l’entend bien plus souvent qu’on ne la voit : écoutez sans jamais utiliser d’enregistrement pour l’attirer.',
    place: 'Forêt d’Iraty',
    accent: '#d9a441',
    glow: 'rgba(217, 164, 65, 0.55)',
    focus: { x: 70, y: 35 },
    image: chouetteHero,
    thumb: chouetteThumb,
    links: { video: null },
  },
  {
    id: 'ours',
    index: '02',
    name: 'Ours brun',
    latin: 'Ursus arctos',
    tagline: 'Le seigneur des hêtraies',
    description:
      'Plus grand mammifère des Pyrénées, l’ours brun parcourt des dizaines de kilomètres entre forêts et estives. Omnivore, il se nourrit surtout de végétaux, de fruits et d’insectes.',
    details: [
      'L’ours des Pyrénées a frôlé l’extinction : à la fin des années 1990, il ne restait que quelques individus de souche pyrénéenne. Des ours venus de Slovénie ont été relâchés à partir de 1996, et la population, partagée entre la France, l’Espagne et l’Andorre, compte aujourd’hui plusieurs dizaines d’individus.',
      'Malgré sa taille, l’ours est surtout végétarien : herbes, faines, glands, myrtilles et racines forment l’essentiel de son menu, complété d’insectes et de charognes. Il passe l’hiver en tanière, où la femelle met bas un à trois oursons en plein cœur de l’hiver.',
    ],
    facts: [
      { label: 'Longueur', value: '1,5 à 2,2 m' },
      { label: 'Poids', value: '80 à 150 kg (femelle), jusqu’à 250 kg (mâle)' },
      { label: 'Habitat', value: 'Forêts de montagne et estives' },
      { label: 'Régime', value: 'Omnivore, à dominante végétale' },
      { label: 'Reproduction', value: '1 à 3 oursons tous les 2 à 3 ans' },
      { label: 'Statut', value: 'Protégé — en danger critique en France' },
    ],
    observe:
      'Quasi impossible à observer, et c’est tant mieux : l’ours fuit l’homme. Cherchez plutôt ses indices (empreintes, griffades sur les troncs) et ne vous approchez jamais d’une tanière.',
    place: 'Vallée d’Aspe',
    accent: '#8b5a2b',
    glow: 'rgba(139, 90, 43, 0.55)',
    focus: { x: 62, y: 45 },
    image: oursHero,
    thumb: oursThumb,
    links: { video: null },
  },
  {
    id: 'marmotte',
    index: '03',
    name: 'Marmotte des Alpes',
    latin: 'Marmota marmota',
    tagline: 'La sentinelle des alpages',
    description:
      'Réintroduite dans les Pyrénées au XXᵉ siècle, la marmotte vit en colonies dans les pelouses d’altitude. Son sifflement strident prévient le groupe à l’approche d’un aigle ou d’un randonneur.',
    details: [
      'Disparue des Pyrénées depuis la fin de la dernière glaciation, la marmotte y a été réintroduite à partir de 1948 avec des individus venus des Alpes. Elle a depuis colonisé l’ensemble de la chaîne et compte parmi les animaux les plus faciles à observer en montagne.',
      'Elle passe près de six mois en hibernation, d’octobre à avril, au fond d’un terrier familial dont elle bouche l’entrée avec de la terre et du foin. Le reste de l’année, elle accumule des réserves de graisse en broutant herbes et fleurs des pelouses d’altitude.',
    ],
    facts: [
      { label: 'Longueur', value: '50 à 60 cm (+ queue de 15 à 20 cm)' },
      { label: 'Poids', value: '3 à 7 kg selon la saison' },
      { label: 'Habitat', value: 'Pelouses et éboulis, 1 500 à 2 800 m' },
      { label: 'Régime', value: 'Herbivore (graminées, fleurs, racines)' },
      { label: 'Reproduction', value: '2 à 6 petits par an' },
      { label: 'Statut', value: 'Non menacée' },
    ],
    observe:
      'De juin à septembre, tôt le matin ou en fin de journée, près des pierriers. Un sifflement ? Vous avez été repéré : restez immobile, elles ressortent vite.',
    place: 'Cirque de Gavarnie',
    accent: '#c9873a',
    glow: 'rgba(201, 135, 58, 0.55)',
    focus: { x: 46, y: 50 },
    image: marmotteHero,
    thumb: marmotteThumb,
    links: { video: null },
  },
  {
    id: 'loup',
    index: '04',
    name: 'Loup gris',
    latin: 'Canis lupus',
    tagline: 'Le retour du grand voyageur',
    description:
      'Revenu naturellement par l’est de la chaîne, le loup gris s’installe peu à peu dans les Pyrénées. Animal social et grand marcheur, il peut couvrir plus de 30 km en une nuit.',
    details: [
      'Exterminé en France au début du XXᵉ siècle, le loup est revenu naturellement d’Italie par les Alpes au début des années 1990, puis jusqu’aux Pyrénées, où il est détecté depuis la fin des années 1990, d’abord dans les Pyrénées-Orientales.',
      'Ailleurs, il vit en meute familiale organisée autour d’un couple reproducteur ; dans les Pyrénées, on détecte surtout des individus isolés en dispersion. Il chasse principalement les ongulés sauvages : cerfs, chevreuils, isards.',
    ],
    facts: [
      { label: 'Longueur', value: '1 à 1,4 m (+ queue de 30 à 50 cm)' },
      { label: 'Poids', value: '25 à 40 kg' },
      { label: 'Habitat', value: 'Forêts et espaces ouverts peu fréquentés' },
      { label: 'Régime', value: 'Carnivore (ongulés sauvages surtout)' },
      { label: 'Reproduction', value: '4 à 6 louveteaux, au printemps' },
      { label: 'Statut', value: 'Protégé — vulnérable en France' },
    ],
    observe:
      'L’observer dans la nature relève de la chance ; on lit surtout ses empreintes dans la neige. Pour le voir, la Maison des loups d’Orlu (Ariège) présente des loups en semi-liberté.',
    place: 'Capcir',
    accent: '#7f93a6',
    glow: 'rgba(127, 147, 166, 0.55)',
    focus: { x: 63, y: 52 },
    image: loupHero,
    thumb: loupThumb,
    links: { video: null },
  },
  {
    id: 'aigle',
    index: '05',
    name: 'Aigle royal',
    latin: 'Aquila chrysaetos',
    tagline: 'Le maître des falaises',
    description:
      'Avec plus de deux mètres d’envergure, l’aigle royal patrouille les vallées en planant sur les ascendances. Le couple, fidèle à vie, entretient plusieurs aires dans les parois rocheuses.',
    details: [
      'Silhouette massive aux ailes « digitées », nuque dorée qui lui vaut son nom latin de chrysaetos, « aigle d’or » : l’aigle royal est le grand prédateur ailé des Pyrénées. Chaque couple défend un vaste territoire de plusieurs dizaines de kilomètres carrés.',
      'Il bâtit ses aires dans les falaises et les réutilise d’une année sur l’autre en les rechargeant de branches : certaines finissent par mesurer plus d’un mètre de haut. Marmottes, lièvres, lagopèdes et jeunes isards composent l’essentiel de ses proies.',
    ],
    facts: [
      { label: 'Taille', value: '75 à 90 cm' },
      { label: 'Envergure', value: '1,90 à 2,30 m' },
      { label: 'Poids', value: '3 à 6,5 kg (femelle plus grande)' },
      { label: 'Habitat', value: 'Falaises et grands espaces ouverts' },
      { label: 'Régime', value: 'Mammifères et oiseaux moyens, charognes en hiver' },
      { label: 'Statut', value: 'Protégé — vulnérable en France' },
    ],
    observe:
      'Toute l’année, en milieu de journée, quand les ascendances thermiques le portent au-dessus des crêtes. Gardez vos distances avec les falaises où il niche, surtout de mars à juillet.',
    place: 'Vallée d’Ossau',
    accent: '#8e2f3a',
    glow: 'rgba(142, 47, 58, 0.55)',
    focus: { x: 68, y: 40 },
    image: aigleHero,
    thumb: aigleThumb,
    links: { video: null },
  },
  {
    id: 'tetras',
    index: '06',
    name: 'Grand tétras',
    latin: 'Tetrao urogallus',
    tagline: 'Le chanteur des sous-bois',
    description:
      'Au printemps, le coq déploie sa queue en éventail et lance son chant de parade à l’aube. Espèce fragile, il a besoin de forêts calmes et anciennes : on l’observe sans jamais le déranger.',
    details: [
      'Le grand tétras est le plus grand gallinacé d’Europe. Le coq, noir aux reflets vert métallique avec un sourcil rouge vif, pèse environ deux fois plus que la poule, dont le plumage roux finement barré la rend presque invisible au sol.',
      'Au printemps, les coqs se rassemblent à l’aube sur des « places de chant » pour parader devant les poules. Très sensible au dérangement, l’espèce souffre de la fragmentation des vieilles forêts et de la fréquentation hivernale (hors-piste, raquettes).',
    ],
    facts: [
      { label: 'Taille', value: '80 à 95 cm (coq), 55 à 65 cm (poule)' },
      { label: 'Poids', value: '3,5 à 5 kg (coq), 1,5 à 2,5 kg (poule)' },
      { label: 'Habitat', value: 'Vieilles forêts claires de pins et de sapins' },
      { label: 'Régime', value: 'Aiguilles de pin en hiver, myrtilles, bourgeons' },
      { label: 'Reproduction', value: '5 à 10 œufs pondus au sol' },
      { label: 'Statut', value: 'Menacé — vulnérable en France' },
    ],
    observe:
      'Ne cherchez jamais les places de chant : le dérangement peut faire échouer la reproduction. Les sorties encadrées par des guides naturalistes sont la seule bonne manière de l’approcher.',
    place: 'Massif du Néouvielle',
    accent: '#2f6b4a',
    glow: 'rgba(47, 107, 74, 0.6)',
    focus: { x: 70, y: 40 },
    image: tetrasHero,
    thumb: tetrasThumb,
    links: { video: null },
  },
  {
    id: 'isard',
    index: '07',
    name: 'Isard',
    latin: 'Rupicapra pyrenaica',
    tagline: 'L’acrobate des sommets',
    description:
      'Cousin pyrénéen du chamois, l’isard gravit les vires rocheuses avec une agilité déconcertante. L’été en altitude, l’hiver plus bas en forêt, il est devenu l’emblème de la montagne pyrénéenne.',
    details: [
      'Un peu plus petit et plus élancé que le chamois des Alpes, l’isard appartient à l’espèce pyrénéenne Rupicapra pyrenaica. Mâles et femelles portent de fines cornes noires recourbées en crochet.',
      'Devenu rare au milieu du XXᵉ siècle à cause de la chasse, il a retrouvé des effectifs importants grâce aux réserves et au Parc national des Pyrénées. L’hiver, il descend en forêt ; l’été, il recherche la fraîcheur des crêtes et des névés.',
    ],
    facts: [
      { label: 'Hauteur au garrot', value: '65 à 75 cm' },
      { label: 'Poids', value: '25 à 35 kg' },
      { label: 'Habitat', value: 'Falaises, pelouses et forêts, 1 000 à 2 800 m' },
      { label: 'Régime', value: 'Herbivore (herbes, lichens, bourgeons)' },
      { label: 'Reproduction', value: '1 cabri par an, en mai-juin' },
      { label: 'Statut', value: 'Non menacé, chasse réglementée' },
    ],
    observe:
      'Toute l’année, à l’aube, sur les versants ensoleillés. Une bonne paire de jumelles et beaucoup de discrétion suffisent : ne le poussez jamais à fuir, surtout en hiver.',
    place: 'Réserve d’Orlu',
    accent: '#9fb3c2',
    glow: 'rgba(159, 179, 194, 0.55)',
    focus: { x: 70, y: 45 },
    image: isardHero,
    thumb: isardThumb,
    links: { video: null },
  },
];
