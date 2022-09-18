import { AnimatePresence, motion } from "framer-motion";
import GameProvider from "../providers/GameProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </GameProvider>
  );
}

export default MyApp;
