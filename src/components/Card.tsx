import { CSSProperties } from "react";
import Image from "./Image";
import useRandomValue from "../hooks/useRandomValue";
import clsx from "clsx";
import styles from './Card.module.css';

type CardProps = {
  winner?: boolean;
  score?: number;
  imageSet: number[];
  guesses?: Set<number>;
  onClick?: (id: number) => void;
  variant?: 'win' | 'lose';
  highlight?: number;
  position?: 'top' | 'bottom';
};

type CardItemProps = {
  imageId: string | number;
  numObjects: number;
  idx: number;
  onClick?: () => void;
  disabled?: boolean;
  highlight?: boolean;
  guessed?: boolean;
};

const CardItem = ({
  imageId,
  numObjects,
  idx,
  onClick,
  disabled,
  highlight,
  guessed,
}: CardItemProps) => {
  const rotation = useRandomValue();
  const scale = useRandomValue();

  return (
    <div
      className={styles.Card__item}
      style={{
        '--n': numObjects,
        '--i': idx,
        '--rotation': `${rotation * Math.PI * 2}rad`,
        '--scale': scale * 0.5,
      } as CSSProperties}
    >
      <Image
        imageId={imageId}
        highlight={highlight}
        onClick={onClick}
        disabled={disabled}
        guessed={guessed}
      />
    </div>
  );
};

const Card = ({
  winner,
  imageSet,
  onClick,
  highlight,
  position,
  score,
  variant,
  guesses,
}: CardProps) => (
  <div
    className={clsx(
      styles.Card,
      position === 'top' && styles['Card--top'],
      position === 'bottom' && styles['Card--bottom'],
      variant === 'win' && styles['Card--win'],
      variant === 'lose' && styles['Card--lose'],
    )}
  >
    <div className={styles.Card__score}>
      {score ?? 0}
    </div>
    {winner && <p className={styles.Card__winner}>Winner!</p>}
    {imageSet.map((imageId, idx) => (
      <CardItem
        key={imageId}
        imageId={imageId}
        guessed={guesses?.has(imageId)}
        highlight={imageId === highlight}
        numObjects={imageSet.length > 3 ? imageSet.length - 1 : imageSet.length}
        idx={idx}
        onClick={onClick ? () => onClick(imageId) : undefined}
        disabled={highlight !== undefined}
      />
    ))}
  </div>
);

export default Card;
