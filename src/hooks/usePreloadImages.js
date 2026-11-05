import { useEffect, useRef } from 'react';

/**
 * Précharge ET décode des images, APRÈS le chargement de la page
 * (pour ne pas concurrencer la première photo, qui est l'élément LCP).
 *
 * Pourquoi decode() ? Télécharger ne suffit pas : une grande image doit aussi être décodée
 * avant d'être peinte. Sans ça, au premier passage, l'image apparaît d'un coup au milieu
 * du portail (effet de « saut »). Les objets Image sont gardés dans une ref pour que le
 * navigateur conserve la version décodée en mémoire.
 * `urls` doit être stable (useMemo côté appelant), sinon l'effet se relance à chaque rendu.
 */
export function usePreloadImages(urls) {
  const keep = useRef([]);

  useEffect(() => {
    const preload = () => {
      keep.current = urls.map((src) => {
        const img = new Image();
        img.src = src;
        img.decode().catch(() => {}); // une image manquante ne doit pas casser le site
        return img;
      });
    };

    if (document.readyState === 'complete') {
      preload();
      return;
    }
    window.addEventListener('load', preload, { once: true });
    return () => window.removeEventListener('load', preload);
  }, [urls]);
}
