import { useContext, useRef, useState } from "react";
import { GameContext } from "../providers/GameProvider";

import styles from "../styles/Modes.module.css";

const Modes = () => {
  const {
    state: { mode, isSoundOn },
    updateState,
  } = useContext(GameContext);
  const hardClick = useRef(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/hard_click.mp3")
      : undefined
  );

  const setMode = (item) => () => {
    if (isSoundOn) hardClick.current.play();
    updateState({ mode: item });
  };

  return (
    <div className={styles.modes}>
      {["easy", "normal", "hard"].map((item, i) => (
        <button
          key={i}
          className={mode === item ? styles.selected : ""}
          onClick={setMode(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Modes;
