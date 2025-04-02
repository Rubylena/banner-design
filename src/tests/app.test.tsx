import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, beforeAll } from "vitest";
import App from "../App";
import { cleanup } from "@testing-library/react";

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

beforeAll(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

describe("App Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the Header, Banner, Form, and Footer", () => {
    render(<App />);

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /edit the banner/i })
    ).toBeInTheDocument();
  });

  it("displays the correct initial banner text", () => {
    render(<App />);
    expect(
      screen.getByText("I love building awesome UIs!")
    ).toBeInTheDocument();
  });

  it("updates the banner text when form is submitted", () => {
    render(<App />);

    const textInput = screen.getByLabelText(/banner text/i);
    const updateTextButton = screen.getByRole("button", {
      name: /update text/i,
    });

    fireEvent.change(textInput, { target: { value: "New Banner Text" } });
    fireEvent.click(updateTextButton);

    expect(screen.getByText("New Banner Text")).toBeInTheDocument();
  });

  it("updates the banner description when form is submitted", () => {
    render(<App />);

    const descInput = screen.getByLabelText(/banner description/i);
    const updateDescButton = screen.getByRole("button", {
      name: /update desc/i,
    });

    fireEvent.change(descInput, { target: { value: "New description" } });
    fireEvent.click(updateDescButton);

    expect(screen.getByText("New description")).toBeInTheDocument();
  });
});
