import { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import styles from "../styles/Music.module.css";
import { GameContext } from "../providers/GameProvider";

const Music = ({ size, style, className, color }) => {
  const {
    state: { isMusicOn, isSoundOn },
    updateState,
  } = useContext(GameContext);
  const clicker = useRef(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/hard_click.mp3")
      : undefined
  );

  const toggleMute = () => {
    if (isSoundOn) clicker.current.play();
    updateState({ isMusicOn: !isMusicOn });
  };

  useEffect(() => {
    const music = document.getElementById("music");
    music.volume = 0.3;
    isMusicOn ? music.play() : music.pause();
    const handlePause = () =>
      isMusicOn ? updateState({ isMusicOn: false }) : false;
    const handlePlay = () =>
      !isMusicOn ? updateState({ isMusicOn: true }) : false;
    music.addEventListener("pause", handlePause);
    music.addEventListener("play", handlePlay);
    return () => {
      music.removeEventListener("pause", handlePause);
      music.removeEventListener("play", handlePlay);
    };
  }, [isMusicOn]);

  return (
    <button
      className={[className, styles.music].join(" ")}
      onClick={toggleMute}
    >
      <motion.svg
        layout
        width={size}
        height={size}
        style={style}
        fill={color}
        viewBox="0 0 223 223"
      >
        <motion.path
          layout
          className={isMusicOn ? styles.music_note : ""}
          d="M206.253,53.877l-0.178-6.012L95.421,68.558v105.815c-5-1.839-9.735-2.836-15.102-2.836
		c-18.204,0-32.932,11.53-32.932,25.703s14.787,25.703,32.911,25.703c18.138,0,32.914-11.53,32.914-25.703
		c0-1.288-0.296-73.767-0.352-98.264l75.561-14.137v70.707c-5-1.836-9.689-2.831-15.02-2.831c-18.182,0-32.891,11.53-32.891,25.703
		s14.796,25.703,32.931,25.703c18.197,0,33.022-11.53,33.022-25.703C206.464,177.372,206.263,58.919,206.253,53.877z"
        />
        <motion.path
          layout
          className={isMusicOn ? styles.music_in : styles.music_out}
          d="M88.683,40.961c0,0,17.806-11.563,21.205-17.338c1.695-2.879,2.89-6.029,2.691-10.187C112.227,6.077,106.841,0,100.244,0
		c-6.491,0-11.583,5.401-11.583,5.401S83.86,0,77.078,0c-6.596,0-11.983,6.077-12.335,13.437c-0.199,4.157,1.001,7.321,2.691,10.187
		C70.811,29.348,88.683,40.961,88.683,40.961z"
        />
        <motion.path
          layout
          className={isMusicOn ? styles.music_in : styles.music_out}
          d="M61.647,108.086c1.695-2.879,2.89-6.029,2.691-10.186c-0.353-7.359-5.739-13.437-12.335-13.437
		c-6.491,0-11.583,5.401-11.583,5.401s-4.801-5.401-11.583-5.401c-6.596,0-11.983,6.077-12.335,13.437
		c-0.199,4.157,1.001,7.321,2.691,10.186c3.377,5.725,21.249,17.338,21.249,17.338S58.248,113.861,61.647,108.086z"
        />
      </motion.svg>
    </button>
  );
};

Music.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

Music.defaultProps = {
  size: 50,
  color: "#333",
};

export default Music;
