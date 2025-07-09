import styles from './BackToTop.module.scss';

export const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <button className={styles['back-to-top']} onClick={handleClick}>
      <span className={styles.label}>Back to top</span>
      <span className={styles.icon}>↑</span>
    </button>
  );
};
