import { node } from 'prop-types';
import { useState } from 'react';
import styles from './Overlay.module.scss';

const Overlay = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const closeOverlay = () => setIsOpen(false)

  return isOpen && (
    <div className={styles.overlay}>
      <button
        type='button'
        title='Close'
        className={styles.overlay__button}
        onClick={closeOverlay}
      >
        &#x2715;
      </button>
      <div className={styles.overlay__content}>
        {children}
      </div>
    </div>
  )
};

Overlay.propTypes = {
  children: node.isRequired,
};

export default Overlay;
