import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

const calculateTimeLeft = () => {
  const difference = +new Date(`2024-01-01T00:00:00`) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  return timeLeft;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsNewYear(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div className="flex items-center justify-center h-screen relative">
      <Snowfall
        color="#FFF"
        snowflakeCount={20}
        className=" absolute"
        radius={[1, 5]}
      />
      <div className="text-center relative z-20">
        <h1 className="text-4xl font-bold mb-4">Countdown to 2024</h1>
        {isNewYear ? (
          <div>
            <p className="text-2xl font-semibold">Happy New Year!</p>
          </div>
        ) : (
          <div>
            {timeLeft.days > 0 && (
              <div>
                <span className="text-2xl font-semibold">
                  {addLeadingZero(timeLeft.days)}
                </span>{" "}
                days{" "}
              </div>
            )}
            <div>
              <span className="text-2xl font-semibold">
                {addLeadingZero(timeLeft.hours)}
              </span>{" "}
              hours{" "}
              <span className="text-2xl font-semibold">
                {addLeadingZero(timeLeft.minutes)}
              </span>{" "}
              minutes{" "}
              <span className="text-2xl font-semibold">
                {addLeadingZero(timeLeft.seconds)}
              </span>{" "}
              seconds
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Countdown />
    </div>
  );
}

export default App;
