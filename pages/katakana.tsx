// import "../styles/kana.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [katakana, setKatakana] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/katakana/")
      .then((response) => response.json())
      .then((res) => setKatakana(res))
      .catch((err) => console.log(err));
  }, []);

  interface Katakana {
    id: number;
    ex: {
      id: number;
      word: string;
      meaning: string;
    }[];
    sound: string;
    vowel: string;
    katakana: string;
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
          <title>Maru-kun - Katakana</title>
          <meta name="description" content="Katakana Page" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Head>
        {
          <div className="content">
            <h1 className="headline">Katakana</h1>
            <div className="row">
              {katakana.map((katakana: Katakana) => {
                return (
                  <>
                    <div className="card">
                      <div className="upper-box">
                        <div className="left-box">
                          {katakana.katakana} <span>{katakana.vowel}</span>
                        </div>
                        <div className="right-box">
                          <i
                            onClick={() => {
                              let audio = new Audio(katakana.sound);
                              audio.play();
                            }}
                            className="fa fa-volume-up volume"
                            style={{ fontSize: 24 }}
                          />
                        </div>
                      </div>
                      <div className="example">
                        {katakana.ex.map((example: Ex) => {
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