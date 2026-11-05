import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import PhotoCredit from './PhotoCredit.jsx';
import styles from './Lightbox.module.css';

/**
 * Visionneuse plein écran (galerie des fiches).
 * - createPortal vers <body> : le site est dans un cadre réduit par transform: scale(),
 *   et un position:fixed À L'INTÉRIEUR d'un élément transformé resterait coincé dans le cadre.
 * - Échap ferme, ←/→ naviguent, clic sur le fond ferme ; le focus revient sur la vignette d'origine.
 * @param index  photo affichée, ou null si fermée (état géré par le parent)
 */
export default function Lightbox({ photos, index, onClose, onIndex }) {
  const isOpen = index != null;

  // Clavier (dépend de l'index pour ←/→)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onIndex((index + 1) % photos.length);
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, index, photos.length, onClose, onIndex]);

  // Focus : mémorisé à l'ouverture, rendu à la fermeture (effet séparé : ne rejoue pas à chaque photo).
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    return () => previous?.focus?.();
  }, [isOpen]);

  const photo = isOpen ? photos[index] : null;

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className={styles.figure}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={photo.src} alt={photo.caption} className={styles.img} />
              <figcaption className={styles.caption}>
                <span>{photo.caption}</span>
                <PhotoCredit photo={photo} />
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer" autoFocus>
            <X size={26} aria-hidden="true" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((index - 1 + photos.length) % photos.length);
                }}
                aria-label="Photo précédente"
              >
                <ChevronLeft size={30} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((index + 1) % photos.length);
                }}
                aria-label="Photo suivante"
              >
                <ChevronRight size={30} aria-hidden="true" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
