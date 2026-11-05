import { useEffect, useRef } from 'react';

/**
 * Navigation globale : ←/↑ précédent, →/↓ suivant, Home/End, molette.
 * `enabled=false` quand le menu burger est ouvert (les flèches ne doivent pas bouger le fond).
 * Le verrou molette vit dans une ref : il survit aux ré-abonnements de l'effet
 * (next/prev changent à chaque animal), sinon l'inertie d'un trackpad sauterait plusieurs animaux.
 */
export function useKeyboardNav({ next, prev, goTo, count, enabled = true, wheelLock = 800 }) {
  const lastWheel = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      // Ne jamais voler les flèches à un champ de saisie (futurs commentaires).
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          prev();
          break;
        case 'Home':
          goTo(0);
          break;
        case 'End':
          goTo(count - 1);
          break;
        default:
          return;
      }
      e.preventDefault();
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 10) return; // micro-mouvements de trackpad
      const now = performance.now();
      if (now - lastWheel.current < wheelLock) return;
      lastWheel.current = now;
      if (e.deltaY > 0) next();
      else prev();
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [enabled, next, prev, goTo, count, wheelLock]);
}
