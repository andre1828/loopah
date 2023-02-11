import { useEffect, useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import {
  Container,
  Circle,
  SecondaryText,
  ButtonContainer,
  Button,
  Time,
} from "..";

const one_second = 1 / 60;
const initial_time = 0.1 * 60;

const padWithZero = (number: number): string | number => {
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
      <Container>
        {!remainingTime && (
          <SecondaryText> Time is up! Take a break. </SecondaryText>
        )}

        {!!remainingTime && (
          <Circle>
            <Time>
              {padWithZero(minutes)}
              {!!seconds && `:${seconds}`}
            </Time>
          </Circle>
        )}

        <ButtonContainer>
          <Button onClick={handleStartButtonClick}>
            {isActive && remainingTime ? (
              <PauseRoundedIcon fontSize="large" />
            ) : (
              <PlayArrowRoundedIcon fontSize="large" />
            )}
          </Button>
          {!!remainingTime && (
            <Button onClick={restartTimer}>
              <RefreshRoundedIcon fontSize="large" />
            </Button>
          )}
        </ButtonContainer>
        <SecondaryText>completed pomodoros: {completedPomodoros}</SecondaryText>
      </Container>
    </>
  );
};

export default PomodoroTimer;
