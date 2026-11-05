import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import AnimalRail from '@/components/hero/AnimalRail.jsx';
import page from './Page.module.css';

/** URL inconnue (ou fiche d'un animal qui n'existe pas) : on reste dans le cadre du site. */
export default function NotFoundPage() {
  return (
    <>
      <div className={page.content}>
        <p className={page.eyebrow}>Erreur 404</p>
        <h1 className={page.title}>Cette piste ne mène nulle part</h1>
        <p className={page.lead}>La page demandée n’existe pas ou a été déplacée.</p>
        <p style={{ marginTop: 'var(--space-3)' }}>
          <Link className={page.button} to="/">
            <ArrowLeft size={16} aria-hidden="true" /> Retour à l’accueil
          </Link>
        </p>
      </div>
      <AnimalRail />
    </>
  );
}
