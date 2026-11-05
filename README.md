# Faune des Pyrénées

Site vitrine immersif consacré à sept animaux des Pyrénées : chouette de Tengmalm, ours brun,
marmotte, loup gris, aigle royal, grand tétras et isard.

Démo : https://faune.db-dev.fr

## Stack

React 19, Vite, React Router, Motion (animations), CSS Modules et variables CSS, lucide-react.

## Lancer le projet

```bash
npm install
npm run dev      # serveur de développement
npm run build    # version de production dans dist/
npm run lint
```

## Organisation

- `src/data/` : contenus (animaux, lieux, crédits photo) — le seul endroit à modifier pour les textes
- `src/components/` : mise en page, scène animée, éléments d'interface
- `src/hooks/` : carrousel, navigation clavier/molette, lampe souris, préchargement
- `src/pages/` : accueil, fiche animal, lieux de visite, 404
- `public/.htaccess` : redirection des URL vers `index.html` (React Router) sur Apache

## Crédits

Les photos des galeries et des lieux proviennent de Wikimedia Commons, sous licences libres
(CC BY / CC BY-SA). Auteur et licence sont affichés sous chaque photo et listés dans
`src/data/gallery.js`.

Conception et développement : DB-Développement — https://db-dev.fr
