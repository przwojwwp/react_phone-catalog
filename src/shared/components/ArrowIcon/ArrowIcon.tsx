import ArrowSvg from '@/assets/icons/arrow.svg?react';

import styles from './ArrowIcon.module.scss';

export type ArrowDirection = 'up' | 'right' | 'down' | 'left';

type ArrowIconProps = {
  direction?: ArrowDirection;
  className?: string;
};

export const ArrowIcon = ({
  direction = 'up',
  className = '',
}: ArrowIconProps) => {
  return (
    <ArrowSvg
      className={`${styles.icon} ${styles[direction]} ${className}`}
      aria-hidden="true"
    />
  );
};
