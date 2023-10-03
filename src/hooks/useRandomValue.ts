import { useRef } from "react";

const useRandomValue = () => {
  const value = useRef(Math.random());

  return value.current;
}

export default useRandomValue;
