import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const STARTING_TIME = 5;

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

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
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
      <h4>Time Remaining: {timeRemaining}</h4>
      <button
        onClick={startGame}
        disabled={isTimeRunning}
      >
        Start!
      </button>
    <h1>Word Count: {wordCount}</h1>
    </div>
  );
}

export default App;
