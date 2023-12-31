import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import { TimezoneDropdown } from "./TimezoneDropdown";
import { calculateTimeLeft } from "../lib/calculateTimeLeft";
import moment from "moment-timezone";







export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft("UTC"));
  const [isNewYear, setIsNewYear] = useState(false);
  const [timezone, setTimezone] = useState(moment.tz.guess());
  const [currentTime, setCurrentTime] = useState(moment().tz(timezone).format("HH:mm:ss"));
  const [currentDate, setCurrentDate] = useState(moment().tz(timezone).format("YYYY-MM-DD"));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(timezone);
      setTimeLeft(newTimeLeft);

      const now = moment().tz(timezone);
      setCurrentTime(now.format("HH:mm:ss"));
      setCurrentDate(now.format("YYYY-MM-DD"));

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsNewYear(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone, timeLeft]);

  const handleTimezoneChange = (selectedTimezone) => {
    setTimezone(selectedTimezone);
  };

  const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

  const timezoneOptions = moment.tz.names();
  const numberClass = "text-3xl font-bold";

  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute top-4 left-4 flex flex-col items-center">
        <div className="fixed right-4">
          <p className="text-lg font-semibold">{currentDate} {currentTime}</p>
        </div>
        
        <TimezoneDropdown
          value={timezone}
          onChange={handleTimezoneChange}
          options={timezoneOptions}
        />
  
      </div>

      <div className="flex flex-col items-center">
        <Snowfall
          color="#FFF"
          snowflakeCount={10}
          className="absolute"
          radius={[1, 5]}
        />
        <div className="text-center relative z-20">
          <h1 className="text-4xl font-bold mb-4">COUNTDOWN TO 2024</h1>
          <div>
            <p className="text-2xl font-semibold">{isNewYear ? "Happy New Year!" : ""}</p>
          </div>
          {!isNewYear && (
            <div>
              {timeLeft.days > 0 && (
                <div>
                  <span className={numberClass}>{addLeadingZero(timeLeft.days)}</span> days{" "}
                </div>
              )}
              <div>
                <span className={numberClass}>{addLeadingZero(timeLeft.hours)}</span> hours{" "}
                <span className={numberClass}>{addLeadingZero(timeLeft.minutes)}</span> minutes{" "}
                <span className={numberClass}>{addLeadingZero(timeLeft.seconds)}</span> seconds
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
