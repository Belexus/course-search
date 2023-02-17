import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(<App />, { wrapper: BrowserRouter });

  const element = screen.getByText(/Back to Edvisor for Agents/i);
  expect(element).toBeInTheDocument();
  expect(element).toBeInTheDocument();
});
