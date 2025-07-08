import styles from './MobileMenu.module.scss';
import { Logo } from '../Logo';
import CloseIcon from '../../assets/icons/close.svg?react';
import { useMobileMenu } from '../../context/MobileMenuContext/MobileMenuContext';
import { NavLinks } from '../NavLinks/NavLinks';
import { UtilityIcons } from '../UtilityIcons/UtilityIcons';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useEffect } from 'react';

export const MobileMenu = () => {
  const { isOpen, close } = useMobileMenu();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile && isOpen) close();

    if (isOpen) {
      document.body.classList.add('no-scroll');
      console.log(isOpen);
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
        <NavLinks className={styles['nav-item']} />
      </div>
      <div className={styles['menu-actions']}>
        <UtilityIcons className={styles['utility-icon']} />
      </div>
    </div>
  );
};
