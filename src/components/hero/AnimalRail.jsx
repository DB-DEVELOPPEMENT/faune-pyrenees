import { useSliderContext } from '@/context/SliderContext.jsx';
import Thumbnail from './Thumbnail.jsx';
import styles from './GlassPanel.module.css';

/**
 * Colonne vitrée des pages de contenu : les 7 vignettes deviennent des liens vers les fiches.
 * Même style que GlassPanel (même module CSS) pour que le cadre reste identique d'une page à l'autre.
 * activeId : animal de la fiche ouverte (aucun sur la page des lieux).
 */
export default function AnimalRail({ activeId }) {
  const { animals } = useSliderContext();
  const activeIndex = animals.findIndex((a) => a.id === activeId);

  return (
    <nav className={styles.panel} aria-label="Fiches des animaux">
      <ul className={styles.thumbs}>
        {animals.map((animal, i) => (
          <li key={animal.id}>
            <Thumbnail
              animal={animal}
              index={i}
              isActive={i === activeIndex}
              to={`/animaux/${animal.id}`}
              waveKey={activeId}
              distance={activeIndex < 0 ? i : Math.abs(i - activeIndex)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
