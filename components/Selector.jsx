import { useContext, useRef } from "react";
import PropTypes from "prop-types";

import styles from "../styles/Selector.module.css";
import { GameContext } from "../providers/GameProvider";

const Selector = ({ className, label, color, onClick }) => {
  const {
    state: { isSoundOn },
  } = useContext(GameContext);
  const clickSound = useRef(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/scifi_click.mp3")
      : undefined
  );

  const playOnHover = () => isSoundOn && clickSound.current.play();

  return (
    <button
      className={`${styles.selector} ${className}`}
      style={{ "--selector-color": color }}
      onMouseEnter={playOnHover}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Selector.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Selector.defaultProps = {
  label: "Lorem ipsum.",
  color: "#333",
};

export default Selector;
