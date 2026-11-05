import { useCallback, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import SmartLink from '@/components/ui/SmartLink.jsx';
import styles from './BurgerMenu.module.css';

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Menu plein écran (ouvert par le bouton du Header via menuOpen du contexte).
 * Accessibilité :
 *  - Échap ou clic sur le voile → fermeture ; le focus revient sur l'élément d'origine (le burger)
 *  - « piège à focus » : Tab / Maj+Tab bouclent dans le menu
 *  - le reste de la page est `inert` pendant ce temps (voir Hero.jsx)
 * « Nos Pyrénées » : page bonus pas encore créée → SmartLink sans URL (non cliquable).
 * Le jour où elle existe : remplacer par <Link to="/nos-pyrenees"> (+ sa <Route> dans App.jsx).
 */
export default function BurgerMenu() {
  const { menuOpen, setMenuOpen, animals } = useSliderContext();
  const panelRef = useRef(null);
  const close = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector(FOCUSABLE)?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = panel.querySelectorAll(FOCUSABLE);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [menuOpen, close]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            key="overlay"
            className={styles.overlay}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.nav
            key="panel"
            id="menu-principal"
            ref={panelRef}
            className={styles.panel}
            aria-label="Menu principal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className={styles.close} onClick={close} aria-label="Fermer le menu">
              <X size={26} aria-hidden="true" />
            </button>

            <ul className={styles.primary}>
              <li>
                <Link to="/" onClick={close}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/lieux" onClick={close}>
                  Lieux de visite
                </Link>
              </li>
              <li>
                <SmartLink href={null} external={false}>
                  Nos Pyrénées <span className={styles.soon}>bientôt</span>
                </SmartLink>
              </li>
            </ul>

            <div>
              <h2 className={styles.heading}>Les fiches animaux</h2>
              <ul className={styles.animals}>
                {animals.map((a) => (
                  <li key={a.id}>
                    {/* NavLink pose aria-current="page" sur la fiche ouverte. */}
                    <NavLink
                      to={`/animaux/${a.id}`}
                      className={styles.animal}
                      onClick={close}
                      style={{ '--dot': a.accent }}
                    >
                      <span className={styles.num}>{a.index}</span>
                      <span className={styles.dot} aria-hidden="true" />
                      <span>
                        {a.name}
                        <span className={styles.latin}>{a.latin}</span>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
