/**
 * Rend un <a> si `href` est une chaîne non vide, sinon un <span> au même style.
 * Pourquoi ? Un lien vide (#) trompe le visiteur et les lecteurs d'écran.
 * Pour activer : renseigner l'URL (animals.js → links.more / links.video, Footer → SOCIALS).
 * Lien externe (YouTube, réseaux) : nouvel onglet + rel="noopener noreferrer" (sécurité).
 */
export default function SmartLink({ href, className, children, external = true, ...rest }) {
  if (!href) {
    return (
      <span className={className} aria-disabled="true" {...rest}>
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      className={className}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
