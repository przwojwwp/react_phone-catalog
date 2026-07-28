import BackToTopIcon from '@/assets/icons/arrow-up.svg?react';

import styles from './BackToTop.module.scss';

export const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={styles['back-to-top']}
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
    >
      <span className={styles.label}>Back to top</span>

      <span className={styles['icon-container']} aria-hidden="true">
        <BackToTopIcon />
      </span>
    </button>
  );
};
