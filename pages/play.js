import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getListOfProblems } from "../logic";
import { GameContext } from "../providers/GameProvider";
import Animate from "../components/Animate";
import Game from "../components/Game";

const Play = ({ problems }) => {
  const router = useRouter();
  const {
    state: { gameOver, level },
  } = useContext(GameContext);
  const [data, setData] = useState(problems);

  useEffect(() => {
    if (gameOver) {
      router.push("/gameover");
      return;
    }
    router.prefetch("/gameover");
  }, [gameOver]);

  useEffect(() => {
    if (level > 0.6 * data.length)
      fetch(`api/v1/problems?level=${data.length}&limit=${10}`)
        .then((res) => res.json())
        .then((result) => {
          if (!result.error) setData([...data, ...result.data]);
        });
  }, [level]);

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

export async function getServerSideProps() {
  const problems = getListOfProblems();
  return {
    props: { problems },
  };
}

export default Play;
