import { render } from "@testing-library/react";
import { describe, expect, it } from "vite-plus/test";
import Logo from "./logo";

describe("Logo", () => {
  it("stays out of the accessibility tree as a decorative mark", () => {
    const { container } = render(<Logo />);

    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
