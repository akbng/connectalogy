import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

import createFlowElements from "../utils/createFlowElements";
import { GameContext } from "../providers/GameProvider";
import { timerDetails } from "../logic/mechanics";
import useWindowSize from "../hooks/useWindowSize";
import ProblemDiagram from "./ProblemDiagram";
import styles from "../styles/Game.module.css";
import getLocale from "../utils/getLocale";
import MenuIcon from "./MenuIcon.svg.jsx";
import NextButton from "./NextButton";
import Options from "./Options";
import Timer from "./Timer";
import Modal from "./Modal";
import Menu from "./Menu";

const timerVariants = {
  hidden: { opacity: 0, y: -50 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const maxAttemptsForMode = {
  easy: 2,
  normal: 2,
  hard: 1,
};

const Game = ({ data }) => {
  const { state, updateState } = useContext(GameContext);
  const lang = getLocale(state.locale);
  const [correctAns, setCorrectAns] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(
    maxAttemptsForMode[state.mode]
  );
  const { width: screenWidth } = useWindowSize();

  const onTimerComplete = () =>
    updateState({
      level: state.level + 1,
    });

  const toggleMenuOnEsc = (e) => {
    if (e.key === " ") setIsMenuOpen((status) => !status);
    if (e.key === "Enter") e.preventDefault();
  };

  useEffect(() => {
    if (correctAns) setCorrectAns("");
    setAttemptsLeft(maxAttemptsForMode[state.mode]);
    document.addEventListener("keydown", toggleMenuOnEsc);
    return () => document.removeEventListener("keydown", toggleMenuOnEsc);
  }, [state.level, correctAns]);

  return (
    <div className={styles.container}>
      <section className={styles.diagram}>
        <div className={styles.score_wrapper}>
          <span>Score:</span>
          <span className={styles.score}>{state.score}</span>
        </div>
        <ProblemDiagram
          {...createFlowElements(data.problem, lang, screenWidth)}
        />
        <MenuIcon
          className={styles.menu_button}
          onClick={() => setIsMenuOpen(true)}
        />
      </section>
      <aside className={styles.sidepanel}>
        <AnimatePresence mode="popLayout">
          {!correctAns && (
            <motion.div
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={timerVariants}
              className={styles.timer_wrapper}
            >
              <Timer
                time={timerDetails(state.level, state.mode)}
                size={screenWidth > 750 ? 150 : 90}
                color="var(--text-dark)"
                onComplete={() => updateState({ gameOver: true })}
                pause={isMenuOpen}
                className={styles.timer}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Options
          correctAns={correctAns}
          setCorrectAns={setCorrectAns}
          lang={lang}
          optionNumbers={["a", "b", "c", "d"]}
          options={data.solutionSet}
          rightOption={data.solution}
          attemptsLeft={attemptsLeft}
          setAttemptsLeft={setAttemptsLeft}
        />
        {correctAns && <NextButton onComplete={onTimerComplete} waitTill={5} />}
      </aside>
      <Modal isOpen={isMenuOpen} setOpen={setIsMenuOpen}>
        <Menu onSelect={() => setIsMenuOpen(false)} />
      </Modal>
    </div>
  );
};

Game.propTypes = {
  data: PropTypes.shape({
    problem: PropTypes.arrayOf(PropTypes.string).isRequired,
    solution: PropTypes.string.isRequired,
    solutionSet: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Game;
