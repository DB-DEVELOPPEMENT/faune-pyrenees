import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Logique du carrousel : index actif, direction, origine du portail, autoplay.
 *
 * @param {number} count          nombre d'éléments
 * @param {object} options
 *   autoplay   démarre en lecture (ignoré si l'OS demande « réduire les animations »)
 *   delay      ms entre deux éléments
 *   held       true = pause temporaire imposée par le parent (survol du panneau, menu ouvert)
 *   getOrigin  (index) => {x, y} en % de l'écran : d'où part le portail circulaire
 *
 * Pourquoi un setTimeout relancé à chaque changement (et pas un setInterval) ?
 * Après un clic manuel, l'animal suivant arrive bien `delay` ms plus tard, jamais 1 s après.
 *
 * Pourquoi `goTo/next/prev` dépendent de `index` (pas de setState(fn)) ?
 * Il faut connaître la cible AVANT la mise à jour pour mesurer la vignette (getOrigin)
 * dans le gestionnaire d'événement, pas dans un updater (qui doit rester pur).
 */
export function useSlider(count, { autoplay = true, delay = 6000, held = false, getOrigin } = {}) {
  const [state, setState] = useState({ index: 0, direction: 1, origin: null });
  const [playing, setPlaying] = useState(
    () => autoplay && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [hidden, setHidden] = useState(() => document.hidden);
  const { index } = state;

  const goTo = useCallback(
    (target, direction) => {
      const i = ((target % count) + count) % count; // modulo qui gère aussi les négatifs
      if (i === index) return;
      setState({
        index: i,
        direction: direction ?? (i > index ? 1 : -1),
        origin: getOrigin?.(i) ?? null,
      });
    },
    [index, count, getOrigin],
  );
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  const running = playing && !held && !hidden;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(next, delay);
    return () => clearTimeout(t); // cleanup : sinon double minuterie en StrictMode
  }, [running, next, delay]);

  // Onglet caché → pause : économise la batterie et ne « rate » aucune transition.
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  return useMemo(
    () => ({ ...state, goTo, next, prev, playing, setPlaying, running, delay }),
    [state, goTo, next, prev, playing, running, delay],
  );
}
