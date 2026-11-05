import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useSliderContext } from '@/context/SliderContext.jsx';
import { UI } from '@/config/ui.js';
import styles from './Thumbnail.module.css';

const SPRING = { type: 'spring', stiffness: 300, damping: 20 };
const MotionLink = motion.create(Link);
const WAVE_STEP = 70; // ms de décalage par rang d'écart avec la vignette active

/**
 * Vignette ronde, calques : .aura (halo à la couleur de CET animal), .img, .ring (anneau actif),
 * .wave (onde de choc à la couleur du NOUVEL animal, en cascade depuis la vignette active).
 *
 * Deux usages :
 *  - accueil : bouton qui change l'animal (onSelect) ; registerThumb permet au portail
 *    de partir du centre de ce bouton ;
 *  - autres pages : lien vers la fiche (`to`).
 *
 * waveKey : change à chaque nouvel animal → le <span> onde est recréé → l'animation CSS rejoue.
 * distance : écart (en rangs) avec la vignette active → délai de l'onde = effet de vague.
 * N&B piloté par UI.grayscaleThumbs (config/ui.js) via data-grayscale.
 */
export default function Thumbnail({ animal, index, isActive, onSelect, to, waveKey, distance = 0 }) {
  const { registerThumb } = useSliderContext();

  const shared = {
    ref: (el) => registerThumb(index, el),
    className: styles.thumb,
    'data-active': isActive,
    'data-grayscale': UI.grayscaleThumbs,
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.96 },
    transition: SPRING,
    style: { '--thumb-accent': animal.accent, '--thumb-glow': animal.glow },
  };

  const content = (
    <>
      <span className={styles.aura} aria-hidden="true" />
      <img src={animal.thumb} alt="" className={styles.img} width="400" height="400" decoding="async" />
      <span className={styles.ring} aria-hidden="true" />
      <span
        key={waveKey}
        className={styles.wave}
        style={{ animationDelay: `${distance * WAVE_STEP}ms` }}
        aria-hidden="true"
      />
    </>
  );

  if (to) {
    return (
      <MotionLink
        {...shared}
        to={to}
        aria-label={`Fiche : ${animal.name}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      {...shared}
      type="button"
      aria-label={`Voir ${animal.name}`}
      aria-pressed={isActive}
      onClick={onSelect}
    >
      {content}
    </motion.button>
  );
}
