import styles from './Badge.module.css';

/** Étiquette compacte avec pastille de couleur (par défaut : l'accent de l'animal affiché). */
export default function Badge({ children, color = 'var(--accent)' }) {
  return (
    <span className={styles.badge} style={{ '--badge': color }}>
      {children}
    </span>
  );
}
