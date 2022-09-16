import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import styles from "../styles/Selector.module.css";

const Selector = ({ className, label, color, onClick }) => {
  const clickSound = useRef(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/scifi_click.mp3")
      : undefined
  );
  const selectorRef = useRef("");

  useEffect(() => {
    selectorRef.current.style.setProperty("--selector-color", color);
    clickSound.current.volume = 0.4;
  }, []);

  const playOnHover = () => clickSound.current.play();

  return (
    <button
      className={`${styles.selector} ${className}`}
      onMouseEnter={playOnHover}
      onClick={onClick}
      ref={selectorRef}
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
