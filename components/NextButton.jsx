import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import Timer from "./Timer";

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
      className={className}
      style={{ width: "80%", minWidth: "180px", ...style }}
    >
      <button
        onClick={onComplete}
        style={{
          width: "fit-content",
          padding: "8px 14px",
          backgroundColor: "#115e59",
          color: "#fff",
          borderRadius: "0.2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ marginRight: "8px" }}>Next in</span>
        <Timer time={waitTill} size={30} color="#fff" onComplete={onComplete} />
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
