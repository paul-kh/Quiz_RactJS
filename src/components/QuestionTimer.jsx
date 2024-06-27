import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SET TIMER FOR EACH QUESTION: ", timeout / 1000, " seconds");
    const timer = setTimeout(onTimeout, timeout);

    // Cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("SET INTERVAL TO SHOW REMAINING TIME PROGRESS");
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // Cleanup interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      className={mode}
    />
  );
}
