import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useSliderContext } from '@/context/SliderContext.jsx';
import { places } from '@/data/places.js';
import { placePhotos } from '@/data/gallery.js';
import AnimalRail from '@/components/hero/AnimalRail.jsx';
import LieuCard from '@/components/ui/LieuCard.jsx';
import PhotoCredit from '@/components/ui/PhotoCredit.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import page from './Page.module.css';
import styles from './PlacesPage.module.css';

const BANNER = placePhotos.ossau; // le Pic du Midi d'Ossau dans le lac Gentau : l'image-carte postale

const CHARTER = [
  'Restez sur les sentiers balisés et respectez la réglementation des réserves.',
  'Gardez vos distances : si l’animal change de comportement, vous êtes trop près.',
  'Jumelles et longue-vue plutôt qu’approche ; jamais de drone près de la faune.',
  'Ne nourrissez aucun animal sauvage, même les marmottes « apprivoisées ».',
  'Tenez votre chien en laisse, et laissez-le à la maison dans les réserves où il est interdit.',
  'En hiver, chaque fuite coûte à l’animal une énergie vitale : évitez les zones de quiétude.',
];

/**
 * Page /lieux : où observer les animaux.
 * - Filtre par animal : useState (filtre choisi) + useMemo (liste filtrée recalculée seulement
 *   quand le filtre change).
 * - Ancre /lieux#lieu-aspe (liens depuis les fiches) : on fait défiler le conteneur .content
 *   lui-même (scrollTo), pas la page, qui ne défile pas.
 */
export default function PlacesPage() {
  const { animals } = useSliderContext();
  const { hash } = useLocation();
  const scrollRef = useRef(null);
  const [filter, setFilter] = useState('all');

  const byId = useMemo(() => Object.fromEntries(animals.map((a) => [a.id, a])), [animals]);
  const visible = useMemo(
    () => (filter === 'all' ? places : places.filter((p) => p.animals.includes(filter))),
    [filter],
  );

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    const box = scrollRef.current;
    if (!target || !box) return;
    box.scrollTo({ top: target.offsetTop - 16, behavior: 'smooth' });
  }, [hash]);

  return (
    <>
      <div ref={scrollRef} className={`${page.content} ${styles.content}`}>
        <nav className={page.crumbs} aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Lieux de visite</span>
        </nav>

        {/* Bandeau d'ouverture : grande photo de paysage, titre posé dessus. */}
        <header className={styles.banner}>
          <img src={BANNER.src} alt={BANNER.caption} />
          <div className={styles.bannerText}>
            <p className={page.eyebrow}>Carnet de terrain</p>
            <h1 className={page.title}>Lieux de visite</h1>
          </div>
          <PhotoCredit photo={BANNER} className={styles.bannerCredit} />
        </header>
        <p className={page.lead}>
          Sept sites des Pyrénées où croiser — ou au moins deviner — nos amis les animaux. Lacs d’altitude,
          cirques glaciaires, vieilles forêts : choisissez un animal pour ne voir que les lieux où il vit.
        </p>

        <div className={styles.filters} role="group" aria-label="Filtrer les lieux par animal">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            Tous
          </button>
          {animals.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={filter === a.id}
              onClick={() => setFilter(a.id)}
              style={{ '--chip': a.accent }}
            >
              {a.name}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {visible.length} lieu{visible.length > 1 ? 'x' : ''} affiché{visible.length > 1 ? 's' : ''}
        </p>

        {/* key = filtre : les cartes rejouent leur apparition en cascade à chaque filtre. */}
        <div key={filter} className={styles.grid}>
          {visible.map((p, k) => (
            <Reveal key={p.id} root={scrollRef} delay={(k % 3) * 0.1}>
              <LieuCard
                place={p}
                photo={placePhotos[p.id]}
                animals={p.animals.map((id) => byId[id]).filter(Boolean)}
              />
            </Reveal>
          ))}
        </div>

        <section className={styles.charter} aria-labelledby="charte">
          <h2 id="charte">La charte du bon observateur</h2>
          <ol>
            {CHARTER.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </section>

        <p className={styles.disclaimer}>
          Informations indicatives. Avant de partir, vérifiez les conditions d’accès et la réglementation
          auprès du Parc national des Pyrénées, des réserves naturelles et des offices de tourisme.
        </p>
      </div>

      <AnimalRail />
    </>
  );
}
