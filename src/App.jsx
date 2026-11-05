import { MotionConfig } from 'motion/react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SliderProvider } from '@/context/SliderContext.jsx';
import SiteLayout from '@/components/layout/SiteLayout.jsx';
import HomePage from '@/pages/HomePage.jsx';
import AnimalPage from '@/pages/AnimalPage.jsx';
import PlacesPage from '@/pages/PlacesPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';

/**
 * Racine de l'application.
 * - MotionConfig reducedMotion="user" : Motion coupe les transformations si l'utilisateur
 *   a activé « réduire les animations » dans son système.
 * - Routes : toutes les pages s'affichent DANS le cadre de SiteLayout (fond + header + footer
 *   communs) via <Outlet />. Ajouter une page = un composant dans src/pages + une <Route>.
 * - Production : le serveur doit renvoyer index.html pour toute URL inconnue
 *   (voir public/.htaccess pour Apache/Plesk), sinon /lieux donne une 404 au rechargement.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <SliderProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<HomePage />} />
              <Route path="animaux/:id" element={<AnimalPage />} />
              <Route path="lieux" element={<PlacesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </SliderProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
