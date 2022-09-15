import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import styles from "../styles/Menu.module.css";
import Modes from "./Modes";
import Music from "./Music.svg.jsx";
import Selector from "./Selector";
import Speaker from "./Speaker.svg.jsx";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          {activeTab === "Language" ? (
            <motion.div
              id="language-selector"
              key={activeTab}
              className={styles.tab}
              initial={{ x: 25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 25, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {["English", "español", "français", "Hindi", "Bengali"].map(
                (item, i) => (
                  <Selector
                    key={i}
                    label={item}
                    color="#fff"
                    onClick={() => setActiveTab("")}
                  />
                )
              )}
            </motion.div>
          ) : (
            <motion.div
              id="default-menu"
              key="main"
              className={styles.tab}
              initial={{ x: -25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -25, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {["Play", "Learn", "Score Board", "Language"].map((item, i) => (
                <Selector
                  key={i}
                  label={item}
                  color="#fff"
                  onClick={() => setActiveTab(item)}
                />
              ))}
              <Modes />
              <div className={styles.controllers}>
                <Speaker size={35} color="#fff" />
                <Music size={35} color="#fff" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;
