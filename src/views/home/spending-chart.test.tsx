import { SPENDING } from "@/data";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vite-plus/test";
import SpendingChart from "./spending-chart";

const WEDNESDAY_NOON = new Date(2026, 10, 18, 12);
const THURSDAY_MORNING = new Date(2026, 10, 19, 8);

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(WEDNESDAY_NOON);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("SpendingChart", () => {
  it("names each bar with its day and amount, in order, marking today", () => {
    render(<SpendingChart days={SPENDING} />);

    const bars = within(screen.getByRole("list")).getAllByRole("button");
    expect(bars).toHaveLength(7);
    [
      "Monday, $17.45",
      "Tuesday, $34.91",
      "Wednesday, $52.36, today",
      "Thursday, $31.07",
      "Friday, $23.39",
      "Saturday, $43.28",
      "Sunday, $25.48",
    ].forEach((name, index) => expect(bars[index]).toHaveAccessibleName(name));
  });

  it("hides the day labels from assistive tech, since each bar's name already says the day", () => {
    render(<SpendingChart days={SPENDING} />);

    for (const { day } of SPENDING) {
      expect(screen.getByText(day)).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("moves the today mark when the tab comes back on a new day", () => {
    render(<SpendingChart days={SPENDING} />);

    vi.setSystemTime(THURSDAY_MORNING);
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(
      screen.getByRole("button", { name: "Thursday, $31.07, today" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Wednesday, $52.36" }),
    ).toBeInTheDocument();
  });

  it("leaves today unmarked in the prerendered HTML", () => {
    expect(renderToString(<SpendingChart days={SPENDING} />)).not.toContain(
      "today",
    );
  });

  it("dismisses the tooltip on Escape and shows it again when the pointer returns", async () => {
    const user = userEvent.setup();
    render(<SpendingChart days={SPENDING} />);
    const wednesday = screen.getByRole("button", { name: /^Wednesday/ });

    await user.hover(wednesday);
    expect(within(wednesday).getByText("$52.36")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(within(wednesday).queryByText("$52.36")).not.toBeInTheDocument();

    await user.unhover(wednesday);
    await user.hover(wednesday);
    expect(within(wednesday).getByText("$52.36")).toBeInTheDocument();
  });

  it("shows the next bar's tooltip after Escape when focus moves on", async () => {
    const user = userEvent.setup();
    render(<SpendingChart days={SPENDING} />);

    await user.tab();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("$17.45")).not.toBeInTheDocument();

    await user.tab();
    expect(screen.getByText("$34.91")).toBeInTheDocument();
  });
});
