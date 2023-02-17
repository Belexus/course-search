import { FC, useState } from "react";
import {
  Text,
  Flex,
  Container,
  Tabs,
  Paper,
  Group,
  Button,
  TextInput,
  Modal,
  Grid,
  Stack,
  Divider,
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

/**
 * Search component
 * @returns  JSX component
 */
export const Search: FC = () => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");
  const [opened, setOpened] = useState(true);

  return (
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
        <Tabs defaultValue="language">
          <Tabs.List>
            <Tabs.Tab
              value="language"
              icon={
                <IconMessageCircle size={14} aria-label="Search by language" />
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
            <Flex ml="auto" justify="center" align="center">
              <IconUser size={20} style={{ marginRight: 8 }} />
              <Flag code="MX" height={14} />
              <Text ml={8}>Mexico, Onshore</Text>
            </Flex>
          </Tabs.List>

          <Tabs.Panel value="language" pt="xs">
            <Group position="apart" grow>
              <TextInput
                label="Destination"
                placeholder="Select destination"
                rightSection={<IconSearch size={20} stroke={1.5} />}
                classNames={classes}
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

              <Button leftIcon={<IconSearch size={18} />} size="md">
                Search
              </Button>
            </Group>
          </Tabs.Panel>

          <Tabs.Panel value="higherEd" pt="xs">
            <></>
          </Tabs.Panel>
        </Tabs>
      </Paper>
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
          <Grid.Col span={8}>
            <Text fw={700}>Results</Text>
            <Stack justify="flex-start">
              <Flex align={"center"}>
                <Flag code="AU" height={14} />
                <Text ml={8} fs={"xs"}>
                  Australia
                </Text>
              </Flex>
            </Stack>
          </Grid.Col>
          <Grid.Col span={4} bg="#F9FAFB" m={0}>
            <Text fw={700}>Selected (1)</Text>
          </Grid.Col>
        </Grid>
        <Divider />
        <Group position="right" m="lg">
          <Button variant="subtle">Cancel</Button>
          <Button variant="outline">Confirm</Button>
        </Group>
      </Modal>
    </Container>
  );
};
