import styles from "./Timer.module.css";

type TimerProps = {
  time: number;
};

const Timer = ({ time }: TimerProps) => {
  return (
    <div className={styles.Timer}>
      {(time / 1000).toFixed(1).padStart(4, '0')}
    </div>
  );
};

export default Timer;
