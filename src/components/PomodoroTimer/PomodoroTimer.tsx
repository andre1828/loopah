import { useEffect, useState } from "react";
import "./PomodoroTimer.css";
const one_second = 1 / 60;
const initial_time = 25 * 60;

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
        console.log(Math.floor(remainingTime - one_second));
      }, 100);

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

  const getPercentage = () =>
    (remainingTime - initial_time / (remainingTime + initial_time / 2)) * 100;

  const percentage = 40 //getPercentage();
  
  const ContainerStyle = {
    background: `linear-gradient(
      45deg,
      rgb(249, 212, 139) 0%,
      rgb(249, 212, 139) ${percentage}%,
      rgb(151, 146, 227) ${percentage}%,
      rgb(151, 146, 227) 100%
    )`,
  };
  return (
    <>
      <div className="container" style={ContainerStyle}>
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
      </div>
    </>
  );
};

export default PomodoroTimer;
