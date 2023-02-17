import { FC, useEffect, useState } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useDebouncedValue } from "@mantine/hooks";
import { useStyles } from "./DestinationInput.styles";
import { SearchModal } from "../SearchModal";
import type { Country, CountryLocation } from "../Search";

export interface LocationSelected {
  [key: string]: boolean;
}

interface DestinationInputProps {
  countries: Country;
  countryLocation: CountryLocation;
}

/**
 * Destination Input component
 * @param {
 *   countries,
 *   countryLocation,
 * }
 * @returns JSX component
 */
export const DestinationInput: FC<DestinationInputProps> = ({
  countries,
  countryLocation,
}) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const [destination, setDestination] = useState("");
  const [prevDestination, setPrevDestination] = useState("");
  const [debounced] = useDebouncedValue(destination, 400);
  const [locationsSelected, setLocationsSelected] = useState<LocationSelected>(
    {}
  );
  const [locations, setLocations] = useState<CountryLocation>();

  useEffect(() => {
    setLocations(countryLocation);
  }, [countryLocation]);

  useEffect(() => {
    if (opened) {
      populateResultList();
    }
  }, [debounced]);

  useEffect(() => {
    if (
      !opened &&
      locationsSelected &&
      Object.keys(locationsSelected).length > 0
    ) {
      setPrevDestination(destination);
      setDestination(`${Object.keys(locationsSelected).length} selected`);
    }
  }, [locationsSelected, opened]);

  const populateResultList = () => {
    const _countryLocation = { ...countryLocation };
    const locationsFind: CountryLocation = {};

    Object.keys(_countryLocation).filter((key: string) => {
      const locationList = _countryLocation[key].filter((item) => {
        return item?.name.toLowerCase().includes(destination.toLowerCase());
      });
      if (locationList?.length > 0) {
        locationsFind[key] = locationList;
      }
      return locationList?.length > 0;
    });
    setLocations(locationsFind);
  };

  const handleDestionationChange = (event: {
    currentTarget: { value: string };
  }) => {
    setDestination(event.currentTarget.value);
  };
  const handleDestionationBlur = () => {
    setOpened(true);
  };
  return (
    <div>
      <TextInput
        label="Destination"
        placeholder="Search"
        rightSection={<IconSearch size={20} stroke={1.5} />}
        value={destination}
        onChange={handleDestionationChange}
        onFocus={() => {
          setDestination(prevDestination);
          setOpened(true);
        }}
        onBlur={handleDestionationBlur}
        classNames={classes}
        autoComplete="off"
      />
      <SearchModal
        opened={opened}
        setOpened={setOpened}
        countries={countries}
        locations={locations}
        locationsSelected={locationsSelected}
        setLocationsSelected={setLocationsSelected}
      />
    </div>
  );
};
