import { useEffect } from 'react';

const EASE = 0.14; // part de l'écart rattrapée à chaque frame (lerp) : plus petit = lumière plus « lente »

/**
 * « Lampe de naturaliste » : suit la souris avec une légère inertie et écrit sur l'élément `ref` :
 *   --lx / --ly   position du curseur en px (centre du halo qui révèle la couleur du fond)
 *   --mx / --my   même position normalisée de -1 à 1 (reflet lumineux dans le cadre)
 *   data-lamp     "on" quand la souris est dans la fenêtre, "off" sinon (le CSS ouvre/ferme le halo)
 * Rien ne se déplace à l'écran : seules des lumières bougent (choix de l'auteur, remplace
 * l'ancienne parallaxe qui faisait bouger tout le site).
 *
 * Pourquoi pas useState ? mousemove tire jusqu'à 120×/s : un setState = un re-render de tout
 * le site à chaque fois. Écrire directement des variables CSS ne coûte rien à React.
 * La boucle rAF s'arrête d'elle-même une fois la position atteinte.
 * Désactivé si `enabled` est faux (réduire les animations) ou sans souris (écran tactile).
 */
export function useMouseLight(ref, enabled = true) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !window.matchMedia('(pointer: fine)').matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let started = false;

    const write = () => {
      el.style.setProperty('--lx', `${current.x.toFixed(1)}px`);
      el.style.setProperty('--ly', `${current.y.toFixed(1)}px`);
      el.style.setProperty('--mx', ((current.x / window.innerWidth) * 2 - 1).toFixed(4));
      el.style.setProperty('--my', ((current.y / window.innerHeight) * 2 - 1).toFixed(4));
    };
    const tick = () => {
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      write();
      const moving = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.5;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // 1er mouvement : la lampe s'allume directement sous le curseur (pas de glissement depuis 0,0).
      if (!started) {
        started = true;
        current.x = target.x;
        current.y = target.y;
        write();
      }
      el.dataset.lamp = 'on';
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      el.dataset.lamp = 'off';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      ['--lx', '--ly', '--mx', '--my'].forEach((p) => el.style.removeProperty(p));
      delete el.dataset.lamp;
    };
  }, [ref, enabled]);
}
