// @vitest-environment jsdom
import { describe, expect, test} from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  test("renders with default props", async () => {
    render(<Button>Click me</Button>);

    const button = screen.getByText(/click me/i);

    expect(button).toBeInTheDocument();
    expect(button.className).toContain("button");
    expect(button.className).toContain("md");
    expect(button.className).toContain("primary");
    expect(button).not.toHaveAttribute("disabled");
  });

  test("renders with custom props", async () => {
    render(
      <Button size="lg" variant="secondary" disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByText(/disabled button/i);

    expect(button).toBeInTheDocument();
    expect(button.className).toContain("button");
    expect(button.className).toContain("lg");
    expect(button.className).toContain("secondary");
    expect(button).toHaveAttribute("disabled");
  });

  test("applies hover styles on mouse over", async () => {
    render(<Button>Hover me</Button>);

    const button = screen.getByText(/hover me/i);

    await userEvent.hover(button);

    expect(button).toHaveStyle({
      background: "var(--primary-hover, #8952e0)",
    });
  });

  test("applies active styles on mouse down", async () => {
    render(<Button>Click me</Button>);

    const button = screen.getByText(/click me/i);

    await userEvent.click(button);

    expect(button).toHaveStyle({
      background: "var(--primary-active, #5b21b6)",
    });
  });
});
