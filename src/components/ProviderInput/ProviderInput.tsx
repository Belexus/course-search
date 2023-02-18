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
  const {
    providersSelected,
    setProvidersSelected,
    providerModalOpened,
    setProviderModalOpened,
    setDestinationModalOpened,
    locationsSelected,
  } = useContext(AppContext);
  const [provider, setProvider] = useState("");
  const [prevProvider, setPrevProvider] = useState("");
  const [debounced] = useDebouncedValue(provider, 400);

  const [locations, setLocations] = useState<Array<CountryLocationType>>([]);

  useEffect(() => {
    setLocations(providers);
  }, [providers]);

  useEffect(() => {
    if (providerModalOpened) {
      populateResultList(debounced);
    }
  }, [debounced, locationsSelected]);

  useEffect(() => {
    if (!providerModalOpened) {
      if (providersSelected?.length > 0) {
        setProvider(`${providersSelected.length} selected`);
      } else {
        setProvider("");
      }
    }
  }, [providersSelected, providerModalOpened]);

  const populateResultList = (provider: string) => {
    let _countryLocation = [...providers];
    if (locationsSelected?.length > 0) {
      _countryLocation = _countryLocation.filter((item: any) => {
        return (
          locationsSelected.findIndex(
            (location) => location.id === item.locationId
          ) >= 0
        );
      });
    }

    const locationList = _countryLocation.filter((item) => {
      return item?.name.toLowerCase().includes(provider.toLowerCase());
    });

    setLocations(locationList);
  };

  const handleDestionationChange = (event: {
    currentTarget: { value: string };
  }) => {
    setProvider(event.currentTarget.value);
  };
  const handleProviderBlur = () => {
    setProviderModalOpened(true);
    setDestinationModalOpened(false);
  };

  const handleProviderFocus = () => {
    setProvider(prevProvider);
    setProviderModalOpened(true);
    setDestinationModalOpened(false);
    if (locationsSelected?.length > 0) {
      populateResultList(prevProvider);
    }
  };

  return (
    <div>
      <TextInput
        label="Provider"
        placeholder="Search"
        rightSection={<IconSearch size={20} stroke={1.5} />}
        value={provider}
        onChange={handleDestionationChange}
        onFocus={handleProviderFocus}
        onBlur={handleProviderBlur}
        classNames={classes}
        autoComplete="off"
        disabled={disabled}
      />

      <SearchModal
        opened={providerModalOpened}
        setOpened={setProviderModalOpened}
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
