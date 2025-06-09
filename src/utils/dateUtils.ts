/**
 * Calculates the number of days remaining until a given start date.
 * Rounds up to the nearest whole day. Returns "0 days" if the date is today or in the past.
 */
export function getDaysUntil(startDateInput: Date | string): number {
  const startDate = startDateInput instanceof Date ? startDateInput : new Date(startDateInput);

  if (isNaN(startDate.getTime())) {
    return -1;
  }

  const now = Date.now();
  const startTime = startDate.getTime();

  const diffMilliseconds = startTime - now;

  if (diffMilliseconds <= 0) {
    return 0;
  }

  const daysRemaining = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));

  return daysRemaining;
}

/**
 * Formats a date range into a string like "Mon DD-DD".
 * Assumes the start and end dates are in the same month and year for this specific format.
 */
export function formatDateRangeShort(startDateInput: Date | string, endDateInput: Date | string): string {
  if (!startDateInput || !endDateInput) {
    console.error("Empty Start or EndDate in formatDateRangeShort");
    return "Empty Date(s)";
  }
  const startDate = startDateInput instanceof Date ? startDateInput : new Date(startDateInput);
  const endDate = endDateInput instanceof Date ? endDateInput : new Date(endDateInput);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    console.error("Invalid date range provided to formatDateRangeShort:", startDateInput, endDateInput);
    return "Invalid date range";
  }
  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();
  const startDay = startDate.getDate();

  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();
  const endDay = endDate.getDate();

  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const monthDayFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

  if (startMonth === endMonth && startYear === endYear) {
    const month = monthFormatter.format(startDate);
    return `${month} ${startDay}-${endDay}`;
  } else {
    const formattedStartDate = monthDayFormatter.format(startDate);
    const formattedEndDate = monthDayFormatter.format(endDate);
    return `${formattedStartDate} - ${formattedEndDate}`;
  }
}

export function calculateTimeElapsed(time: string): string {
  try {
    const givenTime = new Date(time);
    const currentTime = new Date();

    const elapsedMs = currentTime.getTime() - givenTime.getTime();

    const seconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    } else if (hours < 24) {
      return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    } else {
      return `${days} ${days === 1 ? "day" : "days"}`;
    }
  } catch (error) {
    return "Error Converting Date";
  }
}
