import { fireEvent, render, screen } from "@testing-library/react";
import { DestinationInput } from "./DestinationInput";

const setup = () => {
  render(<DestinationInput countries={{}} countryLocation={[]} />);
};

test("should be able to display the Destination input field", () => {
  setup();
  const element = screen.getByLabelText(/Destination/i);
  expect(element).toBeInTheDocument();
});

test("should be able to allow typing in Destination input field", () => {
  setup();
  const element = screen.getByLabelText(/Destination/i) as HTMLInputElement;
  fireEvent.change(element, { target: { value: "Canada" } });
  expect(element.value).toBe("Canada");
});
