import { fireEvent, render, screen } from "@testing-library/react";
import { ProviderInput } from "./ProviderInput";

const setup = () => {
  render(<ProviderInput providers={[]} />);
};

test("should be able to display the Provider input field", () => {
  setup();
  const element = screen.getByLabelText(/Provider/i);
  expect(element).toBeInTheDocument();
});

test("should be able to allow typing in Provider input field", () => {
  setup();
  const element = screen.getByLabelText(/Provider/i) as HTMLInputElement;
  fireEvent.change(element, { target: { value: "Zoni" } });
  expect(element.value).toBe("Zoni");
});
