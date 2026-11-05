import { useRef } from 'react';

/**
 * Balayage horizontal tactile (seuil 50 px) → suivant / précédent.
 * Retourne des gestionnaires à étaler sur un élément : <section {...swipe}>.
 * - Souris ignorée : un glisser-souris sert à sélectionner du texte.
 * - pointercancel : le navigateur a pris la main (ex. défilement natif de la rangée
 *   de vignettes sur mobile) → on abandonne le geste.
 * L'élément doit avoir `touch-action: pan-y` pour que le navigateur nous laisse l'horizontal.
 */
export function useSwipe(onNext, onPrev, { enabled = true, threshold = 50 } = {}) {
  const start = useRef(null);

  return {
    onPointerDown: (e) => {
      if (!enabled || e.pointerType === 'mouse') return;
      start.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) onNext();
      else onPrev();
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}
