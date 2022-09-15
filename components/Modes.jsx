import { useState } from "react";

import styles from "../styles/Modes.module.css";

const hardClick = new Audio("/sounds/hard_click.mp3");

const Modes = () => {
  const [mode, setMode] = useState("easy");

  return (
    <div className={styles.modes}>
      {["easy", "normal", "hard"].map((item, i) => (
        <button
          key={i}
          className={mode === item && styles.selected}
          onClick={() => {
            hardClick.play();
            setMode(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Modes;
