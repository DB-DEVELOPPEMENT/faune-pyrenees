import { useMemo, useRef } from 'react';
import { useLocation, useMatch, useOutlet } from 'react-router';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import { UI } from '@/config/ui.js';
import { useKeyboardNav } from '@/hooks/useKeyboardNav.js';
import { useMouseLight } from '@/hooks/useMouseLight.js';
import { usePreloadImages } from '@/hooks/usePreloadImages.js';
import { useSwipe } from '@/hooks/useSwipe.js';
import HeroScene from '@/components/hero/HeroScene.jsx';
import Backdrop from './Backdrop.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import BurgerMenu from './BurgerMenu.jsx';
import styles from './SiteLayout.module.css';

// Couleur du texte posé SUR --accent : sombre si l'accent est clair, blanc sinon (contraste WCAG).
const inkFor = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 128 ? '#0b0d10' : '#ffffff';
};

/**
 * Cadre commun à toutes les pages (composition de la maquette) :
 *
 *   ┌ Backdrop : la photo de l’animal en plein écran, noir & blanc, voilée ───────┐
 *   │   ┌ .frame (data-stage) : « le site », bord droit + liseré clair ──────┐  │
 *   │   │ [ header (logo, lieu, nav)  | burger  ]  ← bande vitrée à droite   │  │
 *   │   │ [ main = page de la route   | vignettes ]                          │  │
 *   │   │ [ footer (réseaux, signature)| autoplay ]                          │  │
 *   │   └────────────────────────────────────────────────────────────────────┘  │
 *   │   .marks : repères d'angle façon viseur photo, à la couleur de l'animal    │
 *   └──────────────────────────────────────────────────────────────────────────┘
 *
 * « Animal affiché » : celui de la fiche ouverte (/animaux/:id), sinon celui du carrousel.
 * Il pilote le fond, l'accent (--accent/--glow) et le lieu de l'en-tête.
 * Fond du cadre : la photo animée (HeroScene) sur l'accueil, un fond sombre teinté ailleurs.
 */
export default function SiteLayout() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const ficheId = useMatch('/animaux/:id')?.params.id;
  const { animals, activeAnimal, next, prev, goTo, menuOpen } = useSliderContext();

  const isHome = pathname === '/';
  const displayed = animals.find((a) => a.id === ficheId) ?? activeAnimal;

  const heroUrls = useMemo(() => animals.map((a) => a.image), [animals]);
  usePreloadImages(heroUrls);
  useMouseLight(rootRef, !reduced);
  // Flèches / molette / swipe : uniquement sur l'accueil (ailleurs, la molette fait défiler la page).
  const navEnabled = isHome && !menuOpen;
  useKeyboardNav({
    next,
    prev,
    goTo,
    count: animals.length,
    enabled: navEnabled,
    wheelLock: UI.wheelLock,
  });
  const swipe = useSwipe(next, prev, { enabled: navEnabled });

  return (
    <div
      ref={rootRef}
      className={styles.site}
      style={{
        '--accent': displayed.accent,
        '--glow': displayed.glow,
        '--on-accent': inkFor(displayed.accent),
      }}
      {...swipe}
    >
      <Backdrop animal={displayed} />

      <div className={styles.frame} data-stage>
        {/* .scaler : le site est mis en page à sa taille « normale » puis réduit d'un bloc
            (--site-scale), comme une miniature : textes, vignettes et marges réduits ensemble. */}
        <div className={styles.scaler}>
          <AnimatePresence initial={false}>
            {isHome ? (
              <motion.div
                key="scene"
                className={styles.fill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <HeroScene />
              </motion.div>
            ) : (
              <motion.div
                key="paper"
                className={styles.paper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>

          {/* inert : menu ouvert → le site n'est plus atteignable au clavier ni au lecteur d'écran. */}
          <div className={styles.layout} inert={menuOpen}>
            <div className={styles.glass} aria-hidden="true" />
            <Header animal={displayed} />
            <main className={styles.main}>
              {/* key = URL : transition entre pages, et chaque page repart avec un défilement en haut. */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={pathname}
                  className={styles.page}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {outlet}
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer isHome={isHome} />
          </div>
        </div>
      </div>

      {/* key : les repères se « remettent au point » à chaque changement d'animal. */}
      <div key={displayed.id} className={styles.marks} aria-hidden="true" />

      <BurgerMenu />
    </div>
  );
}
