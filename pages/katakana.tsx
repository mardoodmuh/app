import { useState, useEffect } from "react";
import Head from "next/head";

function App() {
  const [kanatype, setKanaTypes] = useState([]);

  useEffect(() => {
    fetch("https://api.mardood.tk/api/kanatypes/")
      .then((response) => response.json())
      .then((res) => setKanaTypes(res))
      .catch((err) => console.log(err));
  }, []);

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
                  <h2 className="subtitle" key={kanatype.id}>
                    {kanatype.kana_type}
                  </h2>

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
                                    <p
                                      className="example-word"
                                      key={example.id}
                                    >
                                      {example.word} {example.meaning}
                                    </p>
                                  </>
                                );
                              })}
                            </div>
                            {/*{" "}
                            <img
                              className="gif"
                              src={`https://api.mardood.tk/media/katakana/katakana_${katakana.katakana}_stroke_order_animation.gif`}
                              alt={katakana.vowel}
                              width={90}
                            />
                            */}
                          </div>
                        </>
                      );
                    })}
                  </div>
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
