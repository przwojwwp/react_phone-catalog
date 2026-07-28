import { ArrowIcon, type ArrowDirection } from '../ArrowIcon';

import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
  direction: ArrowDirection;
  ariaLabel: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const ArrowButton = ({
  direction,
  ariaLabel,
  disabled = false,
  onClick,
}: ArrowButtonProps) => {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      <ArrowIcon direction={direction} />
    </button>
  );
};
