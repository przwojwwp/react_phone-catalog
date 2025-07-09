import { Logo } from '../Logo';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.links}>
          <a
            href="https://github.com/przwojwwp/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:przyluskiwojciech@gmail.com">Contact</a>
          <a href="Rights" target="_blank">
            Rights
          </a>
        </div>
        <button className={styles['back-to-top']}>
          <span className={styles['back-to-top-label']}>Back to top</span>
          <span className={styles['back-to-top-icon']}>↑</span>
        </button>
      </div>
    </div>
  );
};
