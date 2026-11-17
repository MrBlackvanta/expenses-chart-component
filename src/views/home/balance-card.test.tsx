import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import BalanceCard from "./balance-card";

describe("BalanceCard", () => {
  it("pairs the balance with its label as a term and definition", () => {
    render(<BalanceCard />);

    expect(screen.getByRole("term")).toHaveTextContent("My balance");
    expect(screen.getByRole("definition")).toHaveTextContent("$921.48");
  });
});
