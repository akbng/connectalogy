import { useContext, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Option from "./Option";
import styles from "../styles/Options.module.css";
import { GameContext } from "../providers/GameProvider";

const Options = ({
  className,
  options,
  rightOption,
  correctAns,
  setCorrectAns,
  lang,
  optionNumbers,
}) => {
  const {
    state: { isSoundOn, mode, level },
    updateState,
  } = useContext(GameContext);
  const [wrongOptions, setWrongOptions] = useState([]);
  const [blockUserAction, setBlockUserAction] = useState(false);

  const errorSound = useRef(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/error_click.mp3")
      : undefined
  );
  const successSound = useRef(
    typeof Audio !== "undefined"
      ? new Audio("/sounds/success_click.mp3")
      : undefined
  );

  const onUserSelect = (opt) => () => {
    if (blockUserAction) return;
    if (opt === rightOption) {
      if (isSoundOn) successSound.current.play();
      setBlockUserAction(true);
      setCorrectAns(opt);
      return;
    }
    if (isSoundOn) errorSound.current.play();
    if (mode !== "hard" && !wrongOptions.length)
      setWrongOptions([...wrongOptions, opt]);
    else updateState({ gameOver: true });
  };

  const handleKeystrokes = (e) => {
    const key = e.key;
    optionNumbers.forEach((optNum, i) => {
      if (key.toLowerCase() === optNum.toLowerCase())
        onUserSelect(options[i])();
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeystrokes);
    return () => document.removeEventListener("keydown", handleKeystrokes);
  }, [options, blockUserAction, wrongOptions]);

  useEffect(() => {
    setWrongOptions([]);
    setBlockUserAction(false);
  }, [level]);

  return (
    <div className={[styles.options, className].join(" ")}>
      {options.map((opt, i) => (
        <Option
          key={i}
          optionNum={optionNumbers[i]}
          label={lang[opt]}
          className={[
            styles.option,
            wrongOptions.includes(opt) ? styles.wrong_option : "",
            correctAns === opt ? styles.correct_option : "",
          ].join(" ")}
          color={
            wrongOptions.includes(opt) || correctAns === opt
              ? "#fff"
              : "#115e59"
          }
          onClick={onUserSelect(opt)}
        />
      ))}
    </div>
  );
};

Options.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  rightOption: PropTypes.string.isRequired,
  correctAns: PropTypes.string.isRequired,
  setCorrectAns: PropTypes.func.isRequired,
  lang: PropTypes.object.isRequired,
  optionNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Options;
