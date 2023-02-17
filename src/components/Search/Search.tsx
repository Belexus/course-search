import { FC, ReactElement, useEffect, useState } from "react";
import {
  Text,
  Flex,
  Container,
  Tabs,
  Paper,
  Group,
  Button,
  TextInput,
  LoadingOverlay,
  Modal,
  Notification,
} from "@mantine/core";
import Flag from "react-world-flags";
import {
  IconMessageCircle,
  IconAward,
  IconUser,
  IconSearch,
  IconMapPin,
  IconStack2,
  IconX,
} from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./Search.styles";
import { useFetchDestination } from "../../hooks/useFechDestinations";
import { DestinationInput } from "../DestinationInput";
import { ProviderInput } from "../ProviderInput";
import { Campus } from "../../services/destination";

export interface Country {
  [key: string]: CountryType;
}

interface CountryType {
  id: string;
  name: string;
  icon?: ReactElement<any, any> | null;
  country: string;
}

export interface CountryLocation {
  [key: string]: Array<CountryLocationType>;
}

export interface CountryLocationType {
  id: string;
  name: string;
  city?: string;
  state?: string;
  icon?: ReactElement<any, any> | null;
  country: string;
}

/**
 * Search component
 * @returns  JSX component
 */
export const Search: FC = () => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");
  const [countries, setCountries] = useState<Country>({});
  const [countryLocation, setCountryLocation] = useState<
    Array<CountryLocationType>
  >([]);
  const [providers, setProviders] = useState<Array<CountryLocationType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState(false);

  const {
    data: destinationsData,
    isLoading: isLoadingDestinations,
    isError: isErrorDestinations,
  } = useFetchDestination();

  useEffect(() => {
    if (isErrorDestinations) {
      setShowError(true);
    }
  }, [isErrorDestinations]);

  useEffect(() => {
    setIsLoading(true);
    if (destinationsData?.data?.getAvailableFiltersForLanguageSearch) {
      const _locations =
        destinationsData.data.getAvailableFiltersForLanguageSearch?.locations;

      const _countries: Country = {};

      const _countryLocationGroup: CountryLocation = {};
      _locations.forEach((element) => {
        if (element.name?.split(",")?.length === 1) {
          _countryLocationGroup[element.country] = [];
          _countries[element.country] = {
            id: element.id,
            name: element.name.trim(),
            icon: <Flag code={element.country} height={14} />,
            country: element.country,
          };
        }
      });
      _locations.forEach((element) => {
        const nameSplit = element.name?.split(",") || [];
        if (
          nameSplit?.length > 1 &&
          _countryLocationGroup[element.country]?.length >= 0
        ) {
          _countryLocationGroup[element.country].push({
            id: element.id,
            name: element?.name,
            state: element?.name
              ? element?.name.replace(`${nameSplit[0]}, `, "")
              : "",
            city: nameSplit[0],
            icon: <IconMapPin size={22} stroke={1.5} />,
            country: element.country,
          });
        }
      });
      const _countryLocation: Array<CountryLocationType> = [];

      Object.keys(_countryLocationGroup).forEach((key) => {
        _countryLocation.push(_countries[key]);
        _countryLocationGroup[key].sort(
          (a: CountryLocationType, b: CountryLocationType) =>
            a.name.localeCompare(b.name)
        );

        _countryLocationGroup[key].forEach((element: CountryLocationType) => {
          _countryLocation.push(element);
        });
      });
      setCountries(_countries);
      setCountryLocation(_countryLocation);

      const _providers =
        destinationsData.data.getAvailableFiltersForLanguageSearch?.campuses;

      const _providerLocation: Array<CountryLocationType> = [];

      _providers.forEach((element: Campus) => {
        const locationFind = _locations.find(
          (item) => item.id === element.location.id
        );
        let state = "";
        if (locationFind) {
          state = locationFind.name;
        }
        _providerLocation.push({
          id: element.id,
          name: element.name,
          city: element.name,
          state,
          icon: <IconStack2 size={22} stroke={1.5} color="#1c7ed6" />,
          country: element.location.country,
        });
      });

      _providerLocation.sort((a: CountryLocationType, b: CountryLocationType) =>
        a.country.localeCompare(b.country)
      );

      setProviders(_providerLocation);
    }
    setIsLoading(false);
  }, [destinationsData]);

  const UserCountry = () => {
    return (
      <>
        <IconUser size={20} style={{ marginRight: 8 }} />
        <Flag code="MX" height={14} />
        <Text ml={8}>Mexico, Onshore</Text>
      </>
    );
  };
  return (
    <>
      <LoadingOverlay
        visible={isLoadingDestinations || isLoading}
        overlayBlur={2}
      />
      <Container
        fluid
        style={{
          position: "relative",
          padding: matches ? 32 : 8,
        }}
      >
        <div
          style={{
            position: "absolute",
            height: 148,
            width: "100%",
            top: 0,
            left: 0,
            background: "linear-gradient(180deg, #F0F6FF 0%, #DBEAFE 100%)",
          }}
        ></div>
        <Paper shadow="md" p="md" pos="relative">
          {!matches && (
            <Flex mb="xs" justify="flex-end" align="center">
              <UserCountry />
            </Flex>
          )}
          <Tabs defaultValue="language">
            <Tabs.List>
              <Tabs.Tab
                value="language"
                icon={
                  <IconMessageCircle
                    size={14}
                    aria-label="Search by language"
                  />
                }
              >
                Language
              </Tabs.Tab>
              <Tabs.Tab
                value="higherEd"
                icon={<IconAward size={14} aria-label="Search by Higher Ed." />}
              >
                Higher Ed.
              </Tabs.Tab>
              {matches && (
                <Flex ml="auto" justify="center" align="center">
                  <UserCountry />
                </Flex>
              )}
            </Tabs.List>

            <Tabs.Panel value="language" pt="xs">
              <Group position="apart" grow={matches}>
                <DestinationInput
                  countries={countries}
                  countryLocation={countryLocation}
                  disabled={isLoadingDestinations}
                />
                <ProviderInput
                  providers={providers}
                  disabled={isLoadingDestinations}
                />

                <TextInput
                  label="Min. number of weeks"
                  defaultValue={4}
                  classNames={classes}
                  type="number"
                  autoComplete="off"
                />
                <Button
                  leftIcon={<IconSearch size={18} />}
                  size="md"
                  fullWidth={!matches}
                >
                  Search
                </Button>
              </Group>
            </Tabs.Panel>
            <Tabs.Panel value="higherEd" pt="xs">
              <></>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Container>

      <Modal
        opened={showError}
        centered
        withCloseButton={false}
        onClose={() => {}}
        padding={0}
      >
        <Notification
          icon={<IconX size={14} />}
          color="red"
          title="Course Search"
          onClose={() => setShowError(false)}
        >
          An error occurred while obtaining the information of the destinations.
        </Notification>
      </Modal>
    </>
  );
};
