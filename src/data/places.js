/**
 * LIEUX DE VISITE — page /lieux.
 *
 * Forme d'un lieu (future collection MongoDB `places`) :
 *   id          ancre d'URL (/lieux#lieu-aspe)
 *   name, area  nom et localisation (département · statut de protection)
 *   altitude    tranche d'altitude, texte libre
 *   season      meilleure période
 *   description texte de présentation
 *   tip         conseil de bonne conduite propre au lieu
 *   animals     ids de animals.js observables ici ; le PREMIER fournit la photo de la carte
 *
 * ⚠ Informations indicatives rédigées pour la maquette : à vérifier (accès, réglementation,
 *    présence des espèces) auprès du Parc national des Pyrénées et des offices de tourisme.
 */
export const places = [
  {
    id: 'iraty',
    name: 'Forêt d’Iraty',
    area: 'Pyrénées-Atlantiques · Pays basque',
    altitude: '900 – 1 500 m',
    season: 'Fin d’hiver et printemps',
    description:
      'L’une des plus vastes hêtraies-sapinières d’Europe, à cheval sur la frontière. Ses vieux arbres creusés par le pic noir abritent la chouette de Tengmalm.',
    tip: 'Écoutez à la tombée de la nuit, sans lampe braquée ni enregistrement pour attirer les oiseaux.',
    animals: ['chouette'],
  },
  {
    id: 'aspe',
    name: 'Vallée d’Aspe',
    area: 'Pyrénées-Atlantiques · Parc national des Pyrénées',
    altitude: '500 – 2 500 m',
    season: 'Du printemps à l’automne',
    description:
      'Vallée sauvage du Haut-Béarn, l’un des derniers refuges historiques de l’ours. Les chances de le croiser sont infimes : on y cherche plutôt ses traces, en profitant des isards et des rapaces.',
    tip: 'Ne suivez jamais un ours. En cas de rencontre, signalez-vous calmement et éloignez-vous sans courir.',
    animals: ['ours', 'isard', 'aigle'],
  },
  {
    id: 'gavarnie',
    name: 'Cirque de Gavarnie',
    area: 'Hautes-Pyrénées · Patrimoine mondial UNESCO',
    altitude: '1 400 – 3 000 m',
    season: 'Juin à septembre',
    description:
      'Immense amphithéâtre de falaises classé au patrimoine mondial (Pyrénées – Mont Perdu). Les pelouses qui bordent les sentiers résonnent du sifflement des marmottes.',
    tip: 'Restez sur les sentiers et ne nourrissez jamais les marmottes : le pain et les biscuits les rendent malades.',
    animals: ['marmotte', 'isard', 'aigle'],
  },
  {
    id: 'capcir',
    name: 'Capcir',
    area: 'Pyrénées-Orientales · PNR des Pyrénées catalanes',
    altitude: '1 500 – 2 500 m',
    season: 'Toute l’année · indices sur la neige en hiver',
    description:
      'Haut plateau froid bordé de grandes forêts de pins à crochets. Le loup y est détecté depuis la fin des années 1990 ; le grand tétras y trouve encore des forêts calmes.',
    tip: 'Respectez les zones de quiétude signalées en hiver et au printemps : elles protègent le grand tétras.',
    animals: ['loup', 'tetras'],
  },
  {
    id: 'ossau',
    name: 'Vallée d’Ossau',
    area: 'Pyrénées-Atlantiques · Parc national des Pyrénées',
    altitude: '400 – 2 884 m',
    season: 'Mai à octobre',
    description:
      'Dominée par le Pic du Midi d’Ossau, la vallée est un haut lieu des rapaces : aigle royal, gypaète barbu et vautours fauves planent au-dessus des falaises.',
    tip: 'Les jumelles suffisent : observez les crêtes en milieu de journée, quand les ascendances se forment.',
    animals: ['aigle', 'isard', 'marmotte'],
  },
  {
    id: 'neouvielle',
    name: 'Massif du Néouvielle',
    area: 'Hautes-Pyrénées · Réserve naturelle nationale',
    altitude: '1 800 – 3 091 m',
    season: 'Juin à octobre',
    description:
      'Lacs d’altitude et forêts de pins à crochets parmi les plus hautes d’Europe : un milieu idéal pour le grand tétras, discret et menacé.',
    tip: 'Réserve naturelle : chiens, bivouac et cueillette y sont réglementés. Renseignez-vous avant de partir.',
    animals: ['tetras', 'isard', 'marmotte'],
  },
  {
    id: 'orlu',
    name: 'Réserve d’Orlu',
    area: 'Ariège · Réserve nationale de chasse et de faune sauvage',
    altitude: '900 – 2 700 m',
    season: 'Toute l’année · printemps idéal',
    description:
      'Vallée protégée où les isards se laissent observer de près au printemps, sur les pentes qui reverdissent. À l’entrée de la vallée, la Maison des loups présente des loups en semi-liberté.',
    tip: 'Partez tôt, avancez lentement et parlez bas : les isards tolèrent un observateur calme et immobile.',
    animals: ['isard', 'marmotte', 'aigle', 'loup'],
  },
];
