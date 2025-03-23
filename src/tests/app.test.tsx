import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App Component", () => {
  it("renders the Header, Banner, Form, and Footer", () => {
    render(<App />);

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("header")).toBeInTheDocument();
    expect(screen.getByRole("footer")).toBeInTheDocument();
  });

  it("displays the correct initial banner text", () => {
    render(<App />);
    expect(screen.getByText("I love building awesome UIs!")).toBeInTheDocument();
  });

  it("updates the banner text when form is submitted", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Change banner text");
    const updateButton = screen.getByRole("button", { name: /update text/i });

    fireEvent.change(input, { target: { value: "New Banner Text" } });
    fireEvent.click(updateButton);

    expect(screen.getByText("New Banner Text")).toBeInTheDocument();
  });

  it("updates the banner description when form is submitted", () => {
    render(<App />);

    const textarea = screen.getByPlaceholderText("Change banner description");
    const updateButton = screen.getByRole("button", { name: /update desc/i });

    fireEvent.change(textarea, { target: { value: "New description" } });
    fireEvent.click(updateButton);

    expect(screen.getByText("New description")).toBeInTheDocument();
  });
});
