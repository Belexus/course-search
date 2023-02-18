import { FC, useState, useEffect } from "react";
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
  Loader,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useStyles } from "./SearchModal.styles";
import type { Country, CountryLocationType } from "../Search/Search";
import { useMediaQuery } from "@mantine/hooks";
import InfiniteScroll from "react-infinite-scroller";

interface SearchModalProps {
  opened: boolean;
  setOpened: Function;
  countries: Country;
  locations: Array<CountryLocationType>;
  locationsSelected: Array<CountryLocationType>;
  setLocationsSelected: Function;
  emptyResultMessage?: string;
  emptySelectMessage?: string;
}

const MAX_ITEMS = 50;
/**
 * Search Modal component
 * @param {
 *   opened,
 *   setOpened,
 *   countries,
 *   locations,
 *   locationsSelected,
 *   setLocationsSelected,
 * }
 * @returns JSX component
 */
export const SearchModal: FC<SearchModalProps> = ({
  opened,
  setOpened,
  locations,
  locationsSelected,
  setLocationsSelected,
  emptyResultMessage,
  emptySelectMessage,
}) => {
  const { classes, cx } = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");
  const [items, setItems] = useState<Array<CountryLocationType>>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [itemsSelected, setItemsSelected] = useState<
    Array<CountryLocationType>
  >([]);

  useEffect(() => {
    fetchData(1);
  }, [locations]);

  useEffect(() => {
    if (opened) {
      setItemsSelected(locationsSelected);
    }
  }, [opened, locationsSelected]);

  const fetchData = (page: number) => {
    let _items = [...items];
    if (locations?.length > 0) {
      const newItems = locations.slice(
        MAX_ITEMS * (page - 1),
        MAX_ITEMS * (page - 1) + MAX_ITEMS
      );

      if ((page - 1) * MAX_ITEMS >= locations.length) {
        setHasMoreItems(false);
      } else {
        setHasMoreItems(true);
      }
      if (page === 1) {
        _items = [];
      }
      setItems([..._items, ...newItems]);
    }
  };

  const handleResultItemClick = (location: CountryLocationType) => {
    let _locationsSelected = [...itemsSelected];
    if (
      _locationsSelected.findIndex((element) => element.id === location.id) >= 0
    ) {
      _locationsSelected = _locationsSelected.filter(
        (element) => element.id !== location.id
      );
    } else {
      _locationsSelected.push(location);
    }
    setItemsSelected(_locationsSelected);
  };

  const handleSelectItemClick = (location: CountryLocationType) => {
    let _locationsSelected = [...itemsSelected];
    _locationsSelected = _locationsSelected.filter(
      (element) => element.id !== location.id
    );
    setItemsSelected(_locationsSelected);
  };

  if (!opened) {
    return <></>;
  }

  return (
    <Card
      shadow="sm"
      p={0}
      m={0}
      radius="md"
      withBorder
      style={{
        width: "100%",
        maxWidth: matches ? 680 : "calc(100vw - 46px)",
        position: "absolute",
        marginTop: 4,
        zIndex: 9,
      }}
    >
      <Grid p={"xs"}>
        <Grid.Col span={7}>
          <Text fw={700}>Results</Text>
          <Stack
            justify="flex-start"
            mt="md"
            style={{ overflow: "auto", height: 300 }}
          >
            {locations?.length > 0 && (
              <InfiniteScroll
                pageStart={0}
                threshold={100}
                loadMore={fetchData}
                height={300}
                width={"100%"}
                hasMore={hasMoreItems}
                useWindow={false}
                loader={
                  <Flex align="center" justify="center">
                    <Text mr="sm" mt="sm" fw={600} fs="xs">
                      Loading data...
                    </Text>
                    <Loader size="xs" />
                  </Flex>
                }
              >
                {items &&
                  items.map((location: CountryLocationType, index: number) => (
                    <div key={location.id}>
                      <Flex
                        key={index}
                        role="button"
                        align={"center"}
                        justify="space-between"
                        m={0}
                        onClick={() => handleResultItemClick(location)}
                        className={cx(classes.item, {
                          [classes.itemActive]:
                            itemsSelected.findIndex(
                              (element) => element.id === location.id
                            ) >= 0,
                        })}
                      >
                        <Flex align={"center"}>
                          {location.icon}
                          <Flex direction={"column"} style={{ width: 280 }}>
                            <Text ml={8} fs={"xs"} truncate>
                              {location.city || location.name}
                            </Text>
                            {location.state && (
                              <Text ml={8} fs={"xs"} truncate>
                                {location.state}
                              </Text>
                            )}
                          </Flex>
                        </Flex>
                        {itemsSelected.findIndex(
                          (element) => element.id === location.id
                        ) >= 0 && (
                          <IconCheck
                            size={22}
                            stroke={1.5}
                            color="#2563EB"
                            style={{ marginRight: 8 }}
                          />
                        )}
                      </Flex>
                    </div>
                  ))}
              </InfiniteScroll>
            )}

            {!(locations?.length > 0) && (
              <Text ml={8} fs={"xs"}>
                {emptyResultMessage}
              </Text>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={5} bg="#F9FAFB" m={0}>
          <Text fw={700} mb="md">{`Selected (${itemsSelected?.length})`}</Text>
          <ScrollArea style={{ height: 300 }}>
            <Group>
              {!itemsSelected ||
                (itemsSelected?.length === 0 && (
                  <Text ml={8} fs={"xs"}>
                    {emptySelectMessage}
                  </Text>
                ))}

              {itemsSelected &&
                itemsSelected.map((location, index) => (
                  <Chip
                    key={index}
                    color="#E5E7EB"
                    variant="filled"
                    radius="sm"
                    checked={false}
                  >
                    <Flex align={"center"} justify="center">
                      {location?.name}
                      <ActionIcon
                        onClick={() => handleSelectItemClick(location)}
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
            setItemsSelected([]);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setOpened(false);
            setLocationsSelected([...itemsSelected]);
            setItemsSelected([]);
          }}
        >
          Confirm
        </Button>
      </Group>
    </Card>
  );
};
