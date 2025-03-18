import { render, screen } from "@testing-library/react";
import App from "../App"

test("renders App component with image", () => {
  render(<App />);

  expect(screen.getByAltText("logo")).toBeInTheDocument();
});

test("renders App component with text", () => {
    render(<App />);

    expect(screen.getByText(/testing cases/i)).toBeInTheDocument()
})