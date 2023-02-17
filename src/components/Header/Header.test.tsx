import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";

const setup = () => {
  render(<Header opened={false} setOpened={() => {}} />);
};

test("should be able to display the main title", () => {
  setup();
  const element = screen.getByText(/Estudiar · Mexico City/i);
  expect(element).toBeInTheDocument();
});

test("should be able to display the star icon", () => {
  setup();
  const element = screen.getByLabelText(/Go to Home/i);
  expect(element).toBeInTheDocument();
});

test("should be able to click on the star icon", () => {
  setup();
  const searchBtn = screen.getByTestId("star-icon");
  expect(searchBtn).not.toBeDisabled();
  userEvent.click(searchBtn);
});
