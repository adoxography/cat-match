import { type MouseEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Help.module.css';

type HelpProps = {
  open?: boolean;
  onClose?: () => void;
};

const Help = ({ open, onClose }: HelpProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;

    if (!dialog) {
      return;
    }

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      onClose?.();
    }
  };

  return (
    <dialog
      ref={ref}
      className={clsx(styles.Help, open && styles['Help--open'])}
      onClose={onClose}
      onClick={handleClick}
    >
      <button
        autoFocus
        className={clsx('material-symbols-outlined', styles['Help__close-button'])}
        onClick={onClose}
      >
        close
      </button>
      <h2 className={styles['Help__title']}>Help</h2>
      <h3 className={styles['Help__subtitle']}>How to Play</h3>
      <p className={styles['Help__paragraph']}>
        Play this with a friend! Each player takes one half of the board,{' '}
        each with the same number of pictures. It's a race to see who can{' '}
        identify the repeated picture first!
      </p>
      <h3 className={styles['Help__subtitle']}>Scoring</h3>
      <p className={styles['Help__paragraph']}>
        You <strong>gain 3 points</strong> if you tap the repeated picture{' '}
        within <strong>3 seconds</strong>. If you tap the wrong picture, you{' '}
        will <strong>lose 1 point</strong>. If you take longer than 3 seconds{' '}
        or first make a wrong guess before guessing correctly, you only get{' '}
        <strong>one point</strong>.
      </p>
      <p className={styles['Help__paragraph']}>
        The first player to <strong>20 points</strong> wins!
      </p>
    </dialog>
  );
}

export default Help;
