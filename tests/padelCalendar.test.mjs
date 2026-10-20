import test from "node:test";
import assert from "node:assert/strict";
import { calendarDays, dateValue, parseDate, shiftDay, shiftMonth, todayValue } from "../src/lib/padelCalendar.mjs";

test("calendar starts on Monday and includes adjacent months", () => {
  const days = calendarDays("2026-10");
  assert.equal(days.length, 42);
  assert.equal(days[0], "2026-09-28");
  assert.equal(days.at(-1), "2026-11-08");
  assert.equal(new Set(days).size, 42);
});

test("month navigation preserves the day where possible and handles leap years", () => {
  assert.equal(shiftMonth("2026-01-31", 1), "2026-02-28");
  assert.equal(shiftMonth("2028-01-31", 1), "2028-02-29");
  assert.equal(shiftMonth("2026-12-31", 1), "2027-01-31");
  assert.equal(shiftMonth("2026-01-01", -1), "2025-12-01");
  assert.ok(calendarDays("2028-02").includes("2028-02-29"));
});

test("date navigation remains stable over daylight-saving changes", () => {
  assert.equal(shiftDay("2026-03-28", 1), "2026-03-29");
  assert.equal(shiftDay("2026-03-29", 1), "2026-03-30");
  assert.equal(shiftDay("2026-10-25", -1), "2026-10-24");
  assert.equal(dateValue(parseDate("2026-10-20")), "2026-10-20");
});

test("today uses the Dutch date when UTC is still on the previous day", () => {
  assert.equal(todayValue(new Date("2026-10-19T22:30:00Z")), "2026-10-20");
  assert.equal(todayValue(new Date("2026-12-31T23:30:00Z")), "2027-01-01");
});
