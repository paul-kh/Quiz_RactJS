import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  /************************************************************************************
   *  We are facing a problem with shuffledAnswers re-executed when state of Quiz is changed
   *  and before the timeout for highlighting selected answer.
   *  To fix the issue, we use useRef() to store shuffledAnswers by React, which
   *  is independent from component re-redering
   * **********************************************************************************/
  const shuffledAnswers = useRef();

  // Shuffle answers to display
  // shuffledAnswers ref is not defined yet at the first execution of the component function
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers]; // Copying all answers of each question
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {/* We want to dynamically highlight the answer based on user's selected answer */}
      {shuffledAnswers.current.map((answer) => {
        /* Find the answer that was selected among the listed answers in the map() method
           We compare each mapped answer to the last item of userAnswers array */
        const isSelected = answer === selectedAnswer;
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
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
