import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({
  questionText,
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
}) {
  return (
    <div id="question">
      <QuestionTimer timeout={15000} onTimeout={() => onSelectAnswer(null)} />

      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
