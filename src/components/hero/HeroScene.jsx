import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import styles from './HeroScene.module.css';

const DEFAULT_ORIGIN = { x: 85, y: 50 }; // côté panneau, si aucune vignette n'a pu être mesurée
const PORTAL = { duration: 1.1, ease: [0.76, 0, 0.24, 1] }; // courbe « cinéma » lente-rapide-lente

/**
 * Fond animé, 5 couches empilées (de bas en haut) :
 *   .slide/.photo  la photo, révélée par un PORTAIL circulaire (clip-path) qui s'ouvre
 *                  depuis la vignette choisie, puis déplacée en parallaxe 3D (CSS --mx/--my)
 *   .aura          halo coloré (--glow) centré sur l'animal (--fx/--fy), respire lentement
 *   .shade         dégradés pour la lisibilité du texte
 *   .vignette      assombrissement des bords (effet cinéma)
 *   .glow          reflet lumineux qui suit la souris
 *   .portalRing    anneau de lumière qui épouse le bord du portail pendant qu'il s'ouvre
 *
 * Les % du portail sont relatifs au CADRE du site (voir getOrigin dans SliderContext).
 *
 * AnimatePresence garde l'ancienne photo montée pendant son `exit` : le nouveau cercle
 * s'ouvre PAR-DESSUS l'ancienne image (zIndex 1 vs 0), jamais sur du noir.
 * initial={false} : pas de portail au tout premier affichage.
 * Réduire les animations : simple fondu de 0,4 s.
 */
export default function HeroScene() {
  const { activeAnimal: animal, origin } = useSliderContext();
  const reduced = useReducedMotion();
  const o = origin ?? DEFAULT_ORIGIN;
  const focus = `${animal.focus.x}% ${animal.focus.y}%`;

  return (
    <div
      className={styles.scene}
      aria-hidden="true"
      style={{ '--fx': `${animal.focus.x}%`, '--fy': `${animal.focus.y}%` }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={animal.id}
          className={styles.slide}
          style={{ zIndex: 1 }}
          initial={reduced ? { opacity: 0 } : { clipPath: `circle(0% at ${o.x}% ${o.y}%)` }}
          animate={reduced ? { opacity: 1 } : { clipPath: `circle(150% at ${o.x}% ${o.y}%)` }}
          exit={
            reduced
              ? { zIndex: 0, opacity: 0, transition: { duration: 0.4 } }
              : // L'ancienne photo reste IMMOBILE et s'éteint doucement (opacité seule, sur fond noir)
                // pendant que le cercle s'ouvre : pas de zoom ni de filtre = pas de saut, pas de saccade.
                { zIndex: 0, opacity: 0.35, transition: { ...PORTAL, zIndex: { duration: 0 } } }
          }
          transition={reduced ? { duration: 0.4 } : PORTAL}
        >
          {/* object-position = focus : sur un écran étroit le recadrage garde l'animal visible. */}
          <img
            src={animal.image}
            alt=""
            className={styles.photo}
            style={{ objectPosition: focus }}
            fetchPriority="high"
          />
        </motion.div>
      </AnimatePresence>

      <div className={styles.aura} />
      <div className={styles.shade} />
      <div className={styles.vignette} />
      <div className={styles.glow} />

      {/* Anneau lumineux collé au BORD du portail : même origine, même courbe, même durée
          que le clip-path, et un diamètre final égal au cercle de 150 % (calcul en CSS).
          initial={false} : au retour sur l'accueil, l'anneau ne rejoue pas. */}
      {!reduced && origin && (
        <AnimatePresence initial={false}>
          <motion.div
            key={animal.id}
            className={styles.portalRing}
            style={{ left: `${o.x}%`, top: `${o.y}%` }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: [1, 1, 0] }}
            transition={{ scale: PORTAL, opacity: { duration: PORTAL.duration, times: [0, 0.7, 1] } }}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
