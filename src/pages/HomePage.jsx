import HeroText from '@/components/hero/HeroText.jsx';
import GlassPanel from '@/components/hero/GlassPanel.jsx';

/**
 * Accueil : texte de l'animal (colonne gauche) + vignettes/pagination (colonne vitrée).
 * La photo animée (HeroScene) n'est pas ici : c'est le fond du cadre, géré par SiteLayout.
 */
export default function HomePage() {
  return (
    <>
      <HeroText />
      <GlassPanel />
    </>
  );
}
