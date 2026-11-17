const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface DailySpend {
  day: Weekday;
  amount: number;
}

const WEEKDAY_NAMES: Record<Weekday, string> = {
  sun: "Sunday",
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
};

function isWeekday(value: string): value is Weekday {
  return (WEEKDAYS as readonly string[]).includes(value);
}

export function parseSpending(
  entries: readonly { day: string; amount: number }[],
): DailySpend[] {
  const seen = new Set<Weekday>();

  return entries.map(({ day, amount }) => {
    if (!isWeekday(day))
      throw new Error(`Unknown day "${day}" in spending data`);
    if (seen.has(day))
      throw new Error(`Duplicate day "${day}" in spending data`);
    seen.add(day);
    return { day, amount };
  });
}

export function weekdayOf(date: Date) {
  return WEEKDAYS[date.getDay()];
}

export function weekdayName(day: Weekday) {
  return WEEKDAY_NAMES[day];
}

export function scaleToMax(values: readonly number[]) {
  const max = Math.max(...values);
  return values.map((value) => (max > 0 ? value / max : 0));
}
