import { Logo } from '../Logo';
import CloseIcon from '@/assets/icons/close.svg?react';
import { useMobileMenu } from '../../context';
import { NavLinks } from '../NavLinks';
import { UtilityIcons } from '../UtilityIcons';
import { useIsMobile } from '../../hooks';
import { useEffect } from 'react';

import styles from './MobileMenu.module.scss';

export const MobileMenu = () => {
  const { isOpen, close } = useMobileMenu();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile && isOpen) close();

    if (isOpen) {
      document.body.classList.add('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMobile, isOpen]);

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <Logo />
        <button className={styles['close-icon']} onClick={close}>
          <CloseIcon />
        </button>
      </div>

      <div className={styles['mobile-navigation']}>
        <NavLinks onItemClick={close} />
      </div>
      <div className={styles['menu-actions']}>
        <UtilityIcons className={styles['utility-icon']} onItemClick={close} />
      </div>
    </div>
  );
};
