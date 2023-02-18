import { FC, useEffect, useState, useContext } from "react";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useDebouncedValue } from "@mantine/hooks";
import { useStyles } from "./DestinationInput.styles";
import { SearchModal } from "../SearchModal";
import type { Country, CountryLocationType } from "../Search";
import { AppContext } from "../../context/AppContext";

export interface LocationSelected {
  [key: string]: boolean;
}

interface DestinationInputProps {
  countries: Country;
  countryLocation: Array<CountryLocationType>;
  disabled?: boolean;
}

/**
 * Destination Input component
 * @param {
 *   countries,
 *   countryLocation,
 *   disabled
 * }
 * @returns JSX component
 */
export const DestinationInput: FC<DestinationInputProps> = ({
  countries,
  countryLocation,
  disabled = false,
}) => {
  const { classes } = useStyles();
  const {
    locationsSelected,
    setLocationsSelected,
    destinationModalOpened,
    setDestinationModalOpened,
    setProviderModalOpened,
  } = useContext(AppContext);

  const [destination, setDestination] = useState("");
  const [prevDestination, setPrevDestination] = useState("");
  const [debounced] = useDebouncedValue(destination, 400);

  const [locations, setLocations] = useState<Array<CountryLocationType>>([]);

  useEffect(() => {
    setLocations(countryLocation);
  }, [countryLocation]);

  useEffect(() => {
    if (destinationModalOpened && debounced !== prevDestination) {
      populateResultList(debounced);
    }
  }, [debounced]);

  useEffect(() => {
    if (!destinationModalOpened && locationsSelected?.length > 0) {
      setPrevDestination(destination);
      setDestination(`${locationsSelected?.length} selected`);
    }
  }, [locationsSelected, destinationModalOpened]);

  const populateResultList = (destination: string) => {
    const _countryLocation = [...countryLocation];

    const locationList = _countryLocation.filter((item) => {
      return item?.name.toLowerCase().includes(destination.toLowerCase());
    });
    setLocations(locationList);
  };

  const handleDestionationChange = (event: {
    currentTarget: { value: string };
  }) => {
    setDestination(event.currentTarget.value);
  };
  const handleDestionationBlur = () => {
    setDestinationModalOpened(true);
    setProviderModalOpened(false);
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
          setDestinationModalOpened(true);
          setProviderModalOpened(false);
        }}
        onBlur={handleDestionationBlur}
        classNames={classes}
        autoComplete="off"
        disabled={disabled}
      />
      <SearchModal
        opened={destinationModalOpened}
        setOpened={setDestinationModalOpened}
        countries={countries}
        locations={locations}
        locationsSelected={locationsSelected}
        setLocationsSelected={setLocationsSelected}
        emptyResultMessage="Enter a destination to see results."
        emptySelectMessage="No locations selected."
      />
    </div>
  );
};
