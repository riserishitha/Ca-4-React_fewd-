import questions from "./questions.js";
import { useState, useEffect, useMemo } from "react";
// importing usestate and setting the state to 0 or true/ false.
function QuestionBox() {
  const [score, setscore] = useState(0);
  const [que, setque] = useState(0);
  const [present, setpresent] = useState(0);
  const [results, setresults] = useState(false);
  const [dark, setDark] = useState(true);
  const [theme, setTheme] = useState("off");
  const [textcolor, setTextcolor] = useState("red");
//   to change the background color with the use of the button.
  const changecolor = (color) => {
    setTextcolor(color);
  };
// useeffect is used for side effects and cleanup.
  useEffect(() => {
    if (dark) {
      setTheme("Turn Off");
    } else {
      setTheme("Turn On");
    }
  }, [dark]);
  const onClicking = () => {
    setDark(!dark);
  };
// use memo is used for memoization to optimize the performance of functional components in React.
  const themeStyle = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
    };
  }, [dark]);
// adding the score and questions if the attemted answer is correct.
  const correctAnswer = (isCorrect) => {
    if (isCorrect) {
      setscore(score + 20);
      setque((prev) => prev + 1);
    }
    // showing the results and changing the question number if the question is completed attemting.
    if (present <= 3) {
      setpresent(present + 1);
    } else {
      setresults(true);
    }
  };
// setting the all the setstate to 0 to play again from the start if the quiz is completed. 
  const closeResults = () => {
    setpresent(0);
    setscore(0);
    setresults(false);
    setque(0);
  };
// returing the html and applying the function we assigned above.
  return (
    <div className="page" style={themeStyle}>
      <h1 className="title">📚 Quiz App 📚</h1>
      <div>
        <button className="view_btn" onClick={onClicking}>
          {theme}
        </button>
      </div>
      {/* the data will stop showing if the results is true  */}
      {!results && (
        <div className="boby_main">
          <h1>QUESTION :</h1>
          <h4> {present + 1} of 5</h4>
          <h2 style={{ color: textcolor }}>{questions[present].text}</h2>
          {questions[present].options.map((option) => (
            <button
              className="options"
              key={option.id}
              onClick={() => correctAnswer(option.isCorrect)}
            >
              {option.text}
            </button>
          ))}
          <div className="highligthers">
            <button onClick={() => changecolor("red")}>Highlight</button>
            <button onClick={() => changecolor("blue")}>
              Remove Highlight
            </button>
          </div>
        </div>
      )}
      {/* the data will appear if the results is true */}
      {results && (
        <div className="result_page">
          <div className="result_main">
            <br />
            <h1>Final Results</h1>
            <br />
            <h3>
              {que} out of 5 - Your Score({score}%)
            </h3>
            <br />
            <br />
            <button className="reset" onClick={closeResults}>
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default QuestionBox;
