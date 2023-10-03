import { useCallback, useEffect, useState } from "react";

const useTimer = (initialState?: boolean) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(initialState ?? false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = setInterval(() => {
      setTime((t) => t + 100);
    }, 100);

    return () => {
      clearInterval(interval);
    }
  }, [running]);

  const startTimer = useCallback(() => {
    setRunning(true);
  }, []);

  const stopTimer = useCallback(() => {
    setRunning(false);
  }, []);

  const restartTimer = useCallback((newState?: boolean) => {
    setTime(0);

    if (newState !== undefined) {
      setRunning(newState);
    }
  }, []);

  return {
    time,
    startTimer,
    stopTimer,
    restartTimer,
  };
};

export default useTimer;
