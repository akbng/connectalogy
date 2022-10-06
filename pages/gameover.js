import Head from "next/head";
import { useContext, useState } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

import Animate from "../components/Animate";
import { GameContext } from "../providers/GameProvider";
import styles from "../styles/GameOver.module.css";

const GameOver = ({ providers }) => {
  const { state } = useContext(GameContext);
  const { data: session } = useSession();

  return (
    <Animate>
      <Head>
        <title>Game Over | The Family Game</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles.title}>Game Over!</h2>
        <h1 className={styles.score}>{state.score}</h1>
        {session ? (
          <div className={styles.user_wrapper}>
            <div className={styles.user_name}>
              <img
                className={styles.avatar}
                src={session.user.image}
                alt="user_avatar"
              />
              <p>{session.user.name}</p>
            </div>
            <button className={styles.btn} onClick={signOut}>
              Signout
            </button>
          </div>
        ) : (
          <button onClick={() => signIn(providers.facebook.id)}>Signin</button>
        )}
        <div className={styles.leaderboard_wrapper}>
          {Array(15)
            .fill("Lorem ipsum.")
            .map((item, i) => (
              <div className={styles.leaderboard_item} key={i}>
                {item}
              </div>
            ))}
        </div>
      </div>
    </Animate>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}

export default GameOver;
