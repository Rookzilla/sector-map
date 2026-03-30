import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("starts with an empty detail drawer", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "No System Selected" })).toBeInTheDocument();
  });

  it("does not open details on hover alone", () => {
    render(<App />);

    fireEvent.mouseEnter(screen.getByRole("button", { name: /Inspect Hydraspes/i }));

    expect(screen.getByRole("heading", { name: "No System Selected" })).toBeInTheDocument();
  });

  it("keeps locked context and clears on empty-map click", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Inspect Maximus/i }));
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Maximus" })).toBeInTheDocument();
    });

    fireEvent.mouseEnter(screen.getByRole("button", { name: /Inspect Hydraspes/i }));
    expect(screen.getByRole("heading", { name: "Maximus" })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Galactic sector map"));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "No System Selected" })).toBeInTheDocument();
    });
  });
});
