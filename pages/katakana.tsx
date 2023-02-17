import { useState, useEffect } from "react";
import Head from "next/head";
import Collapsible from "react-collapsible";

function App() {
  const [kanatype, setKanaTypes] = useState([]);
  const url: String = "http://127.0.0.1:8000";

  useEffect(() => {
    fetch(url + "/api/kanatypes/")
      .then((response) => response.json())
      .then((res) => setKanaTypes(res))
      .catch((err) => console.log(err));
  }, []);

  const changeurl = (e: HTMLImageElement, letter: String) => {
    e.src == `${url}/media/katakana/gif/150x150/${letter}.gif`;
  };
  interface KanaTypes {
    id: number;
    kana_type: string;
    katakana: {
      id: number;
      ex: {
        id: number;
        word: string;
        meaning: string;
      }[];
      sound: string;
      vowel: string;
      kataakana: string;
      kana_type: string;
    }[];
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
            {kanatype.map((kanatype: KanaTypes) => {
              return (
                <>
                  <Collapsible
                    className="subtitle"
                    trigger={kanatype.kana_type}
                    open={kanatype.kana_type == "Gojuuon" ? true : false}
                  >
                    <div className="row">
                      {kanatype.katakana.map((katakana: any) => {
                        return (
                          <>
                            <div className="card" key={katakana.id}>
                              <div className="upper-box">
                                <div className="left-box">
                                  {katakana.katakana}{" "}
                                  <span>{katakana.vowel}</span>
                                </div>
                                <button
                                  className="btn"
                                  onClick={() => {
                                    let audio = new Audio(katakana.sound);
                                    audio.play();
                                  }}
                                >
                                  <i
                                    className="fa fa-volume-up volume "
                                    style={{ fontSize: 24 }}
                                  />
                                </button>
                              </div>
                              <div className="d-flex">
                                {katakana.ex.map((example: any) => {
                                  return (
                                    <>
                                      <p className="example-word">
                                        <p
                                          className="word"
                                          title={example.romaji}
                                        >
                                          {example.word}
                                        </p>{" "}
                                        {example.meaning_capitalized}
                                      </p>
                                    </>
                                  );
                                })}
                              </div>{" "}
                              <img
                                onMouseOver={(e) =>
                                  (e.currentTarget.src = `${url}/media/katakana/gif/150x150/${katakana.katakana}.gif`)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.src = `${url}/media/katakana/static/150x150/${katakana.katakana}.png`)
                                }
                                className={
                                  kanatype.kana_type == "Youon"
                                    ? "hidden"
                                    : "gif"
                                }
                                src={`${url}/media/katakana/static/150x150/${katakana.katakana}.png`}
                                alt={katakana.vowel}
                                width={90}
                              />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </Collapsible>
                </>
              );
            })}
          </div>
        }
      </div>
    </>
  );
}

export default App;
