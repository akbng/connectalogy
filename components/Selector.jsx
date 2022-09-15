import React from "react";
import PropTypes from "prop-types";

import styles from "../styles/Selector.module.css";

const clickSound = new Audio("/sounds/scifi_click.mp3");
clickSound.volume = 0.4;
// volume will be available as a context

const Selector = ({ className, label, color, onClick }) => {
  document.documentElement.style.setProperty("--selector-color", color);
  const playOnHover = () => clickSound.play();

  return (
    <button
      className={`${styles.selector} ${className}`}
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
