import { useEffect, useState } from "react";
import styles from "./Timer.module.scss";

const Timer = ({ conversion }) => {
  const initialState = { minutes: 10, seconds: 0 };
  const [timeLeft, setTimeLeft] = useState({ ...initialState });
  const [intervalRef, setIntervalRef] = useState(null);

  // manage count down of seconds
  const calculateTimeLeft = (state) => {
    if (state.seconds > 0) return { ...state, seconds: state.seconds - 1 };
    else {
      return {
        minutes: state.minutes - 1,
        seconds: 59,
      };
    }
  };

  // create 1 second countdown timer
  const createInterval = () => {
    const interval = setInterval(() => {
      setTimeLeft((state) => {
        return calculateTimeLeft(state);
      });
    }, 1000);
    return interval;
  };

  // reset timer back to 10 minutes when new conversion made
  useEffect(() => {
    if (intervalRef && conversion) {
      clearInterval(intervalRef);
      const interval = createInterval();
      setIntervalRef(interval);
      setTimeLeft({ ...initialState });
      return () => clearInterval(interval);
    }
  }, [conversion]);

  // stop timer when down to 0
  useEffect(() => {
    if (!timeLeft.minutes && !timeLeft.seconds && intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }
  }, [timeLeft, intervalRef]);

  // create timer on load
  useEffect(() => {
    const interval = createInterval();
    setIntervalRef(interval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.timer}>
      {intervalRef ? (
        <>
          <p>Expires in:</p>
          <p>{timeLeft.minutes} minutes</p>
          <p>{timeLeft.seconds} seconds</p>
        </>
      ) : (
        <p>The exchange rate may have changed, please convert again</p>
      )}
    </div>
  );
};

export default Timer;
