import { useEffect, useState } from "react";

const one_second = 1 / 60;
const initial_time = 1 * 60;

const padWithZero = (number): string | number => {
  if (number < 10) return `0${number}`;

  return number;
};

const PomodoroTimer = () => {
  const [remainingTime, setRemainingTime] = useState(initial_time); // 25 minutes
  const seconds = padWithZero(remainingTime % 60);
  const minutes = Math.floor(remainingTime / 60);

  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        setRemainingTime((remainingTime) =>
          Math.floor(remainingTime - one_second)
        );
      }, 1000);

      if (remainingTime === 0) {
        setIsActive(false);
        clearInterval(intervalId);
      }

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isActive, remainingTime]);

  const handleStartButtonClick = () => {
    if (!isActive) {
      setIsActive(true);

      if (!remainingTime) {
        setRemainingTime(initial_time);
      }
    }

    if (isActive) {
      setIsActive(false);
    }
  };

  const restartTimer = () => {
    setRemainingTime(initial_time);
    setIsActive(false);
  };

  return (
    <>
      {!remainingTime && <p>Time is up! Take a break.</p>}

      {!!remainingTime && (
        <p>
          {padWithZero(minutes)}
          {!!seconds && `:${seconds}`}
        </p>
      )}

      <div>
        <button onClick={handleStartButtonClick}>
          {isActive && remainingTime ? "Pause" : "Start"}
        </button>
        {!!remainingTime && <button onClick={restartTimer}>Stop</button>}
      </div>
    </>
  );
};

export default PomodoroTimer;
