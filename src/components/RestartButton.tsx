import { type PropsWithChildren, useEffect } from 'react';
import styles from './RestartButton.module.css';

type RestartButtonProps = {
  onActivate?: () => void;
};

const RestartButton = ({ onActivate, children }: PropsWithChildren<RestartButtonProps>) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log(event);
      if (event.key === ' ') {
        onActivate?.();
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [onActivate]);

  return (
    <button
      onClick={onActivate}
      className={styles.RestartButton}
    >
      {children}
    </button>
  );
};

export default RestartButton;
