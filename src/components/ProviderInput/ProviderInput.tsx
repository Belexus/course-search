import { FC, useEffect, useState, useContext } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useDebouncedValue } from "@mantine/hooks";
import { useStyles } from "./ProviderInput.styles";
import { SearchModal } from "../SearchModal";
import type { CountryLocationType } from "../Search";
import { AppContext } from "../../context/AppContext";

export interface ProviderSelected {
  [key: string]: boolean;
}

interface ProviderInputProps {
  providers: Array<CountryLocationType>;
  disabled?: boolean;
}

/**
 * Provider Input component
 * @param {
 *   providers,
 * }
 * @returns JSX component
 */
export const ProviderInput: FC<ProviderInputProps> = ({
  providers,
  disabled = false,
}) => {
  const { classes } = useStyles();
  const { providersSelected, setProvidersSelected } = useContext(AppContext);
  const [opened, setOpened] = useState(false);
  const [destination, setProvider] = useState("");
  const [prevProvider, setPrevProvider] = useState("");
  const [debounced] = useDebouncedValue(destination, 400);

  const [locations, setLocations] = useState<Array<CountryLocationType>>([]);

  useEffect(() => {
    setLocations(providers);
  }, [providers]);

  useEffect(() => {
    if (opened) {
      populateResultList();
    }
  }, [debounced]);

  useEffect(() => {
    if (
      !opened &&
      providersSelected &&
      Object.keys(providersSelected).length > 0
    ) {
      setPrevProvider(destination);
      setProvider(`${Object.keys(providersSelected).length} selected`);
    }
  }, [providersSelected, opened]);

  const populateResultList = () => {
    const _countryLocation = [...providers];

    const locationList = _countryLocation.filter((item) => {
      return item?.name.toLowerCase().includes(destination.toLowerCase());
    });

    setLocations(locationList);
  };

  const handleDestionationChange = (event: {
    currentTarget: { value: string };
  }) => {
    setProvider(event.currentTarget.value);
  };
  const handleDestionationBlur = () => {
    setOpened(true);
  };
  return (
    <div>
      <TextInput
        label="Provider"
        placeholder="Search"
        rightSection={<IconSearch size={20} stroke={1.5} />}
        value={destination}
        onChange={handleDestionationChange}
        onFocus={() => {
          setProvider(prevProvider);
          setOpened(true);
        }}
        onBlur={handleDestionationBlur}
        classNames={classes}
        autoComplete="off"
        disabled={disabled}
      />

      <SearchModal
        opened={opened}
        setOpened={setOpened}
        countries={{}}
        locations={locations}
        locationsSelected={providersSelected}
        setLocationsSelected={setProvidersSelected}
        emptyResultMessage="Enter a provider to see results."
        emptySelectMessage="No providers selected."
      />
    </div>
  );
};
