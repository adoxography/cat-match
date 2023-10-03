import { type PropsWithChildren, createContext, useCallback, useRef } from "react";
import Win from "../assets/sounds/confirmation_003.ogg";
import Lose from "../assets/sounds/error_001.ogg";

const sounds = {
  win: Win,
  lose: Lose,
} satisfies Record<string, string>;

export type AudioContextSchema = {
  playSound: (name: keyof typeof sounds) => void;
};

const initialValue: AudioContextSchema = {
  playSound: () => {},
};

export const AudioContext = createContext(initialValue);

export const AudioProvider = ({ children }: PropsWithChildren<Record<never, unknown>>) => {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const playSound = useCallback((name: keyof typeof sounds) => {
    const el = audioRefs.current[name];

    if (el) {
      el.play();
    }
  }, []);

  const value: AudioContextSchema = {
    playSound
  };

  return (
    <AudioContext.Provider value={value}>
      {Object.entries(sounds).map(([name, path]) => (
        <audio
          ref={(el) => audioRefs.current[name] = el}
          key={name}
          src={path}
        />
      ))}
      {children}
    </AudioContext.Provider>
  );
};
