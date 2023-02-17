import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearchModal } from "./SearchModal";

const setup = () => {
  render(
    <SearchModal
      opened={true}
      setOpened={() => {}}
      countries={{}}
      locationsSelected={[]}
      setLocationsSelected={() => {}}
      locations={[]}
      emptySelectMessage="No locations selected."
      emptyResultMessage="Enter a destination to see results."
    />
  );
};

const setupWithData = () => {
  render(
    <SearchModal
      opened={true}
      setOpened={() => {}}
      countries={{
        CA: {
          id: "ChIJs0-pQ_FzhlQRi_OBm-qWkbs",
          name: "Canada",
          icon: null,
          country: "CA",
        },
      }}
      locations={[
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
      locationsSelected={[
        {
          id: "ChIJDbdkHFQayUwR7-8fITgxTmU",
          name: "Toronto, ON, Canada",
          city: "Toronto",
          state: "ON, Canada",
          icon: null,
          country: "CA",
        },
      ]}
      setLocationsSelected={() => {}}
    />
  );
};

test("should be able to allow hide Search modal when opened is false", () => {
  render(
    <SearchModal
      opened={false}
      setOpened={() => {}}
      countries={{}}
      locationsSelected={[]}
      setLocationsSelected={() => {}}
      locations={[]}
    />
  );
  const element = screen.queryByText(/Results/i);
  expect(element).not.toBeInTheDocument();
});

test("should be able to allow display empty results message", () => {
  setup();
  const element = screen.getByText(/Enter a destination to see results./i);
  expect(element).toBeInTheDocument();
});

test("should be able to allow display empty location selected message", () => {
  setup();
  const element = screen.getByText(/No locations selected./i);
  expect(element).toBeInTheDocument();
});

test("should be able to allow display results items", () => {
  setupWithData();
  const element = screen.getByText(/Toronto/i);
  expect(element).toBeInTheDocument();
});

test("should be able to allow display selected items", () => {
  setupWithData();
  const element = screen.getByText(/Selected \(1\)/i);
  expect(element).toBeInTheDocument();
});

test("should be able to allow click int result item", () => {
  setupWithData();
  setTimeout(() => {
    const item = screen.getByRole("button", { name: /Vancouver/i });
    fireEvent.click(item);

    const element = screen.getByText(/Selected \(1\)/i);
    expect(element).toBeInTheDocument();
  }, 100);
});
