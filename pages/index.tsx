import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Maru-kun</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome to Maru-kun</h1>

          <p className={styles.description}>
            Start your journey to learn Japanese with us!
          </p>

          <div className={styles.grid}>
            <a href="/hiragana" className={styles.card}>
              <h2>Hiragana ひらがな　&rarr;</h2>
              <p>
                Your way to enter the Japanese world! Hiragana is one of the
                most important basics.
              </p>
            </a>

            <a href="/katakana" className={styles.card}>
              <h2>Katakana カタカナ　&rarr;</h2>
              <p>Learn how to read the Japanese words in Katakana!</p>
            </a>

            <a href="/quiz" className={styles.card}>
              <h2>Quiz クイズ　&rarr;</h2>
              <p>Test Your Knowledge</p>
            </a>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Mardood
        </a>
      </footer>
    </div>
  );
}
