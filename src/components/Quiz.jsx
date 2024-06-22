import { useState } from "react";

import QUESTIONS from "../questions";

export default function Quiz() {
  /**********************************************************************************
   * We shuffle answer choices for each question.
   * Each question has timer that will run out
   * If user didn't pick an answer, timer runs out, answer will be set to "NULL"
   **********************************************************************************/

  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  return (
    <div id="question">
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <ul id="answers">
        {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
          <li key={answer} className="answer">
            <button>{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
