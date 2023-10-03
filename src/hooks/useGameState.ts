import { useReducer } from "react";
import generateImageSets from "../utils/generateImageSets";
import type { ValueOf } from "../types/utils";

export const Players = {
  one: 'player1',
  two: 'player2',
} as const;

export type Player = ValueOf<typeof Players>;

type PlayerState = {
  guesses: Set<number>;
  score: number;
  imageSet: number[];
};

type GameState = {
  roundWinner: Player | null;
  gameWinner: Player | null;
  maxScore: number;
  [Players.one]: PlayerState;
  [Players.two]: PlayerState;
};

const initialPlayerState: PlayerState = {
  guesses: new Set(),
  score: 0,
  imageSet: [],
};

const initialGameState: GameState = {
  roundWinner: null,
  gameWinner: null,
  maxScore: 20,
  player1: { ...initialPlayerState },
  player2: { ...initialPlayerState },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const playerReducer = (state: PlayerState, action: any): PlayerState => {
  switch (action.type) {
    case 'initialize':
      return {
        ...state,
        guesses: new Set(),
        imageSet: action.imageSet,
      };
    case 'guess-wrong':
      return {
        ...state,
        score: state.score - 1,
        guesses: new Set([...state.guesses, action.guess]),
      };
    case 'guess-right':
      return {
        ...state,
        score: state.score + action.points,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: GameState, action: any): GameState => {
  switch (action.type) {
    case 'new-round':
      // eslint-disable-next-line no-case-declarations
      const [imageSetA, imageSetB] = generateImageSets(action.size);

      return {
        ...state,
        roundWinner: null,
        player1: playerReducer(state.player1, {
          type: 'initialize',
          imageSet: imageSetA,
        }),
        player2: playerReducer(state.player2, {
          type: 'initialize',
          imageSet: imageSetB,
        }),
      };
    case 'guess-wrong':
      return {
        ...state,
        player1: action.player === Players.one
          ? playerReducer(state.player1, action)
          : state.player1,
        player2: action.player === Players.two
          ? playerReducer(state.player2, action)
          : state.player2,
      };
    case 'guess-right':
      // eslint-disable-next-line no-case-declarations
      const newState = {
        ...state,
        roundWinner: action.player,
        player1: action.player === Players.one
          ? playerReducer(state.player1, action)
          : state.player1,
        player2: action.player === Players.two
          ? playerReducer(state.player2, action)
          : state.player2,
      };

      if (action.player === Players.one && newState.player1.score >= newState.maxScore) {
        newState.gameWinner = Players.one;
      } else if (action.payer === Players.two && newState.player2.score >= newState.maxScore) {
        newState.gameWinner = Players.two;
      }

      return newState;
    default:
      return state;
  }
};

const useGameState = () => useReducer(reducer, initialGameState)

export default useGameState;
