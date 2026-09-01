import { ArrowIcon } from '../ArrowIcon';

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
    >
      <span className={styles.label}>Back to top</span>

      <span className={styles['icon-container']} aria-hidden="true">
        <ArrowIcon direction="up" />
      </span>
    </button>
  );
};
