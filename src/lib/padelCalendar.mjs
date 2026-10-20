export const MONTH_NAMES = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
export const WEEKDAYS = ["ma", "di", "wo", "do", "vr", "za", "zo"];

export function dateValue(date) {
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function parseDate(value) {
  const [year, month, day = 1] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function todayValue(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function shiftMonth(value, amount) {
  const date = parseDate(value);
  const day = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + amount);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(day, lastDay));
  return dateValue(date);
}

export function shiftDay(value, amount) {
  const date = parseDate(value);
  date.setDate(date.getDate() + amount);
  return dateValue(date);
}

export function calendarDays(month) {
  const first = parseDate(month.slice(0, 7));
  const mondayOffset = (first.getDay() + 6) % 7;
  first.setDate(1 - mondayOffset);
  return Array.from({ length: 42 }, (_, index) => shiftDay(dateValue(first), index));
}

export function monthLabel(value) {
  const date = parseDate(value);
  const name = MONTH_NAMES[date.getMonth()];
  return `${name[0].toUpperCase()}${name.slice(1)} ${date.getFullYear()}`;
}
