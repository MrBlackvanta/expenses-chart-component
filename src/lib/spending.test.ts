import { describe, expect, it } from "vite-plus/test";
import { parseSpending, scaleToMax, weekdayName, weekdayOf } from "./spending";

describe("weekdayOf", () => {
  it.each([
    [new Date(2026, 10, 15), "sun"],
    [new Date(2026, 10, 16), "mon"],
    [new Date(2026, 10, 17), "tue"],
    [new Date(2026, 10, 18), "wed"],
    [new Date(2026, 10, 19), "thu"],
    [new Date(2026, 10, 20), "fri"],
    [new Date(2026, 10, 21), "sat"],
    [new Date(2026, 10, 18, 23, 59, 59), "wed"],
    [new Date(2026, 10, 19, 0, 0, 0), "thu"],
  ])("reads %s as %s", (date, expected) => {
    expect(weekdayOf(date)).toBe(expected);
  });
});

describe("weekdayName", () => {
  it.each([
    ["sun", "Sunday"],
    ["mon", "Monday"],
    ["wed", "Wednesday"],
    ["sat", "Saturday"],
  ] as const)("names %s %s", (day, expected) => {
    expect(weekdayName(day)).toBe(expected);
  });
});

describe("scaleToMax", () => {
  it.each([
    [
      [17.45, 34.91, 52.36],
      [17.45 / 52.36, 34.91 / 52.36, 1],
    ],
    [[52.36], [1]],
    [
      [10, 10],
      [1, 1],
    ],
    [
      [0, 25],
      [0, 1],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
    ],
    [[], []],
  ])("scales %j to %j", (values, expected) => {
    expect(scaleToMax(values)).toEqual(expected);
  });
});

describe("parseSpending", () => {
  it("keeps known days in order", () => {
    expect(
      parseSpending([
        { day: "sun", amount: 25.48 },
        { day: "mon", amount: 17.45 },
      ]),
    ).toEqual([
      { day: "sun", amount: 25.48 },
      { day: "mon", amount: 17.45 },
    ]);
  });

  it.each([
    [[{ day: "Mon", amount: 1 }], 'Unknown day "Mon"'],
    [[{ day: "monday", amount: 1 }], 'Unknown day "monday"'],
    [[{ day: "toString", amount: 1 }], 'Unknown day "toString"'],
    [
      [
        { day: "mon", amount: 1 },
        { day: "mon", amount: 2 },
      ],
      'Duplicate day "mon"',
    ],
  ])("rejects %j", (entries, message) => {
    expect(() => parseSpending(entries)).toThrow(message);
  });
});
