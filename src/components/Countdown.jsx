import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import { TimezoneDropdown } from "./TimezoneDropdown";
import { calculateTimeLeft } from "../lib/calculateTimeLeft";
import moment from "moment-timezone";

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft("UTC"));
  const [isNewYear, setIsNewYear] = useState(false);
  const [timezone, setTimezone] = useState(moment.tz.guess());

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft(timezone);
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
  }, [timezone, timeLeft]);

  const handleTimezoneChange = (selectedTimezone) => {
    setTimezone(selectedTimezone);
  };

  const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

  const timezoneOptions = moment.tz.names();
  const numberClass = "text-3xl font-bold"
  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute top-4 left-4">
        <TimezoneDropdown
          value={timezone}
          onChange={handleTimezoneChange}
          options={timezoneOptions}
        />
      </div>

      <Snowfall
        color="#FFF"
        snowflakeCount={1}
        className="absolute"
        radius={[1, 5]}
      />
      <div className="text-center relative z-20">
        <h1 className="text-4xl font-bold mb-4">COUNTDOWN TO 2024</h1>
        {isNewYear ? (
          <div>
            <p className="text-2xl font-semibold">Happy New Year!</p>
          </div>
        ) : (
          <div>
            {timeLeft.days > 0 && (
              <div>
                <span className={numberClass}>
                  {addLeadingZero(timeLeft.days)}
                </span>{" "}
                days{" "}
              </div>
            )}
            <div>
              <span className={numberClass}>
                {addLeadingZero(timeLeft.hours)}
              </span>{" "}
              hours{" "}
              <span className={numberClass}>
                {addLeadingZero(timeLeft.minutes)}
              </span>{" "}
              minutes{" "}
              <span className={numberClass}>
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
