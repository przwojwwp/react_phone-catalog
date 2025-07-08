import BurgerIcon from '../../../../assets/icons/burger-menu.svg';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useMobileMenu } from '../../context/MobileMenuContext';
import { UtilityIcons } from '../UtilityIcons';

import styles from './HeaderActions.module.scss';

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
