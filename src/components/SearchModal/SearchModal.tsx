import { FC, useState } from "react";
import {
  Text,
  Flex,
  Group,
  Button,
  Modal,
  Grid,
  Stack,
  Divider,
  Chip,
  ActionIcon,
  ScrollArea,
} from "@mantine/core";
import Flag from "react-world-flags";
import { IconMapPin, IconX } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./SearchModal.styles";

interface SearchModalProps {
  opened: boolean;
  setOpened: Function;
  countries: any;
  locations: any;
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
}) => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");
  const [locationsSelected, setLocationsSelected] = useState<any>({});

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnEscape
      withCloseButton={false}
      padding={0}
      size={680}
      overlayOpacity={0}
      centered
    >
      <Grid p={"sm"}>
        <Grid.Col span={7}>
          <Text fw={700}>Results</Text>
          <Stack
            justify="flex-start"
            mt="md"
            style={{ overflow: "auto", height: 300 }}
          >
            {!locations && (
              <Text ml={8} fs={"xs"}>
                Enter a destination to see results.
              </Text>
            )}
            {locations &&
              Object.keys(locations).map((key: string) => (
                <>
                  <Flex align={"center"}>
                    <Flag code={locations[key][0]?.country} height={14} />
                    <Text ml={8} fs={"xs"}>
                      {countries[key]}
                    </Text>
                  </Flex>

                  {locations[key].map((location: any) => (
                    <>
                      <Flex
                        align={"center"}
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
                      >
                        <IconMapPin size={20} stroke={1.5} />
                        <Text ml={8} fs={"xs"}>
                          {location.name}
                        </Text>
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
              {Object.keys(locationsSelected).map((location) => (
                <Chip
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
        <Button variant="subtle" onClick={() => setOpened(false)}>
          Cancel
        </Button>
        <Button variant="outline">Confirm</Button>
      </Group>
    </Modal>
  );
};
