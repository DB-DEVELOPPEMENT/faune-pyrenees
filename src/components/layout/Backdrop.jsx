import { AnimatePresence, motion } from 'motion/react';
import styles from './Backdrop.module.css';

/**
 * Le « héros » derrière le site : la même photo en plein écran, NOIR & BLANC, nette,
 * posée en transparence sur un gris clair (--hero-base / --hero-opacity) → léger, comme la maquette.
 *
 * Lampe de naturaliste : une 2e copie EN COULEUR est masquée par un dégradé radial centré
 * sur la souris (--lx/--ly, rayon --lamp-r) : la couleur se révèle autour du curseur.
 * Rien ne bouge, seule la lumière se promène (voir useMouseLight).
 *
 * Transition : le nouveau paysage arrive en léger retard sur le portail du cadre
 * (cascade vignettes → cadre → fond), en fondu enchaîné PUR : aucun zoom, sinon les deux
 * photos superposées n'ont pas la même taille pendant le fondu et l'image semble « sauter ».
 */
const ENTER = { duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] };

export default function Backdrop({ animal }) {
  const position = `${animal.focus.x}% ${animal.focus.y}%`;

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          key={animal.id}
          className={styles.slide}
          style={{ zIndex: 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, zIndex: 0, transition: { duration: 1.2, delay: 0.6, zIndex: { duration: 0 } } }}
          transition={ENTER}
        >
          <img src={animal.image} alt="" className={styles.bw} style={{ objectPosition: position }} />
          <img src={animal.image} alt="" className={styles.color} style={{ objectPosition: position }} />
        </motion.div>
      </AnimatePresence>
      <div className={styles.wash} />
    </div>
  );
}
