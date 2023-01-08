import { useState, useEffect } from "react";
import Head from "next/head";
import Collapsible from "react-collapsible";

function App() {
  const [kanatype, setKanaTypes] = useState([]);
  const url: String = "https://api.mardood.tk";
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    fetch(url + "/api/kanatypes/")
      .then((response) => response.json())
      .then((res) => setKanaTypes(res))
      .catch((err) => console.log(err));
  }, []);

  interface KanaTypes {
    id: number;
    kana_type: string;
    hiragana: {
      id: number;
      ex: {
        id: number;
        word: string;
        meaning: string;
        romaji: string;
      }[];
      sound: string;
      vowel: string;
      hiragana: string;
      kana_type: string;
    }[];
  }
  [];

  return (
    <>
      <div className="App">
        <Head>
          <title>Maru-kun - Hiragana</title>{" "}
          <meta name="description" content="Hiragana Page" />{" "}
          <link rel="icon" href="/favicon.ico" />{" "}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Head>
        {
          <div className="content">
            <h1 className="headline">Hiragana</h1>
            {kanatype.map((kanatype: KanaTypes) => {
              return (
                <>
                  <Collapsible
                    className="subtitle"
                    trigger={kanatype.kana_type}
                    open={kanatype.kana_type == "Gojuuon" ? true : false}
                  >
                    <div className="row">
                      {kanatype.hiragana.map((hiragana: any) => {
                        return (
                          <>
                            <div className="card">
                              <div className="upper-box">
                                <div className="left-box">
                                  {hiragana.hiragana}{" "}
                                  <span>{hiragana.vowel}</span>
                                </div>
                                <button
                                  className="btn"
                                  onClick={() => {
                                    let audio = new Audio(url + hiragana.sound);
                                    audio.play();
                                  }}
                                >
                                  <i
                                    className="fa fa-volume-up volume"
                                    style={{ fontSize: 24 }}
                                  />
                                </button>
                              </div>
                              <div className="d-flex">
                                {hiragana.ex.map((example: any) => {
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
                                onMouseEnter={(e) =>
                                  (e.currentTarget.src = `${url}/media/hiragana/gif/150x150/${hiragana.hiragana}.gif`)
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.src = `${url}/media/hiragana/static/150x150/${hiragana.hiragana}.png`)
                                }
                                className={
                                  kanatype.kana_type == "Youon"
                                    ? "hidden"
                                    : "gif"
                                }
                                src={`${url}/media/hiragana/static/150x150/${hiragana.hiragana}.png`}
                                alt={hiragana.vowel}
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
