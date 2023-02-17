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
} from "@mantine/core";
import Flag from "react-world-flags";
import {
  IconMessageCircle,
  IconAward,
  IconUser,
  IconSearch,
  IconMapPin,
} from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./Search.styles";
import { useFetchDestination } from "../../hooks/useFechDestinations";
import { DestinationInput } from "../DestinationInput";

export interface Country {
  [key: string]: CountryType;
}

interface CountryType {
  name: string;
  icon?: ReactElement<any, any> | null;
}

export interface CountryLocation {
  [key: string]: Array<CountryLocationType>;
}
export interface CountryLocationType {
  name: string;
  city?: string;
  state?: string;
  icon?: ReactElement<any, any> | null;
}

/**
 * Search component
 * @returns  JSX component
 */
export const Search: FC = () => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");
  const [countries, setCountries] = useState<Country>({});
  const [countryLocation, setCountryLocation] = useState<CountryLocation>({});

  const {
    data: destinationsData,
    isLoading: isLoadingDestinations,
    isError: isErrorDestinations,
  } = useFetchDestination();

  useEffect(() => {
    if (isErrorDestinations) {
    }
  }, [isErrorDestinations]);

  useEffect(() => {
    if (destinationsData?.data?.getAvailableFiltersForLanguageSearch) {
      const _locations =
        destinationsData.data.getAvailableFiltersForLanguageSearch?.locations;

      const _countries: Country = {};
      const _countryLocation: CountryLocation = {};
      _locations.forEach((element) => {
        if (element.name?.split(",")?.length === 1) {
          _countries[element.country] = {
            name: element.name.trim(),
            icon: <Flag code={element.country} height={14} />,
          };
          _countryLocation[element.country] = [];
        }
      });
      _locations.forEach((element) => {
        const nameSplit = element.name?.split(",") || [];
        if (
          nameSplit?.length > 1 &&
          _countryLocation[element.country]?.length >= 0
        ) {
          _countryLocation[element.country].push({
            name: element?.name,
            state: element?.name
              ? element?.name.replace(`${nameSplit[0]}, `, "")
              : "",
            city: nameSplit[0],
            icon: <IconMapPin size={22} stroke={1.5} />,
          });
        }
      });
      setCountries(_countries);
      setCountryLocation(_countryLocation);
    }
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
      <LoadingOverlay visible={isLoadingDestinations} overlayBlur={2} />
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
                />

                <TextInput
                  label="Provider"
                  placeholder="Search"
                  rightSection={<IconSearch size={20} stroke={1.5} />}
                  classNames={classes}
                  autoComplete="off"
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
    </>
  );
};
