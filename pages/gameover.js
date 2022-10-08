import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

import Animate from "../components/Animate";
import { GameContext } from "../providers/GameProvider";
import { createNewUser, getHighScorers, updateScore } from "../helpers";
import styles from "../styles/GameOver.module.css";

const GameOver = ({ providers }) => {
  const { state, updateState } = useContext(GameContext);
  const { data: session } = useSession();
  const [leaderboard, setLeaderboard] = useState([]);

  const updateUser = async () => {
    try {
      const { data: user } = await createNewUser(session.user);
      await updateScore(user._id, state.score);
      updateState({ user: user._id });
    } catch (err) {
      console.error(err);
    }
  };

  const updateLeaderboard = async () => {
    try {
      const { data: users } = await getHighScorers(25);
      setLeaderboard([...users]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (session) updateUser();
    updateLeaderboard();
  }, [session]);

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
        {leaderboard.length > 0 && (
          <div
            style={{
              width: "360px",
              height: "60%",
              padding: "6px",
              overflowX: "hidden",
              overflowY: "auto",
              border: "1px solid #b3b3b3",
              borderRadius: ".4rem",
            }}
          >
            {leaderboard.map((user) => (
              <div
                style={{
                  width: "100%",
                  padding: "0 1rem",
                  margin: "1rem 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={user._id}
              >
                <div>
                  <img
                    style={{
                      width: "30px",
                      borderRadius: "100%",
                      marginRight: "1rem",
                    }}
                    src={user.image}
                    alt={user.name + "'s DP"}
                  />
                  <span>{user.name}</span>
                </div>
                <div>{user.high_score}</div>
              </div>
            ))}
          </div>
        )}
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
