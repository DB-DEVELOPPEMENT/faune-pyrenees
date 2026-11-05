/**
 * Réglages visuels du site (constantes, pas de l'état React).
 * Futur : deviendra un réglage utilisateur via Context + localStorage (page « Nos Pyrénées »).
 */
export const UI = {
  grayscaleThumbs: true, // true = vignettes N&B comme la maquette (couleur au survol) ; false = couleur permanente
  autoplay: true, // défilement automatique au chargement (désactivé d'office si « réduire les animations »)
  autoplayDelay: 7000, // ms par animal
  wheelLock: 800, // ms entre deux changements à la molette (évite de sauter 5 animaux d'un coup)
};
