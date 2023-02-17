import { fireEvent, render, screen } from "@testing-library/react";
import { DestinationInput } from "./DestinationInput";

const setup = () => {
  render(<DestinationInput countries={{}} countryLocation={{}} />);
};

const setupWithData = () => {
  render(
    <DestinationInput
      countries={{
        CA: {
          name: "Canada",
          icon: null,
        },
      }}
      countryLocation={{
        CA: [
          {
            name: "Toronto, ON, Canada",
            city: "Toronto",
            state: "ON, Canada",
            icon: null,
          },
          {
            name: "Vancouver, BC, Canada",
            city: "Vancouver",
            state: "BC, Canada",
            icon: null,
          },
        ],
      }}
    />
  );
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

test("should be able to allow display Search modal", () => {
  setup();
  const input = screen.getByLabelText(/Destination/i) as HTMLInputElement;
  fireEvent.focus(input);
  const element = screen.getByRole("button", { name: /Confirm/i });
  expect(element).toBeInTheDocument();
});
