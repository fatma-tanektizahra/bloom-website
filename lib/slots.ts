// Mock availability — no backend yet, so this just generates the next 7
// days with a fixed set of time slots. Replace this with a real query
// (e.g. "slots not already booked in the database") once persistence is
// wired up.

export type DayOption = {
  iso: string; // e.g. "2026-09-22"
  label: string; // e.g. "Tue 22"
};

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function getNextDays(count: number): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    days.push({
      iso: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" }),
    });
  }

  return days;
}
