import { useEffect, useState } from "react";
import styles from "./Timer.module.scss";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 5 });
  const [intervalRef, setIntervalRef] = useState(null);

  const calculateTimeLeft = (state) => {
    if (state.seconds > 0) return { ...state, seconds: state.seconds - 1 };
    else {
      return {
        minutes: state.minutes - 1,
        seconds: 59,
      };
    }
  };

  useEffect(() => {
    if (!timeLeft.minutes && !timeLeft.seconds && intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }
  }, [timeLeft, intervalRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((state) => {
        return calculateTimeLeft(state);
      });
    }, 1000);
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
        <p>The exchange rate may have changed, please refresh</p>
      )}
    </div>
  );
};

export default Timer;
