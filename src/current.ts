export function currentTime() {
  const today = new Date();
  return {
    day: dayOfWeek(today),
    time: `${('0' + today.getHours()).slice(-2)}:${(
      '0' + today.getMinutes()
    ).slice(-2)}`,
  };
}

export function dayOfWeek(date: Date): string {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekday[date.getDay()];
}
