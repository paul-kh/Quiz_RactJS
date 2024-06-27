import { useState } from "react";

import QUESTIONS from "../questions";

import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  console.log("userAnswers: ", userAnswers);

  const activeQuestionIndex = userAnswers.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevSelectedAnswers) => {
      return [...prevSelectedAnswers, selectedAnswer];
    });
  }

  // Determining when quiz completed
  if (activeQuestionIndex === QUESTIONS.length) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex} // 'key' prop here is for forcing React to destroy old component and remout new instance
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
