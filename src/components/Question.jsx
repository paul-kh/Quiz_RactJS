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
  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }

  return (
    <div id="question">
      <QuestionTimer timeout={15000} onTimeout={() => onSelectAnswer(null)} />

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
