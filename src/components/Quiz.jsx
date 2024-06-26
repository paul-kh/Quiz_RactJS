import { useState, useRef } from "react";

import QUESTIONS from "../questions";

import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  /************************************************************************************
   *  We are facing a problem with shuffledAnswers re-executed when state of Quiz is changed
   *  and before the timeout for highlighting selected answer.
   *  To fix the issue, we use useRef() to store shuffledAnswers by React, which
   *  is independent from component re-redering
   * **********************************************************************************/
  const shuffledAnswers = useRef();
  /**********************************************************************************
   * We shuffle answer choices for each question.
   * Each question has timer that will run out
   * If user didn't pick an answer, timer runs out, answer will be set to "NULL"
   **********************************************************************************/

  const [userAnswers, setUserAnswers] = useState([]);

  /***********************************************************************************
   * We highlight the answer when user selected it.
   * If the selected answer is correct => highlight in Green
   * If the selected answer is wrong => hightlight in red
   * After the answer is selected for 2 seconds => move to next question
   ***********************************************************************************/
  const [answerState, setAnswerState] = useState("");

  // We need to pause question not to move to next question if no answer has been selected yet
  // If no answer selected yet, the answerState = "" though we set activeQuestionIndex to
  // the length of the userAnswers array
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  console.log("userAnswers: ", userAnswers);

  function handleSelectAnswer(selectedAnswer) {
    setAnswerState("answered"); // when user selected an answer

    setUserAnswers((prevSelectedAnswers) => {
      return [...prevSelectedAnswers, selectedAnswer];
    });

    // After 1 second, we highlight answer based on correct or wrong answer
    // Note: The first answer in the answer array of the original QUESTIONS array
    //       is the correct answer.
    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState("correct");
      } else {
        setAnswerState("wrong");
      }

      // Move to next question 2 seconds after an answer was selected
      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
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
  // At the first page rendering, shuffledAnswers ref is not defined yet
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers]; // Copy all answers of each question
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="quiz">
      <QuestionTimer
        timeout={5000}
        onTimeout={() => handleSelectAnswer(null)}
        /* Use 'key' prop to get <QuestionTimer> re-rendered when 'key' value changes */
        key={activeQuestionIndex}
      />
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {/** We want to dynamically highlight the answer based on user's selected answer */}
          {shuffledAnswers.current.map((answer) => {
            // Find the answer that was selected among the listed answers in the map() method
            // We compare each mapped answer to the last item of userAnswers array
            const isSelected = answer === userAnswers[userAnswers.length - 1];
            let cssClass = "";
            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
