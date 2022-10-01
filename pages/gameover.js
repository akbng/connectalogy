import Head from "next/head";
import { useContext, useState } from "react";

import Animate from "../components/Animate";
import { GameContext } from "../providers/GameProvider";

const GameOver = () => {
  const { state } = useContext(GameContext);

  return (
    <Animate>
      <Head>
        <title>Game Over | The Family Game</title>
      </Head>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            width: "fit-content",
            padding: "10px 24px",
            fontSize: "1.8rem",
            fontFamily: "RedPixel",
            color: "#4a4a4a",
          }}
        >
          Game Over!
        </h2>
        <h1
          style={{
            fontSize: "4.8rem",
            margin: "24px 0",
            color: "#333",
          }}
        >
          {state.score}
        </h1>
        <div
          style={{
            width: "300px",
            height: "60vh",
            padding: "6px",
            overflowX: "hidden",
            overflowY: "auto",
            border: "1px solid #b3b3b3",
            borderRadius: "6px",
          }}
        >
          {Array(15)
            .fill("Lorem ipsum.")
            .map((item, i) => (
              <div
                style={{ width: "100%", padding: "0 12px", margin: "10px 0" }}
                key={i}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </Animate>
  );
};

export default GameOver;
