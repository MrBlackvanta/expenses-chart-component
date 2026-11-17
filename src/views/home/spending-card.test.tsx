import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import SpendingCard from "./spending-card";

describe("SpendingCard", () => {
  it("titles the page with the card's heading", () => {
    render(<SpendingCard />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Spending - Last 7 days" }),
    ).toBeInTheDocument();
  });

  it("pairs the month's total with its label as a term and definition", () => {
    render(<SpendingCard />);

    expect(screen.getByRole("term")).toHaveTextContent("Total this month");
    expect(screen.getByRole("definition")).toHaveTextContent("$478.33");
  });

  it("reads the change as one sentence despite the stacked lines", () => {
    render(<SpendingCard />);

    expect(
      screen.getByText(
        (_, element) => element?.textContent === "+2.4% from last month",
      ),
    ).toBeInTheDocument();
  });
});
