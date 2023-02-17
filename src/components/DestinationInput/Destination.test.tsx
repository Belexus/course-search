import { fireEvent, render, screen } from "@testing-library/react";
import { DestinationInput } from "./DestinationInput";

const setup = () => {
  render(<DestinationInput countries={{}} countryLocation={[]} />);
};

const setupWithData = () => {
  render(
    <DestinationInput
      countries={{
        CA: {
          id: "ChIJs0-pQ_FzhlQRi_OBm-qWkbs",
          name: "Canada",
          icon: null,
          country: "CA",
        },
      }}
      countryLocation={[
        {
          id: "ChIJDbdkHFQayUwR7-8fITgxTmU",
          name: "Toronto, ON, Canada",
          city: "Toronto",
          state: "ON, Canada",
          icon: null,
          country: "CA",
        },
        {
          id: "ChIJOwg_06VPwokRYv534QaPC8g",
          name: "Vancouver, BC, Canada",
          city: "Vancouver",
          state: "BC, Canada",
          icon: null,
          country: "CA",
        },
      ]}
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
