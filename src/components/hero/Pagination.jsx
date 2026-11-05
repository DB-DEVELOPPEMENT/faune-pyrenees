import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import styles from './Pagination.module.css';

/**
 * Flèches + numéros 01…07. Le trait coloré utilise `layoutId` :
 * Motion le fait GLISSER d'un numéro à l'autre au lieu de le faire réapparaître.
 * Les numéros sont hors tabulation (tabIndex -1) : ils doublonnent les vignettes,
 * qui portent déjà la navigation clavier. Les flèches restent accessibles.
 */
export default function Pagination() {
  const { animals, index, goTo, next, prev } = useSliderContext();

  return (
    <div className={styles.pagination}>
      <button type="button" className={styles.arrow} onClick={prev} aria-label="Animal précédent">
        <ChevronUp size={22} aria-hidden="true" />
      </button>

      <ol className={styles.list}>
        {animals.map((a, i) => (
          <li key={a.id}>
            <button
              type="button"
              tabIndex={-1}
              className={styles.item}
              data-active={i === index}
              aria-current={i === index ? 'true' : undefined}
              aria-label={`${a.index} : ${a.name}`}
              onClick={() => goTo(i)}
            >
              {i === index && <motion.span layoutId="pagination-trait" className={styles.trait} />}
              {a.index}
            </button>
          </li>
        ))}
      </ol>

      <button type="button" className={styles.arrow} onClick={next} aria-label="Animal suivant">
        <ChevronDown size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
