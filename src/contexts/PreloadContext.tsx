import { type PropsWithChildren, createContext, useRef, useState } from "react";
import { differenceSets, generateNumCards, createRange } from "../utils/generateImageSets";
import getImage from "../utils/getImage";

const maxNum = Math.max(...Object.keys(differenceSets).map((x) => parseInt(x, 10)));
const range = createRange(generateNumCards(maxNum));

type PreloadContextSchema = {
  loaded: boolean;
};

const initialState: PreloadContextSchema = {
  loaded: false,
};

export const PreloadContext = createContext(initialState);

export const PreloadProvider = ({ children }: PropsWithChildren<Record<never, unknown>>) => {
  const loadedCountRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = () => {
    loadedCountRef.current += 1;

    if (loadedCountRef.current === range.length) {
      setLoaded(true);
    }
  };

  return (
    <PreloadContext.Provider value={{ loaded }}>
      {range.map((imageId) => (
        <link
          key={imageId}
          rel="preload"
          href={getImage(imageId)}
          as="image"
          onLoad={handleLoaded}
        />
      ))}
      {children}
    </PreloadContext.Provider>
  );
};
