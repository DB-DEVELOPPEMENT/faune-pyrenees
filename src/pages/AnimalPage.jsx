import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Binoculars, Expand, MapPin } from 'lucide-react';
import { useSliderContext } from '@/context/SliderContext.jsx';
import { places } from '@/data/places.js';
import { gallery, placePhotos } from '@/data/gallery.js';
import AnimalRail from '@/components/hero/AnimalRail.jsx';
import Lightbox from '@/components/ui/Lightbox.jsx';
import PhotoCredit from '@/components/ui/PhotoCredit.jsx';
import Reveal from '@/components/ui/Reveal.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import page from './Page.module.css';
import styles from './AnimalPage.module.css';

/**
 * Fiche « En savoir plus » : /animaux/:id
 * Contenu : animals.js (textes, fiche d'identité), places.js (où l'observer),
 * gallery.js (photos Wikimedia Commons + crédits obligatoires).
 *
 * Apparition au défilement : composant Reveal, avec comme racine le conteneur qui défile
 * (scrollRef) — la page elle-même ne défile pas, seul .content le fait.
 */
export default function AnimalPage() {
  const { id } = useParams();
  const { animals } = useSliderContext();
  const scrollRef = useRef(null);
  const [zoomed, setZoomed] = useState(null); // index de la photo ouverte en plein écran

  const i = animals.findIndex((a) => a.id === id);
  if (i === -1) return <NotFoundPage />;

  const a = animals[i];
  const prev = animals[(i - 1 + animals.length) % animals.length];
  const next = animals[(i + 1) % animals.length];
  const where = places.filter((p) => p.animals.includes(a.id));
  const photos = gallery[a.id] ?? [];
  const focus = `${a.focus.x}% ${a.focus.y}%`;

  return (
    <>
      <article ref={scrollRef} className={page.content}>
        <nav className={page.crumbs} aria-label="Fil d’Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <span>Les animaux</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{a.name}</span>
        </nav>

        <header>
          <p className={page.eyebrow}>{a.tagline}</p>
          <h1 className={page.title}>{a.name}</h1>
          <p className={styles.latin}>{a.latin}</p>
        </header>

        {/* Couverture : lent zoom arrière « Ken Burns » (CSS) */}
        <figure className={styles.cover}>
          <img src={a.image} alt={`${a.name} dans son milieu naturel`} style={{ objectPosition: focus }} />
          <figcaption>
            <MapPin size={14} aria-hidden="true" /> {a.place}
          </figcaption>
        </figure>

        <div className={styles.columns}>
          <Reveal as="section" root={scrollRef} aria-labelledby="portrait">
            <h2 id="portrait">Portrait</h2>
            <p className={page.lead}>{a.description}</p>
            {a.details.map((text) => (
              <p key={text}>{text}</p>
            ))}

            <h2>Quand et comment l’observer</h2>
            <p className={styles.observe}>
              <Binoculars size={18} aria-hidden="true" />
              <span>{a.observe}</span>
            </p>
          </Reveal>

          <Reveal
            as="aside"
            root={scrollRef}
            delay={0.15}
            className={styles.facts}
            aria-labelledby="identite"
          >
            <h2 id="identite">Fiche d’identité</h2>
            <dl>
              {a.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {photos.length > 0 && (
          <section aria-labelledby="galerie">
            <Reveal as="h2" root={scrollRef} id="galerie">
              Galerie
            </Reveal>
            <div className={styles.gallery}>
              {photos.map((p, k) => (
                <Reveal
                  as="figure"
                  root={scrollRef}
                  delay={k * 0.12}
                  key={p.src}
                  className={k === 0 ? styles.wide : undefined}
                >
                  <button
                    type="button"
                    className={styles.zoomBtn}
                    onClick={() => setZoomed(k)}
                    aria-label={`Agrandir la photo : ${p.caption}`}
                  >
                    <img src={p.src} alt={p.caption} loading="lazy" />
                    <span className={styles.zoomIcon} aria-hidden="true">
                      <Expand size={16} />
                    </span>
                  </button>
                  <figcaption>
                    <span>{p.caption}</span>
                    <PhotoCredit photo={p} />
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {where.length > 0 && (
          <section aria-labelledby="ou">
            <Reveal as="h2" root={scrollRef} id="ou">
              Où l’observer
            </Reveal>
            <ul className={styles.spots}>
              {where.map((p, k) => (
                <Reveal as="li" root={scrollRef} delay={k * 0.1} key={p.id}>
                  <Link to={`/lieux#lieu-${p.id}`} className={styles.spot}>
                    {placePhotos[p.id] && <img src={placePhotos[p.id].src} alt="" loading="lazy" />}
                    <span className={styles.spotText}>
                      <strong>{p.name}</strong>
                      <span>
                        {p.altitude} · {p.season}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        <nav className={styles.pager} aria-label="Autres animaux">
          <Link className={page.button} to={`/animaux/${prev.id}`}>
            <ArrowLeft size={16} aria-hidden="true" /> {prev.name}
          </Link>
          <Link className={page.button} to={`/animaux/${next.id}`}>
            {next.name} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </article>

      <AnimalRail activeId={a.id} />
      <Lightbox photos={photos} index={zoomed} onClose={() => setZoomed(null)} onIndex={setZoomed} />
    </>
  );
}
