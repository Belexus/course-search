import { FC, useEffect, useState } from "react";
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
} from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./Search.styles";
import { useFetchDestination } from "../../hooks/useFechDestinations";
import { SearchModal } from "../SearchModal";

/**
 * Search component
 * @returns  JSX component
 */
export const Search: FC = () => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");
  const [opened, setOpened] = useState(false);
  const [countries, setCountries] = useState<any>();
  const [locations, setLocations] = useState<any>();

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

      const _countries: any = {};
      const countryLocation: any = {};
      _locations.forEach((element) => {
        if (element.name?.split(",")?.length === 1) {
          _countries[element.country] = element.name.trim();
          countryLocation[element.country] = [];
        }
      });
      _locations.forEach((element) => {
        const nameSplit = element.name?.split(",") || [];
        if (
          nameSplit?.length > 1 &&
          countryLocation[element.country]?.length >= 0
        ) {
          countryLocation[element.country].push(element);
        }
      });
      setCountries(_countries);
      setLocations(countryLocation);
    }
  }, [destinationsData]);

  return (
    <>
      <LoadingOverlay visible={isLoadingDestinations} overlayBlur={2} />
      <Container
        fluid
        style={{
          position: "relative",
          padding: 32,
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
              <IconUser size={20} style={{ marginRight: 8 }} />
              <Flag code="MX" height={14} />
              <Text ml={8}>Mexico, Onshore</Text>
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
                  <IconUser size={20} style={{ marginRight: 8 }} />
                  <Flag code="MX" height={14} />
                  <Text ml={8}>Mexico, Onshore</Text>
                </Flex>
              )}
            </Tabs.List>

            <Tabs.Panel value="language" pt="xs">
              <Group position="apart" grow={matches}>
                <TextInput
                  label="Destination"
                  placeholder="Select destination"
                  rightSection={<IconSearch size={20} stroke={1.5} />}
                  classNames={classes}
                  onBlur={() => {
                    setOpened(true);
                  }}
                />
                <TextInput
                  label="Provider"
                  placeholder="Select provider"
                  rightSection={<IconSearch size={20} stroke={1.5} />}
                  classNames={classes}
                />
                <TextInput
                  label="Min. number of weeks"
                  defaultValue={4}
                  classNames={classes}
                  type="number"
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
        <SearchModal
          opened={opened}
          setOpened={setOpened}
          countries={countries}
          locations={locations}
        />
      </Container>
    </>
  );
};
