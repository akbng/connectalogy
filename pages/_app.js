import GameProvider from "../providers/GameProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}

export default MyApp;
