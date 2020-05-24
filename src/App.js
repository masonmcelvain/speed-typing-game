import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const DEFAULT_START_TIME = 10;

  const [inputTime, setInputTime] = useState(DEFAULT_START_TIME);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const textBoxRef = useRef(null);

  function handleChange(e) {
    setText(e.target.value);
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter(word => word !== "").length;
  }

  function updateTime(e) {
    setInputTime(e.target.value);
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(inputTime);
    setText("");
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
    setWordCount(calculateWordCount(text));
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
        setTimeout(() => {
            setTimeRemaining(time => time - 1)
        }, 1000);
    } else if (timeRemaining === 0) {
        endGame();
    }
  }, [timeRemaining, isTimeRunning])

  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea
        ref={textBoxRef}
        value={text}
        onChange={handleChange}
        disabled={!isTimeRunning}
      >

      </textarea>
      <h4>Time Remaining: {timeRemaining} sec</h4>
      <button
        onClick={startGame}
        disabled={isTimeRunning}
      >
        Start!
      </button>
    <h1>Word Count: {wordCount}</h1>

    <hr />

    <div className="timeSetter">
      <h4>Set Time: </h4>
      <input
        type="text"
        value={inputTime}
        placeholder={inputTime}
        onChange={updateTime}
        disabled={isTimeRunning}
      ></input>
    </div>
    <button
      onClick={endGame}
      disabled={!isTimeRunning}
    >
      Quit
    </button>
    </div>
  );
}

export default App;
