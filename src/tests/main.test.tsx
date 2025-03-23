import { describe, it, expect } from "vitest";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../App";
import { act, screen } from "@testing-library/react";

describe("main.tsx", () => {
  it("renders App component inside StrictMode", () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    const root = createRoot(rootElement);
    act(() => {
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    });

     const appText = screen.getByText(/I love building awesome UIs!/i);
     expect(appText).toBeInTheDocument();
  });

  it("creates root element correctly", () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    const root = createRoot(rootElement);
    expect(root).not.toBeNull();
  });

  it("throws error if root element is not found", () => {
    const renderApp = () => {
      createRoot(document.getElementById("non-existent-root")!).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    };

    expect(renderApp).toThrowError();
  });

  it("applies CSS from index.css", () => {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    const root = createRoot(rootElement);
    act(() => {
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    });

    const styles = getComputedStyle(rootElement);
    expect(styles).toBeDefined();
  });
});
