/**
 * PHOTOS COMPLÉMENTAIRES — Wikimedia Commons (fichier généré par script le 05/11/2026, puis relu à la main).
 *
 * Toutes sous licence libre (CC0, CC BY, CC BY-SA) : réutilisation autorisée, y compris sur un
 * site public, À CONDITION d'afficher l'auteur + la licence + un lien vers la source.
 * C'est ce que fait le composant ui/PhotoCredit — ne jamais supprimer ces crédits.
 * Images redimensionnées (1280 px) et converties en WebP, sans autre modification.
 *
 * Forme : { src, caption, author, license, licenseUrl, source }
 *   gallery[idAnimal]  → 3 photos par animal (fiche « En savoir plus »)
 *   placePhotos[idLieu] → photo de couverture de chaque lieu (page « Lieux de visite »)
 * Remplacer une photo : changer le fichier WebP ET mettre à jour son crédit ici.
 */
import chouette1 from '@/assets/images/gallery/chouette-1.webp';
import chouette2 from '@/assets/images/gallery/chouette-2.webp';
import chouette3 from '@/assets/images/gallery/chouette-3.webp';
import ours1 from '@/assets/images/gallery/ours-1.webp';
import ours2 from '@/assets/images/gallery/ours-2.webp';
import ours3 from '@/assets/images/gallery/ours-3.webp';
import marmotte1 from '@/assets/images/gallery/marmotte-1.webp';
import marmotte2 from '@/assets/images/gallery/marmotte-2.webp';
import marmotte3 from '@/assets/images/gallery/marmotte-3.webp';
import loup1 from '@/assets/images/gallery/loup-1.webp';
import loup2 from '@/assets/images/gallery/loup-2.webp';
import loup3 from '@/assets/images/gallery/loup-3.webp';
import aigle1 from '@/assets/images/gallery/aigle-1.webp';
import aigle2 from '@/assets/images/gallery/aigle-2.webp';
import aigle3 from '@/assets/images/gallery/aigle-3.webp';
import tetras1 from '@/assets/images/gallery/tetras-1.webp';
import tetras2 from '@/assets/images/gallery/tetras-2.webp';
import tetras3 from '@/assets/images/gallery/tetras-3.webp';
import isard1 from '@/assets/images/gallery/isard-1.webp';
import isard2 from '@/assets/images/gallery/isard-2.webp';
import isard3 from '@/assets/images/gallery/isard-3.webp';
import lieuIraty from '@/assets/images/places/iraty.webp';
import lieuAspe from '@/assets/images/places/aspe.webp';
import lieuGavarnie from '@/assets/images/places/gavarnie.webp';
import lieuCapcir from '@/assets/images/places/capcir.webp';
import lieuOssau from '@/assets/images/places/ossau.webp';
import lieuNeouvielle from '@/assets/images/places/neouvielle.webp';
import lieuOrlu from '@/assets/images/places/orlu.webp';

export const gallery = {
  chouette: [
    {
      src: chouette1,
      caption: 'Perchée sur une branche de conifère',
      author: 'Christoph Moning',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Aegolius_funereus_funereus_(Tengmalm%27s_Owl),_Lindberg,_Germany_1.jpg',
    },
    {
      src: chouette2,
      caption: 'Le regard jaune de la nuit',
      author: 'birds_n_roll',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:%D0%9C%D0%BE%D1%85%D0%BD%D0%BE%D0%BD%D0%BE%D0%B3%D0%B8%D0%B9_%D1%81%D1%8B%D1%87.jpg',
    },
    {
      src: chouette3,
      caption: 'À l’affût contre un tronc',
      author: 'Christoph Moning',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Aegolius_funereus_funereus_(Tengmalm%27s_Owl),_Lindberg,_Germany_2.jpg',
    },
  ],
  ours: [
    {
      src: ours1,
      caption: 'Femelle en sous-bois',
      author: 'Charles J. Sharp',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Eurasian_brown_bear_(Ursus_arctos_arctos)_female_1.jpg',
    },
    {
      src: ours2,
      caption: 'Au repos parmi les rochers moussus',
      author: 'Charles J. Sharp',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Eurasian_brown_bear_(Ursus_arctos_arctos)_female_2.jpg',
    },
    {
      src: ours3,
      caption: 'Portrait d’ours brun',
      author: 'Francis C. Franklin',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      source: 'https://commons.wikimedia.org/wiki/File:European_Brown_Bear.jpg',
    },
  ],
  marmotte: [
    {
      src: marmotte1,
      caption: 'Sentinelle sur son rocher',
      author: 'Giles Laurent',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:071_Wild_marmot_at_Grand_Muveran_Nature_Reserve_Photo_by_Giles_Laurent.jpg',
    },
    {
      src: marmotte2,
      caption: 'Jeune marmotte dans l’alpage',
      author: 'Scosse',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Giovane_marmotta.jpg',
    },
    {
      src: marmotte3,
      caption: 'Sortie du terrier',
      author: 'Uoaei1',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Marmota_marmota_Tauerntal_20220816_18.jpg',
    },
  ],
  loup: [
    {
      src: loup1,
      caption: 'Portrait de loup gris',
      author: 'Clément Bardot',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Loup_gris_(Canis_lupus_).jpg',
    },
    {
      src: loup2,
      caption: 'En maraude dans la forêt',
      author: 'Musicaline',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Loup_gris_commun_DSCF1575.jpg',
    },
    {
      src: loup3,
      caption: 'Repos dans les feuilles mortes',
      author: 'Musicaline',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Loup_commun_DSCF5552.jpg',
    },
  ],
  aigle: [
    {
      src: aigle1,
      caption: 'En vol face aux sommets',
      author: 'Giles Laurent',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:001_Wild_Golden_Eagle_and_Majinghorn_Pfyn-Finges_Photo_by_Giles_Laurent.jpg',
    },
    {
      src: aigle2,
      caption: 'Ailes « digitées » en plein vol',
      author: 'Juan Lacruz',
      license: 'CC BY 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Chrysaetos_La_Ca%C3%B1ada_20120114_1.jpg',
    },
    {
      src: aigle3,
      caption: 'Le regard du prédateur',
      author: 'Richard Bartz, Munich aka Makro Freak',
      license: 'CC BY-SA 2.5',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5',
      source:
        'https://commons.wikimedia.org/wiki/File:Steinadler_Aquila_chrysaetos_closeup2_Richard_Bartz.jpg',
    },
  ],
  tetras: [
    {
      src: tetras1,
      caption: 'Le coq en parade',
      author: 'Simon Bailey',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      source: 'https://commons.wikimedia.org/wiki/File:Tetrao_urogallus,_Glenfeshie,_Scotland_1.jpg',
    },
    {
      src: tetras2,
      caption: 'La poule, au plumage mimétique',
      author: 'S. John, Elsterwerda',
      license: 'CC BY-SA 3.0 de',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en',
      source: 'https://commons.wikimedia.org/wiki/File:Auerhuhn_Schweden_P1130026.jpg',
    },
    {
      src: tetras3,
      caption: 'Coq en forêt de conifères',
      author: 'Majsan02',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:A_bird_searching_for_something.jpg',
    },
  ],
  isard: [
    {
      src: isard1,
      caption: 'Isards vers le lac Bleu d’Ilhéou',
      author: 'Kitty Terwolbeck',
      license: 'CC BY 2.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/2.0',
      source: 'https://commons.wikimedia.org/wiki/File:Isards_vers_le_Lac_Bleu_d%27Ilh%C3%A9ou_1.jpg',
    },
    {
      src: isard2,
      caption: 'Isard de la réserve d’Orlu',
      author: 'Reserve Orlu',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Isard_photo_pierre_Guiton(2bis)_(cropped).jpg',
    },
    {
      src: isard3,
      caption: 'Harde sur les rochers',
      author: 'Juan Lacruz',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Rebecos_en_Picos_de_Europa,_BK1D3929.jpg',
    },
  ],
};

export const placePhotos = {
  iraty: {
    src: lieuIraty,
    caption: 'Sentier dans la forêt d’Iraty (versant navarrais)',
    author: 'Quique',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Selva_de_Irati_(Navarra).jpg',
  },
  aspe: {
    src: lieuAspe,
    caption: 'Prairies et forêts de la vallée d’Aspe',
    author: 'Juan Emilio Prades Bel',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Les_Borges_d%27Abel,_Valle_de_Aspe,_departamento_de_los_Pirineos_Atl%C3%A1nticos,_regi%C3%B3n_de_Nueva_Aquitania.jpg',
  },
  gavarnie: {
    src: lieuGavarnie,
    caption: 'Le cirque de Gavarnie et sa grande cascade',
    author: 'W. Bulach',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:.00_2122_Cirque_de_Gavarnie_-_Pyren%C3%A4en.jpg',
  },
  capcir: {
    src: lieuCapcir,
    caption: 'Le plateau du Capcir',
    author: 'Jack ma',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Matemale_creu_capcir_vue.JPG',
  },
  ossau: {
    src: lieuOssau,
    caption: 'Le Pic du Midi d’Ossau dans le lac Gentau',
    author: 'Myrabella',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Gentau_Pic_du_Midi_Ossau.jpg',
  },
  neouvielle: {
    src: lieuNeouvielle,
    caption: 'Le pic de Néouvielle au-dessus du lac d’Aumar',
    author: 'Tournasol7',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Pic_du_Neouvielle_(19).jpg',
  },
  orlu: {
    src: lieuOrlu,
    caption: 'La vallée d’Orlu en automne',
    author: 'Jcb-caz-11',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Vall%C3%A9e_Orlu_2.jpg',
  },
};
