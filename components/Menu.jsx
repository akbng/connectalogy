import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import styles from "../styles/Menu.module.css";
import Locales from "../data/Locales";
import Modes from "./Modes";
import Music from "./Music.svg.jsx";
import Selector from "./Selector";
import Speaker from "./Speaker.svg.jsx";
import { GameContext } from "../providers/GameProvider";

const reg = new RegExp(Locales.map((l) => l.label).join("|"));

const Menu = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const { state, updateState } = useContext(GameContext);

  const selectLocale = (locale) => () => {
    updateState({ locale });
    setActiveTab("");
  };

  const getActiveLocale = () => {
    return Locales.find((loc) => loc.id === state.locale);
  };

  useEffect(() => {
    router.prefetch("/play");
    router.prefetch("/learn");
    router.prefetch("/score");
  }, []);

  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <AnimatePresence mode="wait" initial={false}>
          {activeTab.match(reg) ? (
            <motion.div
              id="language-selector"
              key={activeTab}
              className={styles.tab}
              initial={{ x: 25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 25, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {Locales.map((locale) => (
                <Selector
                  key={locale.id}
                  label={locale.label}
                  color={state.locale === locale.id ? "#fde68a" : "#fff"}
                  onClick={selectLocale(locale.id)}
                />
              ))}
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
              {[
                "play",
                "learn",
                "score board",
                `${getActiveLocale().label}`,
              ].map((item, i) => (
                <Selector
                  key={i}
                  label={item}
                  color="#fff"
                  onClick={() =>
                    item.match(reg)
                      ? setActiveTab(item)
                      : router.push(`/${item.split(" ")[0]}`)
                  }
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
