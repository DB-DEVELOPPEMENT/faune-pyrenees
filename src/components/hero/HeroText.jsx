import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { Play } from 'lucide-react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import SmartLink from '@/components/ui/SmartLink.jsx';
import styles from './HeroText.module.css';

/*
 * Variantes Motion. `custom` = direction (+1 suivant, -1 précédent) :
 * le bloc arrive du bas et part vers le haut quand on avance, l'inverse quand on recule.
 * AnimatePresence reçoit aussi `custom` pour que le bloc SORTANT connaisse la nouvelle direction.
 */
const block = {
  enter: (dir) => ({ y: 40 * dir, opacity: 0 }),
  center: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: (dir) => ({ y: -40 * dir, opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } }),
};
// Lettres : héritent de l'état du bloc (enter → center) ; `custom` = rang de la lettre → délai.
const letter = {
  enter: { y: '110%' },
  center: (i) => ({ y: 0, transition: { delay: 0.15 + i * 0.03, duration: 0.55, ease: [0.16, 1, 0.3, 1] } }),
};

/** Découpe le nom en mots (pour des retours à la ligne propres) puis en lettres animées. */
function AnimatedTitle({ text }) {
  let n = 0; // rang global de la lettre, pour un décalage continu d'un mot à l'autre
  return text.split(' ').map((word, w) => (
    <span key={w}>
      {w > 0 && ' '}
      <span className={styles.word}>
        {[...word].map((ch, c) => (
          <motion.span key={c} className={styles.letter} variants={letter} custom={n++}>
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  ));
}

export default function HeroText() {
  const { activeAnimal: a, direction, index, animals } = useSliderContext();

  return (
    <div className={styles.wrap}>
      {/* Annonce le changement aux lecteurs d'écran (le titre lettre par lettre serait illisible). */}
      <p className="sr-only" aria-live="polite">
        {`${a.name}, ${index + 1} sur ${animals.length}`}
      </p>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.article
          key={a.id}
          className={styles.text}
          custom={direction}
          variants={block}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <p className={styles.tagline}>{a.tagline}</p>
          <h1 className={styles.title}>
            <span className="sr-only">{a.name}</span>
            <span aria-hidden="true">
              <AnimatedTitle text={a.name} />
            </span>
          </h1>
          <p className={styles.latin}>{a.latin}</p>
          <p className={styles.description}>{a.description}</p>

          <div className={styles.actions}>
            <Link to={`/animaux/${a.id}`} className={styles.more}>
              En savoir plus
            </Link>
            <SmartLink href={a.links.video} className={styles.video}>
              <span className={styles.playIcon} aria-hidden="true">
                <Play size={12} fill="currentColor" />
              </span>
              Vidéo
            </SmartLink>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
