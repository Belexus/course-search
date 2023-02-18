import { createContext, useState, useEffect } from "react";
import type { CountryLocationType } from "../../components/Search";

export const AppContext = createContext<{
  locationsSelected: Array<CountryLocationType>;
  setLocationsSelected: Function;
  providersSelected: Array<CountryLocationType>;
  setProvidersSelected: Function;
  destinationModalOpened: boolean;
  setDestinationModalOpened: Function;
  providerModalOpened: boolean;
  setProviderModalOpened: Function;
}>({
  locationsSelected: [],
  setLocationsSelected: () => {},
  providersSelected: [],
  setProvidersSelected: () => {},
  destinationModalOpened: false,
  setDestinationModalOpened: () => {},
  providerModalOpened: false,
  setProviderModalOpened: () => {},
});

export const AppContextProvider = ({ children }: any) => {
  const [locationsSelected, setLocationsSelected] = useState([]);
  const [providersSelected, setProvidersSelected] = useState([]);
  const [destinationModalOpened, setDestinationModalOpened] = useState(false);
  const [providerModalOpened, setProviderModalOpened] = useState(false);

  useEffect(() => {
    if (locationsSelected?.length > 0) {
      const _providersSelected = providersSelected.filter(
        (provider: CountryLocationType) => {
          return (
            locationsSelected.findIndex(
              (location: CountryLocationType) =>
                location.id === provider.locationId
            ) >= 0
          );
        }
      );
      setProvidersSelected(_providersSelected);
    }
  }, [locationsSelected]);

  return (
    <AppContext.Provider
      value={{
        locationsSelected,
        setLocationsSelected,
        providersSelected,
        setProvidersSelected,
        destinationModalOpened,
        setDestinationModalOpened,
        providerModalOpened,
        setProviderModalOpened,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
