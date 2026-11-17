import { describe, expect, it } from "vite-plus/test";
import { formatUsd } from "./format";

describe("formatUsd", () => {
  it.each([
    [0, "$0.00"],
    [921.48, "$921.48"],
    [17.4, "$17.40"],
    [52, "$52.00"],
    [0.005, "$0.01"],
    [1234.5, "$1,234.50"],
    [1_000_000, "$1,000,000.00"],
    [-17.45, "-$17.45"],
  ])("formats %d as %s", (amount, expected) => {
    expect(formatUsd(amount)).toBe(expected);
  });
});
