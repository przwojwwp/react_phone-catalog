import styles from './BackToTop.module.scss';
import BackToTopIcon from '@/assets/icons/arrow-up.svg?react';
export const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={styles['back-to-top']}
      onClick={handleClick}
      type="button"
    >
      <span className={styles.label}>Back to top</span>
      <span className={styles.icon}>
        <BackToTopIcon />
      </span>
    </button>
  );
};
