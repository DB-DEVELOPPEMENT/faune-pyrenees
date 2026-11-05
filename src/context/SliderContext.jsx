import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { animals } from '@/data/animals.js';
import { UI } from '@/config/ui.js';
import { useSlider } from '@/hooks/useSlider.js';

/**
 * État partagé de la page d'accueil, lisible partout sans « prop drilling » :
 *   animals, activeAnimal, index, direction, origin (portail),
 *   goTo/next/prev, playing/setPlaying/running/delay (autoplay),
 *   registerThumb (mesure des vignettes), setHovered, menuOpen/setMenuOpen.
 *
 * Back-end futur : remplacer l'import `animals` par un fetch (ou TanStack Query) ici ;
 * aucun composant n'aura à changer.
 */
const SliderContext = createContext(null);

const clamp = (v) => Math.min(100, Math.max(0, v));

export function SliderProvider({ children }) {
  const thumbRefs = useRef([]);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Chaque vignette s'enregistre (callback ref) pour que le portail parte de SA position,
  // même quand le changement vient du clavier, de la molette ou de l'autoplay.
  const registerThumb = useCallback((i, el) => {
    thumbRefs.current[i] = el;
  }, []);

  const getOrigin = useCallback((i) => {
    const el = thumbRefs.current[i];
    // La « scène » est le cadre du site (data-stage dans SiteLayout), pas la fenêtre.
    const stage = el?.closest('[data-stage]');
    const r = el?.getBoundingClientRect();
    if (!stage || !r?.width) return null;
    const s = stage.getBoundingClientRect();
    // En % du cadre : clip-path reste juste quelle que soit la taille de fenêtre.
    // Bornée à 0–100 : sur mobile une vignette peut être hors champ (rangée défilante).
    return {
      x: clamp(((r.left + r.width / 2 - s.left) / s.width) * 100),
      y: clamp(((r.top + r.height / 2 - s.top) / s.height) * 100),
    };
  }, []);

  // L'autoplay ne tourne que sur l'accueil : sur une fiche ou les lieux, le fond ne doit pas bouger.
  const isHome = useLocation().pathname === '/';

  const slider = useSlider(animals.length, {
    autoplay: UI.autoplay,
    delay: UI.autoplayDelay,
    held: hovered || menuOpen || !isHome,
    getOrigin,
  });

  // useMemo : sans lui, un nouvel objet à chaque rendu re-rendrait TOUS les consommateurs.
  const value = useMemo(
    () => ({
      animals,
      activeAnimal: animals[slider.index],
      ...slider,
      registerThumb,
      setHovered,
      menuOpen,
      setMenuOpen,
    }),
    [slider, registerThumb, menuOpen],
  );

  return <SliderContext.Provider value={value}>{children}</SliderContext.Provider>;
}

// Le hook vit à côté de son Provider par convention ; Fast Refresh recharge alors
// tout le fichier au lieu du seul composant (sans conséquence ici).
// eslint-disable-next-line react-refresh/only-export-components
export function useSliderContext() {
  const ctx = useContext(SliderContext);
  if (!ctx) throw new Error('useSliderContext doit être utilisé dans <SliderProvider>');
  return ctx;
}
