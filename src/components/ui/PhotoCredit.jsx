import styles from './PhotoCredit.module.css';

/**
 * Crédit OBLIGATOIRE des photos Wikimedia Commons (licences CC BY / CC BY-SA) :
 * auteur + licence + lien vers la source. À afficher partout où la photo apparaît.
 * @param photo objet de data/gallery.js
 */
export default function PhotoCredit({ photo, className = '' }) {
  return (
    <small className={`${styles.credit} ${className}`}>
      Photo{' '}
      <a href={photo.source} target="_blank" rel="noopener noreferrer">
        {photo.author}
      </a>
      {' · '}
      {photo.licenseUrl ? (
        <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">
          {photo.license}
        </a>
      ) : (
        photo.license
      )}
    </small>
  );
}
