import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Search } from "./Search";
const queryClient = new QueryClient();

const setup = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
};

test("should be able to display the Language y Higher Ed. Tabs", () => {
  setup();
  const tab1 = screen.getByText(/Language/i);
  const tab2 = screen.getByText(/Higher Ed./i);
  expect(tab1).toBeInTheDocument();
  expect(tab2).toBeInTheDocument();
});

test("should be able to display the User country info", () => {
  setup();
  const element = screen.getByText(/Mexico, Onshore/i);
  expect(element).toBeInTheDocument();
});

test("should be able to display the Destination input field", () => {
  setup();
  const element = screen.getByLabelText(/Destination/i);
  expect(element).toBeInTheDocument();
});

test("should be able to display the Provider input field", () => {
  setup();
  const element = screen.getByLabelText(/Provider/i);
  expect(element).toBeInTheDocument();
});

test("should be able to display the Min. number of weeks input field", () => {
  setup();
  const element = screen.getByLabelText(/Min. number of weeks/i);
  expect(element).toBeInTheDocument();
});

test("should be able to display the Search button", () => {
  setup();
  const element = screen.getByText(/Search/i);
  expect(element).toBeInTheDocument();
});
