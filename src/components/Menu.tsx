import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Help from "./Help";
import getImage from "../utils/getImage";
import StarInput from "./StarInput";
import clsx from "clsx";
import { generateRandomNumber } from '../utils/generateImageSets';
import styles from './Menu.module.css';

const gameSizeOptions = [3, 4, 5, 6, 8];

const Menu = () => {
  const [gameSize, setGameSize] = useState(5);
  const [helpOpen, setHelpOpen] = useState(false);
  const imageIdx = useRef(generateRandomNumber(57));

  const handleSizeChanged = (value: number) => {
    setGameSize(value);
  };

  const handleHelpClosed = () => {
    setHelpOpen(false);
  };

  return (
    <div className={styles.Menu}>
      <img className={styles['Menu__image']} src={getImage(imageIdx.current)} />
      <div className={styles['Menu__content']}>
        <h1 className={styles['Menu__title']}>Cat Match</h1>

        <div className={styles['Menu__difficulty']}>
          <p>Difficulty</p>
          <StarInput
            value={gameSize}
            options={gameSizeOptions}
            onChange={handleSizeChanged}
          />
          <p className={styles['Menu__difficulty-description']}>{gameSize} cats each</p>
        </div>

        <Link
          className={styles['Menu__start-button']}
          to={{
            pathname: '/play',
            search: `n=${gameSize}`,
          }}
        >
          Play
        </Link>
        <button
          className={clsx('material-symbols-outlined', styles['Menu__help-button'])}
          onClick={() => setHelpOpen((prev) => !prev)}
        >
          help
        </button>
      </div>
      <Help open={helpOpen} onClose={handleHelpClosed} />
    </div>
  );
};

export default Menu;
