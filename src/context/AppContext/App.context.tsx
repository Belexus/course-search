import React, { useEffect } from "react";
import type { CountryLocationType } from "../../components/Search";

export const AppContext = React.createContext<{
  locationsSelected: Array<CountryLocationType>;
  setLocationsSelected: Function;
  providersSelected: Array<CountryLocationType>;
  setProvidersSelected: Function;
}>({
  locationsSelected: [],
  setLocationsSelected: () => {},
  providersSelected: [],
  setProvidersSelected: () => {},
});

export const AppContextProvider = ({ children }: any) => {
  const [locationsSelected, setLocationsSelected] = React.useState([]);
  const [providersSelected, setProvidersSelected] = React.useState([]);

  return (
    <AppContext.Provider
      value={{
        locationsSelected,
        setLocationsSelected,
        providersSelected,
        setProvidersSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
