import { motion } from 'motion/react';

// Balises autorisées : liste fixe (créer un composant motion.* pendant le rendu le recréerait à chaque fois).
const TAGS = {
  div: motion.div,
  section: motion.section,
  aside: motion.aside,
  h2: motion.h2,
  figure: motion.figure,
  li: motion.li,
};

/**
 * Apparition au défilement : l'élément glisse de 28 px vers le haut en fondu, une seule fois,
 * quand 20 % de sa surface entre dans la zone visible.
 * @param root  ref du conteneur qui DÉFILE (ici .content des pages, pas la fenêtre)
 * @param as    balise rendue (voir TAGS)
 * @param delay décalage en secondes (effet cascade dans une liste)
 * Réduire les animations : MotionConfig (App.jsx) supprime le glissement, il reste un fondu.
 */
export default function Reveal({ as = 'div', root, delay = 0, ...rest }) {
  const Tag = TAGS[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root, once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    />
  );
}
