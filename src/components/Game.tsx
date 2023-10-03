import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from "./Card";
import Timer from "./Timer";
import RestartButton from "./RestartButton";
import useAudio from "../hooks/useAudio";
import useTimer from "../hooks/useTimer";
import useRotation from "../hooks/useRotation";
import useGameState, { type Player, Players } from "../hooks/useGameState";
import styles from './Game.module.css';

const EMPTY_ARRAY: number[] = [];

const Game = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const size = parseInt(searchParams.get('n') ?? '8');
  const { playSound } = useAudio();
  const [{ roundWinner, gameWinner, player1, player2 }, dispatch] = useGameState();
  const { time, stopTimer, restartTimer } = useTimer(true);

  useRotation();

  const answer = useMemo(() => {
    const s = new Set(player1.imageSet);
    return player2.imageSet.find((val) => s.has(val));
  }, [player1.imageSet, player2.imageSet]);

  const handleGuess = (player: Player, guess: number) => {
    const result = guess === answer;

    if (result) {
      const bonus = time < 3000 && ((player === Players.one && player1.guesses.size === 0) || (player === Players.two && player2.guesses.size === 0))

      dispatch({
        type: 'guess-right',
        player,
        points: bonus ? 3 : 1,
      });

      playSound('win');
      stopTimer();
    } else {
      dispatch({
        type: 'guess-wrong',
        player,
        guess,
      });

      playSound('lose');
    }
  };

  const newRound = useCallback(() => {
    dispatch({ type: 'new-round', size });
    restartTimer(true);
  }, [restartTimer, dispatch, size]);

  const handleRestart = () => {
    if (gameWinner === null) {
      newRound();
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    newRound();
  }, [newRound]);

  return (
    <main className={styles.Game}>
      {roundWinner !== null && (
        <RestartButton onActivate={handleRestart}>
          {gameWinner === null ? 'Next Round' : 'Play Again'}
        </RestartButton>
      )}

      <Timer time={time} />

      <div className={styles['Game__card-wrapper']}>
        <Card
          winner={gameWinner === Players.one}
          imageSet={gameWinner ? EMPTY_ARRAY : player1.imageSet}
          guesses={player1.guesses}
          score={player1.score}
          onClick={(guess) => handleGuess(Players.one, guess)}
          highlight={roundWinner !== null ? answer : undefined}
          position="top"
          variant={roundWinner === null ? undefined : (roundWinner === Players.one ? 'win' : 'lose')}
        />
      </div>
      <div className={styles['Game__card-wrapper']}>
        <Card
          winner={gameWinner === Players.two}
          imageSet={gameWinner ? EMPTY_ARRAY : player2.imageSet}
          guesses={player2.guesses}
          score={player2.score}
          onClick={(guess) => handleGuess(Players.two, guess)}
          highlight={roundWinner !== null ? answer : undefined}
          position="bottom"
          variant={roundWinner === null ? undefined : (roundWinner === Players.two ? 'win' : 'lose')}
        />
      </div>
    </main>
  );
};

export default Game;
