import { useEffect, useRef } from 'react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import Thumbnail from './Thumbnail.jsx';
import Pagination from './Pagination.jsx';
import styles from './GlassPanel.module.css';

/**
 * Colonne vitrée de l'ACCUEIL : vignettes + pagination.
 * (La bande de verre elle-même est `.glass` dans SiteLayout : elle couvre toute la hauteur.)
 *
 * Survol ou focus clavier dans le panneau → autoplay en pause (on ne change pas
 * d'animal sous le curseur de quelqu'un qui hésite).
 */
export default function GlassPanel() {
  const { animals, index, goTo, setHovered } = useSliderContext();
  const listRef = useRef(null);

  // Mobile (rangée horizontale défilante) : recentre la vignette active.
  // scrollTo sur la liste seulement : ne fait jamais défiler la page. Sans effet sur desktop.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[index];
    if (!item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2, behavior: 'smooth' });
  }, [index]);

  return (
    <nav
      className={styles.panel}
      aria-label="Choisir un animal"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      <ul ref={listRef} className={styles.thumbs}>
        {animals.map((animal, i) => (
          <li key={animal.id}>
            <Thumbnail
              animal={animal}
              index={i}
              isActive={i === index}
              onSelect={() => goTo(i)}
              waveKey={index}
              distance={Math.abs(i - index)}
            />
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <Pagination />
      </div>
    </nav>
  );
}
