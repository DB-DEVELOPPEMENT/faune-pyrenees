import { Link } from 'react-router';
import { CalendarDays, Lightbulb, Mountain } from 'lucide-react';
import Badge from './Badge.jsx';
import PhotoCredit from './PhotoCredit.jsx';
import styles from './LieuCard.module.css';

/**
 * Carte d'un lieu d'observation (page /lieux).
 * @param place   objet de places.js
 * @param animals objets animaux résolus (le 1er fournit la couleur de la carte)
 * @param photo   photo du lieu (data/gallery.js → placePhotos), crédit affiché sous l'image
 * id="lieu-…" : cible des liens /lieux#lieu-… depuis les fiches animaux.
 */
export default function LieuCard({ place, animals, photo }) {
  const lead = animals[0];

  return (
    <article id={`lieu-${place.id}`} className={styles.card} style={{ '--card-accent': lead?.accent }}>
      {/* Photo du lieu (Wikimedia Commons) ; à défaut, la photo du 1er animal. */}
      <div className={styles.media}>
        {photo ? (
          <img src={photo.src} alt={photo.caption} loading="lazy" />
        ) : (
          lead && (
            <img
              src={lead.image}
              alt=""
              loading="lazy"
              style={{ objectPosition: `${lead.focus.x}% ${lead.focus.y}%` }}
            />
          )
        )}
        <span className={styles.altitude}>
          <Mountain size={13} aria-hidden="true" /> {place.altitude}
        </span>
      </div>
      {photo && <PhotoCredit photo={photo} className={styles.credit} />}

      <div className={styles.body}>
        <p className={styles.area}>{place.area}</p>
        <h2 className={styles.name}>{place.name}</h2>
        <p className={styles.text}>{place.description}</p>

        <p className={styles.season}>
          <CalendarDays size={15} aria-hidden="true" />
          <span>
            <span className="sr-only">Meilleure période : </span>
            {place.season}
          </span>
        </p>

        <ul className={styles.badges} aria-label="Animaux observables">
          {animals.map((a) => (
            <li key={a.id}>
              <Link to={`/animaux/${a.id}`}>
                <Badge color={a.accent}>{a.name}</Badge>
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.tip}>
          <Lightbulb size={15} aria-hidden="true" />
          <span>{place.tip}</span>
        </p>
      </div>
    </article>
  );
}
