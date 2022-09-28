import { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";
import PropTypes from "prop-types";

import Ring from "./Ring.svg.jsx";
import styles from "../styles/Timer.module.css";

const Timer = ({ time, size, color, className, onComplete }) => {
  const [remainingTime, setRemainingTime] = useState(time);
  const [startTime] = useState(new Date());
  const [complete, setComplete] = useState(false);
  const [ringOffset, setRingOffset] = useState(0);
  const radius = ~~(size / 2) - Math.min(8, size * 0.1);
  const circumference = 2 * Math.PI * radius;

  const tickFn = () => {
    const { seconds, minutes, hours } = intervalToDuration({
      start: startTime,
      end: new Date(),
    });

    const diff = remainingTime - (seconds + minutes * 60 + hours * 60 * 60);
    setRemainingTime((prevTime) => {
      if (prevTime <= 0) {
        setComplete(true);
        return 0;
      }
      setRingOffset(circumference - (diff / remainingTime) * circumference);
      return diff;
    });
  };

  useEffect(() => {
    let timer;
    timer = setInterval(tickFn, 500);
    if (complete) {
      clearInterval(timer);
      onComplete();
    }

    return () => clearInterval(timer);
  }, [complete]);

  return (
    <div className={className} style={{ position: "relative" }}>
      <Ring
        className={styles.ring}
        size={size}
        color={color}
        ringOffset={ringOffset}
      />
      <p
        className={[
          styles.time,
          remainingTime < 4 && remainingTime > 0 ? styles.animate_pingu : "",
        ].join(" ")}
        style={{
          fontSize: `${Math.max(1, ~~(size / 40))}rem`,
          color: color,
        }}
      >
        {remainingTime}
      </p>
    </div>
  );
};

Timer.propTypes = {
  /**
   * The time for which the timer counts for.
   */
  time: PropTypes.number,
  /**
   * The size of the timer where width & height is the same.
   */
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  onComplete: PropTypes.func,
};

Timer.defaultProps = {
  time: 30,
  size: 300,
  color: "#333",
};

export default Timer;
