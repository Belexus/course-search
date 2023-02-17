import { fireEvent, render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

const setup = () => {
  render(
    <Layout>
      <div />
    </Layout>
  );
};

test("should be able to display the input search", () => {
  setup();
  const element = screen.getByPlaceholderText(/Search/i);
  expect(element).toBeInTheDocument();
});

test("should be able to display the menu item Courses", () => {
  setup();
  const element = screen.getByText(/Courses/i);
  expect(element).toBeInTheDocument();
});

test("should be able to allow typing in search input", () => {
  setup();
  const element = screen.getByLabelText(/Search course/i) as HTMLInputElement;
  fireEvent.change(element, { target: { value: "test" } });
  expect(element.value).toBe("test");
});
