import styles from './HeaderActions.module.scss';
import BurgerIcon from '../../assets/icons/burger-menu.svg?react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useMobileMenu } from '../../context/MobileMenuContext';
import { UtilityIcons } from '../UtilityIcons';

export const HeaderActions = () => {
  const isMobile = useIsMobile();
  const { open } = useMobileMenu();

  return (
    <div className={styles['header-actions']}>
      {isMobile ? (
        <button className={styles['burger-menu-button']} onClick={open}>
          <BurgerIcon />
        </button>
      ) : (
        <UtilityIcons className={styles.icon} />
      )}
    </div>
  );
};
