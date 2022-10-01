import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

import createFlowElements from "../utils/createFlowElements";
import { GameContext } from "../providers/GameProvider";
import ProblemDiagram from "./ProblemDiagram";
import styles from "../styles/Game.module.css";
import getLocale from "../utils/getLocale";
import MenuIcon from "./MenuIcon.svg.jsx";
import NextButton from "./NextButton";
import Options from "./Options";
import Timer from "./Timer";
import Modal from "./Modal";
import Menu from "./Menu";

const getTimerForMode = (mode) => {
  const modes = {
    easy: 25,
    normal: 20,
    hard: 15,
  };
  return modes[mode];
};

const timerVariants = {
  hidden: { opacity: 0, y: -50 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const Game = ({ data }) => {
  const { state, updateState } = useContext(GameContext);
  const lang = getLocale(state.locale);
  const [correctAns, setCorrectAns] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onTimerComplete = () =>
    updateState({
      level: state.level + 1,
      score: state.score + 10,
    });

  useEffect(() => {
    if (correctAns) setCorrectAns("");
  }, [state.level]);

  return (
    <div className={styles.container}>
      <section className={styles.diagram}>
        <ProblemDiagram {...createFlowElements(data.problem, lang)} />
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
                time={getTimerForMode(state.mode)}
                size={150}
                color="#115e59"
                onComplete={() => updateState({ gameOver: true })}
                pause={isMenuOpen}
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
