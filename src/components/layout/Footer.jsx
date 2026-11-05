import { Pause, Play } from 'lucide-react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import SmartLink from '@/components/ui/SmartLink.jsx';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/ui/SocialIcons.jsx';
import styles from './Footer.module.css';

/**
 * Réseaux sociaux : url: null → icône affichée mais NON cliquable (SmartLink rend un <span>).
 * Pour activer un réseau : remplacer null par l'URL du profil.
 */
const SOCIALS = [
  { name: 'Instagram', url: null, Icon: InstagramIcon },
  { name: 'Facebook', url: null, Icon: FacebookIcon },
  { name: 'YouTube', url: null, Icon: YoutubeIcon },
];

// Signature de l'auteur : « Contact » mène au portfolio (nouvel onglet).
const AUTHOR = { name: 'DB-Développement', url: 'https://db-dev.fr' };

/**
 * Colonne gauche : © · réseaux · signature. Colonne droite (accueil seulement) :
 * lecture/pause du défilement automatique.
 * Le bouton pause est aussi une exigence d'accessibilité (WCAG 2.2.2 : tout contenu
 * qui bouge seul plus de 5 s doit pouvoir être mis en pause).
 * L'anneau de progression est une animation CSS de `delay` ms, relancée (key) à chaque
 * animal et masquée quand le défilement est suspendu (survol, menu, onglet caché).
 */
export default function Footer({ isHome }) {
  const { playing, setPlaying, running, index, delay } = useSliderContext();

  return (
    <footer className={styles.footer}>
      <div className={styles.bottom}>
        <p className={styles.copy}>© 2026 Faune des Pyrénées</p>

        <div className={styles.social}>
          <p className={styles.label}>Réseaux sociaux</p>
          <ul className={styles.icons}>
            {SOCIALS.map(({ name, url, Icon }) => (
              <li key={name}>
                <SmartLink href={url} className={styles.icon}>
                  <Icon />
                  <span className="sr-only">{name}</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.signature}>
          <span className={styles.by}>Conception</span>
          <span className={styles.author}>{AUTHOR.name}</span>
          <SmartLink href={AUTHOR.url} className={styles.contact}>
            Contact
          </SmartLink>
        </p>
      </div>

      {isHome && (
        <div className={styles.autoplay}>
          <button
            type="button"
            className={styles.play}
            aria-pressed={playing}
            aria-label="Défilement automatique"
            onClick={() => setPlaying((p) => !p)}
          >
            <svg
              key={`${index}-${running}`}
              className={styles.progress}
              data-running={running}
              style={{ '--delay': `${delay}ms` }}
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <circle cx="24" cy="24" r="22" pathLength="100" />
            </svg>
            {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
          </button>
          <p className={styles.autoText}>
            {playing ? 'Défilement automatique' : 'Défilement en pause'}
            <span>Flèches, molette ou glisser pour explorer</span>
          </p>
        </div>
      )}
    </footer>
  );
}
