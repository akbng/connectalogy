import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import Timer from "./Timer";
import styles from "../styles/NextButton.module.css";

const variants = {
  hidden: { opacity: 0, x: -50 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const NextButton = ({ onComplete, waitTill, className, style }) => {
  const proceedOnEnter = (e) => {
    if (e.key === "Enter") onComplete();
  };

  useEffect(() => {
    document.addEventListener("keydown", proceedOnEnter);
    return () => document.removeEventListener("keydown", proceedOnEnter);
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      className={[styles.wrapper, className].join(" ")}
      style={style}
    >
      <button onClick={onComplete} className={styles.btn}>
        <span style={{ marginRight: "8px" }}>Next in</span>
        <Timer
          time={waitTill}
          size={30}
          color="var(--text-light)"
          onComplete={onComplete}
        />
      </button>
    </motion.div>
  );
};

NextButton.propTypes = {
  onComplete: PropTypes.func.isRequired,
  waitTill: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default NextButton;
