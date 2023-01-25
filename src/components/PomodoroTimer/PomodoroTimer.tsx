import { useEffect, useState } from "react";
import "./PomodoroTimer.css";
import PlayIcon from "./../../assets/play.svg";
import PauseIcon from "./../../assets/pause.svg";
import ResetIcon from "./../../assets/reset2.svg";
const one_second = 1 / 60;
const initial_time = 0.1 * 60;

const padWithZero = (number): string | number => {
  if (number < 10) return `0${number}`;

  return number;
};

const PomodoroTimer = () => {
  const [remainingTime, setRemainingTime] = useState(initial_time); // 25 minutes
  const seconds = padWithZero(remainingTime % 60);
  const minutes = Math.floor(remainingTime / 60);

  const [isActive, setIsActive] = useState(false);

  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    if (isActive) {
      const intervalId = setInterval(() => {
        setRemainingTime((remainingTime) =>
          Math.floor(remainingTime - one_second)
        );
        console.log(Math.floor(remainingTime - one_second));
      }, 1000);

      if (remainingTime === 0) {
        setIsActive(false);
        clearInterval(intervalId);
        setCompletedPomodoros((cp) => cp + 1);
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
      <div className="container">
        {!remainingTime && <p>Time is up! Take a break.</p>}

        {!!remainingTime && (
          <p className="time">
            {padWithZero(minutes)}
            {!!seconds && `:${seconds}`}
          </p>
        )}

        <div className="button-container">
          <button className="button" onClick={handleStartButtonClick}>
            {isActive && remainingTime ? (
              <img src={PauseIcon} alt="Pause" />
            ) : (
              <img src={PlayIcon} alt="Start" />
            )}
          </button>
          {!!remainingTime && (
            <button className="button" onClick={restartTimer}>
              {" "}
              <img src={ResetIcon} alt="Reset" />{" "}
            </button>
          )}
        </div>
        <div>
          <p>completed pomodoros: {completedPomodoros}</p>
        </div>
      </div>
    </>
  );
};

export default PomodoroTimer;
