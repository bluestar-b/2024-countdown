import moment from "moment-timezone";

export const calculateTimeLeft = (timezone) => {
  const now = moment().tz(timezone);
  const newYear = moment.tz("2024-01-01T00:00:00", timezone);

  const duration = moment.duration(newYear.diff(now));

  return {
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
};
