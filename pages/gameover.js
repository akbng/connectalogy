import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

import Animate from "../components/Animate";
import { GameContext } from "../providers/GameProvider";
import { createNewUser, getUserDetails, updateScore } from "../helpers";
import styles from "../styles/GameOver.module.css";
import Confetti from "../components/Confetti";

const GameOver = ({ providers }) => {
  const { state, updateState } = useContext(GameContext);
  const { data: session } = useSession();
  const [prevHighScore, setPrevHighScore] = useState();

  const updateUser = async () => {
    try {
      if (!state.user) {
        const { data: user } = await createNewUser(session.user);
        updateState({ user: user._id });
        if (!prevHighScore) {
          const {
            data: { high_score },
          } = await getUserDetails(user._id);
          setPrevHighScore(high_score);
        }
      } else if (state.score > prevHighScore)
        await updateScore(state.user, state.score);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (session) updateUser();
  }, [session, prevHighScore]);

  return (
    <Animate>
      <Head>
        <title>Game Over | The Family Game</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {state.score > prevHighScore ? "New High Score!" : "Game Over!"}
        </h2>
        <h1 className={styles.score}>{state.score}</h1>

        {session ? (
          <>
            <h3 className={styles.previous_highscore}>
              <span style={{ fontWeight: "lighter" }}>
                Previous High Score:
              </span>{" "}
              {prevHighScore}
            </h3>
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
          </>
        ) : (
          <button
            className={styles.btn}
            onClick={() => signIn(providers.facebook.id)}
          >
            Signin to save your progress
          </button>
        )}
        {state.score > prevHighScore && <Confetti />}
      </div>
    </Animate>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}

export default GameOver;
