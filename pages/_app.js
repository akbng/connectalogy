import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";

import GameProvider from "../providers/GameProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <GameProvider>
        <AnimatePresence mode="wait" initial={false}>
          <>
            <Component {...pageProps} />
            <audio id="music" src="/sounds/music.mp3" loop></audio>
          </>
        </AnimatePresence>
      </GameProvider>
    </SessionProvider>
  );
}

export default MyApp;
