import { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";
import PropTypes from "prop-types";
import Ring from "./Ring.svg.jsx";

const Timer = ({ time, size, color }) => {
  const [remainingTime, setRemainingTime] = useState(time);
  const [startTime] = useState(new Date());
  const [complete, setComplete] = useState(false);
  const [ringOffset, setRingOffset] = useState(0);
  const radius = ~~(size / 2) - 8;
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
    if (complete) clearInterval(timer);

    return () => clearInterval(timer);
  }, [complete]);

  return (
    <div className="container" style={{ position: "relative" }}>
      <Ring
        style={{ transform: "rotate(90deg)" }}
        size={size}
        color={color}
        ringOffset={ringOffset}
      />
      <p
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          margin: 0,
          fontSize: `${~~(size / 30)}rem`,
          color: color,
          transition: "color 675ms ease-in-out",
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
};

Timer.defaultProps = {
  time: 30,
  size: 300,
  color: "#333",
};

export default Timer;
