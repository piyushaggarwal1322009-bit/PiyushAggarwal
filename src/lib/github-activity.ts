export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubActivityPayload = {
  username: string;
  profileUrl: string;
  stats: {
    publicRepos: number;
    stars: number;
    topLanguage: string | null;
  };
  days: ContributionDay[];
  totalContributions: number | null;
  fetchedAt: string;
  contributionDataAvailable: boolean;
  stale: boolean;
};

export type CalendarCell = ContributionDay | null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function parseContributionResponse(value: unknown): {
  days: ContributionDay[];
  totalContributions: number;
} | null {
  if (!isRecord(value) || !Array.isArray(value.contributions) || !isRecord(value.total)) return null;

  const days: ContributionDay[] = [];
  for (const item of value.contributions) {
    if (!isRecord(item) || !isValidDate(item.date)) continue;
    if (!Number.isInteger(item.count) || typeof item.count !== "number" || item.count < 0) continue;
    if (!Number.isInteger(item.level) || typeof item.level !== "number" || item.level < 0 || item.level > 4) continue;
    days.push({ date: item.date, count: item.count, level: item.level as ContributionDay["level"] });
  }

  if (days.length === 0) return null;

  const total = value.total.lastYear;
  return {
    days: days.sort((a, b) => a.date.localeCompare(b.date)),
    totalContributions: typeof total === "number" && Number.isInteger(total) && total >= 0
      ? total
      : days.reduce((sum, day) => sum + day.count, 0),
  };
}

export function buildContributionWeeks(
  days: ContributionDay[],
  today = new Date(),
): CalendarCell[][] {
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 364);

  const dayMap = new Map(days.map((day) => [day.date, day]));
  const cells: CalendarCell[] = [];
  const mondayOffset = (start.getUTCDay() + 6) % 7;
  for (let index = 0; index < mondayOffset; index += 1) cells.push(null);

  for (const cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    cells.push(dayMap.get(cursor.toISOString().slice(0, 10)) ?? null);
  }

  while (cells.length % 7 !== 0) cells.push(null);

  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
}