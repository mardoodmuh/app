// import "../styles/hiragana.css";
import { useState, useEffect } from "react";
import Head from "next/head";

function App() {
  const [hiragana, setHiragana] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hiragana/")
      .then((response) => response.json())
      .then((res) => setHiragana(res))
      .catch((err) => console.log(err));
  }, []);

  interface Hiragana {
    id: number;
    ex: {
      id: number;
      word: string;
      meaning: string;
    }[];
    sound: string;
    vowel: string;
    hiragana: string;
  }
  [];

  interface Ex {
    id: number;
    word: string;
    meaning: string;
  }
  [];

  return (
    <>
      <div className="App">
        <Head>
          <title>Maru-kun - Hiragana</title>
          <meta name="description" content="Hiragana Page" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Head>
        {
          <div className="content">
            <h1 className="headline">Hiragana</h1>
            <div className="row">
              {hiragana.map((hiragana: Hiragana) => {
                return (
                  <>
                    <div className="card">
                      <div className="upper-box">
                        <div className="left-box">
                          {hiragana.hiragana} <span>{hiragana.vowel}</span>
                        </div>
                        <button
                          className="btn"
                          onClick={() => {
                            let audio = new Audio(hiragana.sound);
                            audio.play();
                          }}
                        >
                          <i
                            className="fa fa-volume-up volume "
                            style={{ fontSize: 24 }}
                          />
                        </button>
                      </div>
                      <div className="example">
                        {hiragana.ex.map((example: Ex) => {
                          return (
                            <>
                              <p className="example-word">
                                {example.word} {example.meaning}
                              </p>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default App;
