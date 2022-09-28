import { AnimatePresence, motion } from "framer-motion";
import GameProvider from "../providers/GameProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <AnimatePresence mode="wait" initial={false}>
        <>
          <Component {...pageProps} />
          <audio id="music" src="/sounds/music.mp3" loop></audio>
        </>
      </AnimatePresence>
    </GameProvider>
  );
}

export default MyApp;
