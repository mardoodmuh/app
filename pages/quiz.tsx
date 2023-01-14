import { useState, useEffect } from "react";
import Head from "next/head";

function App() {
  const url = "https://api.mardood.tk";
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([{ id: 0 }]);
  const [correct, setCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 0,
    word: "Loading...",
    meaning: "Loading...",
    romaji: "Loading...",
  });

  useEffect(() => {
    fetch(url + "/api/examples/")
      .then((response) => response.json())
      .then((res) => setQuestions(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  }, [questions]);

  const handleChange = (event: any) => {
    setAnswer(event.target.value);
    if (event.keyCode === 13 || event.keyCode === 32) {
      handleSubmit();
    }
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const handleSubmit = () => {
    const correctAnswer = currentQuestion.romaji.toLowerCase().trim();
    const availableQuestion = questions.filter(
      (question: any) => !usedQuestions.some(({ id }) => id === question.id)
    );
    const randomIndex = Math.floor(Math.random() * availableQuestion.length);
    if (answer.toLowerCase().trim() === correctAnswer) {
      setScore(score + 1);
      setCorrect(true);
      setCurrentQuestion(availableQuestion[randomIndex]);
      setUsedQuestions([...usedQuestions, currentQuestion]);
      setAnswer("");
    } else {
      setCorrect(false);
    }
  };

  return (
    <div className="App">
      <Head>
        <title>Quiz App</title>
        <meta
          name="description"
          content="A quiz app to test your knowledge in Hiragana and Katakana"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content">
        <h1 className="headline">Quiz App</h1>
        <div className="container">
          {currentQuestion ? (
            <>
              <p>{currentQuestion.word}</p>
              <input
                className="input"
                type="text"
                onChange={handleChange}
                onKeyDown={handleChange}
                value={answer}
              />
              <p>{score}</p>
              <p>Correct: {correct.toString()}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
