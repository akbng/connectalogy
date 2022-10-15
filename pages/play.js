import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getListOfProblems } from "../logic";
import { GameContext } from "../providers/GameProvider";
import Animate from "../components/Animate";
import Game from "../components/Game";

const Play = () => {
  const router = useRouter();
  const {
    state: { gameOver, level, mode },
  } = useContext(GameContext);
  const [data, setData] = useState(getListOfProblems(level, 15, mode));

  useEffect(() => {
    if (gameOver) return router.push("/gameover");

    if (level > 0.6 * data.length)
      setData((pd) => [...pd, ...getListOfProblems(level, 10, mode)]);

    router.prefetch("/gameover");
  }, [gameOver, level]);

  return (
    <Animate>
      <Head>
        <title>Playing | The Family Game</title>
      </Head>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Game data={data[level]} />
      </div>
    </Animate>
  );
};

export default Play;
