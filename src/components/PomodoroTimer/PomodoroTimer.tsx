import { useEffect, useState } from "react";
import "./PomodoroTimer.css";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
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
        {!remainingTime && (
          <p className="secondary-text done-text">Time is up! Take a break.</p>
        )}

        {!!remainingTime && (
          <div className="circle">
            <p className="time">
              {padWithZero(minutes)}
              {!!seconds && `:${seconds}`}
            </p>
          </div>
        )}

        <div className="button-container">
          <button className="button" onClick={handleStartButtonClick}>
            {isActive && remainingTime ? (
              <PauseRoundedIcon fontSize="large" />
            ) : (
              <PlayArrowRoundedIcon fontSize="large" />
            )}
          </button>
          {!!remainingTime && (
            <button className="button" onClick={restartTimer}>
              <RefreshRoundedIcon fontSize="large" />
            </button>
          )}
        </div>
        <p className="secondary-text">
          completed pomodoros: {completedPomodoros}
        </p>
      </div>
    </>
  );
};

export default PomodoroTimer;
