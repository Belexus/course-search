import { FC } from "react";
import {
  Header as HeaderMantine,
  Title,
  Burger,
  MediaQuery,
  Anchor,
  ActionIcon,
  Flex,
} from "@mantine/core";
import { IconStar } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./Header.styles";

interface HeaderProps {
  opened: boolean;
  setOpened: Function;
}
/**
 * Header component
 * @param { opened, setOpened }
 * @returns  JSX component
 */
export const Header: FC<HeaderProps> = ({ opened, setOpened }) => {
  const { classes } = useStyles();
  const matches = useMediaQuery("(min-width: 900px)");

  return (
    <HeaderMantine height={60} className={classes.header}>
      <Flex gap="md" align="center">
        <ActionIcon
          bg="#F0F6FF"
          size={36}
          radius="md"
          variant="filled"
          aria-label="Go to Home"
        >
          <IconStar size={36} fill="#60A5FA" stroke={0} />
        </ActionIcon>
        <Title size={14} color="#1F2937" fw={600}>
          Estudiar - Mexico City
        </Title>
      </Flex>
      {matches && (
        <Anchor href="#" color="#2563EB" fw={500}>
          Back to Edvisor for Agents
        </Anchor>
      )}
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o: boolean) => !o)}
          size="sm"
          color="#60A5FA"
        />
      </MediaQuery>
    </HeaderMantine>
  );
};
