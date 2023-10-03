import { type TouchEvent, memo } from 'react';
import clsx from 'clsx';
import getImage from '../utils/getImage';
import styles from './Image.module.css';

type ImageProps = {
  imageId: string | number;
  onClick?: () => void;
  highlight?: boolean;
  disabled?: boolean;
  guessed?: boolean;
};

const Image = memo(({
  imageId,
  highlight,
  disabled,
  onClick,
  guessed,
}: ImageProps) => {
  const handleTap = (event: TouchEvent<HTMLButtonElement>) => {
    if (!disabled) {
      event.preventDefault();
      onClick?.();
    }
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      onTouchStart={handleTap}
      onClick={handleClick}
      disabled={disabled || guessed || highlight}
      className={styles.Image}
    >
      {guessed && <div className={clsx(styles.Image__status, styles['Image__status--incorrect'])}>X</div>}
      {highlight && <div className={clsx(styles.Image__status, styles['Image__status--correct'])}>O</div>}
      <img
        src={getImage(imageId)}
        style={{
          width: '100%',
        }}
      />
    </button>
  );
});

export default Image;
