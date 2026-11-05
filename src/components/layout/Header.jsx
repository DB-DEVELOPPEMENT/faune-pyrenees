import { Link, NavLink } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { MapPin, Menu } from 'lucide-react';
import { useSliderContext } from '@/context/SliderContext.jsx';
// logo.webp = recadrage de logo.svg (qui embarque un PNG de 500 Ko) : 13 Ko.
// Le jour où un vrai logo vectoriel existe, il suffit de changer cet import.
import logo from '@/assets/images/logo.webp';
import styles from './Header.module.css';

// Liens principaux, affichés avant le burger. Ajouter une page = une ligne ici (+ sa <Route>).
const NAV = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/lieux', label: 'Lieux de visite' },
];

/**
 * Colonne gauche : logo, lieu d'observation de l'animal affiché, navigation.
 * Colonne droite (dans la bande vitrée) : bouton du menu burger.
 * @param animal animal affiché (fiche ouverte ou animal du carrousel), fourni par SiteLayout
 */
export default function Header({ animal }) {
  const { menuOpen, setMenuOpen } = useSliderContext();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link to="/" className={styles.logo} aria-label="Faune des Pyrénées — accueil">
          <img src={logo} alt="" width="560" height="200" />
        </Link>

        <div className={styles.place}>
          <p className={styles.placeName}>
            <span className="sr-only">Lieu d’observation : </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={animal.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {animal.place}
              </motion.span>
            </AnimatePresence>
            <span className={styles.line} aria-hidden="true" />
            <MapPin size={16} aria-hidden="true" />
          </p>
          <p className={styles.welcome}>Bienvenue dans nos Pyrénées, avec nos amis les animaux</p>
        </div>

        <nav className={styles.nav} aria-label="Navigation principale">
          {NAV.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={styles.navLink}>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={styles.tools}>
        <button
          type="button"
          className={styles.burger}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={26} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
