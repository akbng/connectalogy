import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

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
