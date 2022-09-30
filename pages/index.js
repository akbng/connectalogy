import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import Animate from "../components/Animate";
import Menu from "../components/Menu";
import { GameContext } from "../providers/GameProvider";

export default function Home() {
  const router = useRouter();
  const { updateState } = useContext(GameContext);

  const resetState = () =>
    updateState({
      score: 0,
      level: 0,
      playing: false,
      paused: false,
      gameOver: false,
    });

  useEffect(() => {
    resetState();
    router.prefetch("/play");
    router.prefetch("/learn");
    router.prefetch("/score");
  }, []);

  return (
    <Animate>
      <div>
        <Head>
          <title>The Family Game</title>
          <meta
            name="description"
            content="A game to learn by playing Family relationships"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            position: "relative",
          }}
        >
          <Menu />
          <div
            style={{
              position: "absolute",
              inset: "0",
              zIndex: "-1",
            }}
          >
            <video
              src="/videos/bg_cover.mp4"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              autoPlay
              loop
              muted
            ></video>
          </div>
        </main>
      </div>
    </Animate>
  );
}
