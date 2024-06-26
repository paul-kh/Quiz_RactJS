import { useState, useCallback } from "react";

import QUESTIONS from "../questions";

import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  /**********************************************************************************
   * We shuffle answer choices for each question.
   * Each question has timer that will run out
   * If user didn't pick an answer, timer runs out, answer will be set to "NULL"
   **********************************************************************************/

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  console.log("userAnswers: ", userAnswers);

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevSelectedAnswers) => {
      return [...prevSelectedAnswers, selectedAnswer];
    });
  }

  if (activeQuestionIndex === QUESTIONS.length) {
    return (
      <div id="summary">
        <img src={quizCompletedImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // Shuffle answers to display
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]; // Copy all answers of each question
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <QuestionTimer
        timeout={5000}
        onTimeout={() => handleSelectAnswer(null)}
      />
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
