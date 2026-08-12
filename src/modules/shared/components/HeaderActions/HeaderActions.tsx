import BurgerIcon from '@/assets/icons/burger-menu.svg?react';
import { useMobileMenu } from '../../context/MobileMenuContext';
import { UtilityIcons } from '../UtilityIcons';

import styles from './HeaderActions.module.scss';

export const HeaderActions = () => {
  const { open } = useMobileMenu();

  return (
    <div className={styles['header-actions']}>
      <button className={styles['burger-menu-button']} onClick={open}>
        <BurgerIcon />
      </button>

      <UtilityIcons className={styles.icon} />
    </div>
  );
};
