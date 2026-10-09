import assert from "node:assert/strict";
import test from "node:test";
import { buildContributionWeeks, parseContributionResponse } from "./github-activity.ts";

test("parses the contribution service JSON response", () => {
  const parsed = parseContributionResponse({
    total: { lastYear: 2 },
    contributions: [
      { date: "2026-10-08", count: 2, level: 2 },
      { date: "2026-10-09", count: 0, level: 0 },
    ],
  });

  assert.equal(parsed?.totalContributions, 2);
  assert.deepEqual(parsed?.days.map((day) => day.date), ["2026-10-08", "2026-10-09"]);
});

test("rejects invalid contribution data and calendar dates", () => {
  assert.equal(parseContributionResponse({ total: {}, contributions: [] }), null);
  assert.equal(parseContributionResponse({
    total: { lastYear: 1 },
    contributions: [{ date: "2026-02-30", count: 1, level: 1 }],
  }), null);
  assert.equal(parseContributionResponse({
    total: { lastYear: 1 },
    contributions: [{ date: "2026-10-09", count: 1, level: 5 }],
  }), null);
});

test("builds a Monday-first 365-day grid without inventing missing days", () => {
  const weeks = buildContributionWeeks([
    { date: "2026-01-07", count: 1, level: 1 },
  ], new Date("2026-01-07T12:00:00Z"));
  const cells = weeks.flat();
  const dates = cells.filter((cell) => cell !== null);
  const dateWeek = weeks.find((week) => week.some((cell) => cell?.date === "2026-01-07"));

  assert.equal(cells.length % 7, 0);
  assert.equal(dateWeek?.[2]?.date, "2026-01-07");
  assert.equal(dates.length, 1);
  assert.equal(cells.filter((cell) => cell === null).length, cells.length - 1);
});