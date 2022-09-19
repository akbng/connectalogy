import Head from "next/head";
import Animate from "../components/Animate";
import Menu from "../components/Menu";

export default function Home() {
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

        <main>
          <Menu />
        </main>
      </div>
    </Animate>
  );
}
