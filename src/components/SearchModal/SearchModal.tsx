import { FC } from "react";
import {
  Text,
  Flex,
  Group,
  Button,
  Grid,
  Stack,
  Divider,
  Chip,
  ActionIcon,
  ScrollArea,
  Card,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useStyles } from "./SearchModal.styles";
import type {
  Country,
  CountryLocation,
  CountryLocationType,
} from "../Search/Search";
import type { LocationSelected } from "../DestinationInput";

interface SearchModalProps {
  opened: boolean;
  setOpened: Function;
  countries: Country;
  locations?: CountryLocation;
  locationsSelected: LocationSelected;
  setLocationsSelected: Function;
}

/**
 * Search Modal component
 * @returns  JSX component
 */
export const SearchModal: FC<SearchModalProps> = ({
  opened,
  setOpened,
  countries,
  locations,
  locationsSelected,
  setLocationsSelected,
}) => {
  const { classes, cx } = useStyles();

  if (!opened) {
    return <></>;
  }

  return (
    <Card
      shadow="sm"
      p={0}
      radius="md"
      withBorder
      style={{ width: 680, position: "absolute", marginTop: 4 }}
    >
      <Grid p={"xs"}>
        <Grid.Col span={7}>
          <Text fw={700}>Results</Text>
          <Stack
            justify="flex-start"
            mt="md"
            style={{ overflow: "auto", height: 300 }}
          >
            {!locations ||
              (Object.keys(locations).length === 0 && (
                <Text ml={8} fs={"xs"}>
                  Enter a destination to see results.
                </Text>
              ))}
            {locations &&
              Object.keys(locations).map((key: string) => (
                <>
                  <Flex
                    key={key}
                    role="button"
                    align={"center"}
                    justify="space-between"
                    onClick={() => {
                      const _locationsSelected = {
                        ...locationsSelected,
                      };
                      if (_locationsSelected[countries[key].name]) {
                        delete _locationsSelected[countries[key].name];
                      } else {
                        _locationsSelected[countries[key].name] = true;
                      }
                      setLocationsSelected(_locationsSelected);
                    }}
                    className={cx(classes.item, {
                      [classes.itemActive]:
                        locationsSelected[countries[key].name],
                    })}
                  >
                    <Flex align={"center"}>
                      {countries[key].icon}
                      <Text ml={8} fs={"xs"}>
                        {countries[key].name}
                      </Text>
                    </Flex>
                    {locationsSelected[countries[key].name] && (
                      <IconCheck
                        size={22}
                        stroke={1.5}
                        color="#2563EB"
                        style={{ marginRight: 8 }}
                      />
                    )}
                  </Flex>

                  {locations[key].map((location: CountryLocationType) => (
                    <>
                      <Flex
                        key={location.name}
                        role="button"
                        align={"center"}
                        justify="space-between"
                        m={0}
                        onClick={() => {
                          const _locationsSelected = {
                            ...locationsSelected,
                          };
                          if (
                            location?.name &&
                            _locationsSelected[location.name]
                          ) {
                            delete _locationsSelected[location.name];
                          } else {
                            _locationsSelected[location?.name || ""] = true;
                          }
                          setLocationsSelected(_locationsSelected);
                        }}
                        className={cx(classes.item, {
                          [classes.itemActive]:
                            locationsSelected[location.name],
                        })}
                      >
                        <Flex align={"center"}>
                          {location.icon}
                          <Flex direction={"column"}>
                            <Text ml={8} fs={"xs"}>
                              {location.city}
                            </Text>
                            <Text ml={8} fs={"xs"}>
                              {location.state}
                            </Text>
                          </Flex>
                        </Flex>
                        {locationsSelected[location.name] && (
                          <IconCheck
                            size={22}
                            stroke={1.5}
                            color="#2563EB"
                            style={{ marginRight: 8 }}
                          />
                        )}
                      </Flex>
                    </>
                  ))}
                </>
              ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={5} bg="#F9FAFB" m={0}>
          <Text fw={700} mb="md">{`Selected (${
            Object.keys(locationsSelected)?.length
          })`}</Text>
          <ScrollArea style={{ height: 300 }}>
            <Group>
              {!locationsSelected ||
                (Object.keys(locationsSelected).length === 0 && (
                  <Text ml={8} fs={"xs"}>
                    No locations selected.
                  </Text>
                ))}

              {locationsSelected &&
                Object.keys(locationsSelected).map((location) => (
                  <Chip
                    key={location}
                    color="#E5E7EB"
                    variant="filled"
                    radius="sm"
                    checked={false}
                  >
                    <Flex align={"center"} justify="center">
                      {location}
                      <ActionIcon
                        onClick={() => {
                          const _locationsSelected = {
                            ...locationsSelected,
                          };
                          delete _locationsSelected[location];
                          setLocationsSelected(_locationsSelected);
                        }}
                      >
                        <IconX size={16} stroke={2} />
                      </ActionIcon>
                    </Flex>
                  </Chip>
                ))}
            </Group>
          </ScrollArea>
        </Grid.Col>
      </Grid>
      <Divider />
      <Group position="right" m="lg">
        <Button
          variant="subtle"
          onClick={() => {
            setOpened(false);
            setLocationsSelected({});
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpened(false);
          }}
        >
          Confirm
        </Button>
      </Group>
    </Card>
  );
};
