import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions.js";

export default function Question({ index, onSelectAnswer }) {
  // Move state from Quiz component here
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 15000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    /************************************************************************************
     * After user selects an answer, we  set a timmer to yield 1 second for highlighting
     * if the selected answer is correct (green) or wrong (light red).
     ************************************************************************************/
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      // Yield 2 seconds before logging the selected answer and moving to next question
      setTimeout(() => {
        onSelectAnswer(answer); // Adding asnwer to the answers array using handleSelectAnswer() of the <Quiz> component
      }, 2000);
    }, 1000);
  }

  // We need to pass value of answerState to child comp. <Answers> for dynamic styling
  //   let answerState = "";
  //   if (answer.selectedAnswer && answer.isCorrect !== null) {
  //     answerState = answer.isCorrect ? "correct" : "wrong";
  //   }

  let answerState = "";
  console.log("Selected Answer: ", answer.selectedAnswer);
  console.log("isCorrect: ", answer.isCorrect);
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={
          answer.selectedAnswer === "" ? () => onSelectAnswer(null) : null
        }
        mode={answerState}
      />

      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
