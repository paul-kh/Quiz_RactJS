import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SET TIMEOUT");
    const timer = setTimeout(onTimeout, timeout);

    // Cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("SET INTERVAL");
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    // Cleanup interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
