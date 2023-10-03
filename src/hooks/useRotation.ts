import { useEffect } from "react";

const useRotation = () => {
  useEffect(() => {
    document.body.requestFullscreen({
      navigationUI: 'hide',
    });

    navigator.wakeLock?.request('screen');

    return () => {
      document.exitFullscreen();
    };
  }, []);
}

export default useRotation;
