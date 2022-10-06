import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import deepEqual from "deep-equal";

export const GameContext = createContext();

// might add more properties on the go
const initialState = {
  score: 0,
  level: 0,
  user: null,
  locale: "en",
  mode: "normal",
  isSoundOn: true,
  isMusicOn: false,
  playing: false,
  paused: false,
  gameOver: false,
};

const reducer = (state, value) => ({ ...state, ...value });

const GameProvider = ({ children }) => {
  const [state, updateState] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("state");
      if (savedState && deepEqual(state, initialState))
        return updateState(JSON.parse(savedState));
      window.localStorage.setItem(
        "state",
        JSON.stringify({
          score: state.score,
          locale: state.locale,
          mode: state.mode,
          isSoundOn: state.isSoundOn,
          isMusicOn: state.isMusicOn,
        })
      );
    }
  }, [state.score, state.locale, state.mode, state.isSoundOn, state.isMusicOn]);

  return (
    <GameContext.Provider value={{ state, updateState }}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.element,
};

export default GameProvider;
