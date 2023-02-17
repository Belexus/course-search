import { FC, ReactNode, useState } from "react";
import {
  Navbar,
  Group,
  Container,
  AppShell,
  Select,
  Anchor,
} from "@mantine/core";
import { IconSearch, IconChevronDown } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import { Header } from "../Header";
import { useStyles } from "./Layout.styles";

interface LayoutProps {
  children: ReactNode;
}
/**
 * Layout component
 *
 * @param { children } children components
 * @returns JSX component
 */
export const Layout: FC<LayoutProps> = ({ children }) => {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);

  const matches = useMediaQuery("(min-width: 900px)");

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Group align="stretch" spacing={0} noWrap>
          <Navbar
            hiddenBreakpoint="sm"
            hidden={!opened}
            height={"auto"}
            width={{ sm: 300 }}
            p="md"
          >
            <Navbar.Section grow>
              <Select
                placeholder="Search"
                searchable
                icon={<IconSearch size={20} stroke={1.5} />}
                rightSection={<IconChevronDown size={16} />}
                rightSectionWidth={32}
                styles={{
                  rightSection: { pointerEvents: "none" },
                  input: {
                    border: 0,
                    fontSize: 14,
                    fontWeight: 600,
                  },
                }}
                data={[]}
                mb="sm"
                aria-label="Search course"
              />
              <Anchor
                key="Course"
                href="#"
                className={cx(classes.link, {
                  [classes.linkActive]: true,
                })}
              >
                <span>Courses</span>
              </Anchor>
            </Navbar.Section>
            {!matches && (
              <Navbar.Section className={classes.footer}>
                <Anchor href="#">Back to Edvisor for Agents</Anchor>
              </Navbar.Section>
            )}
          </Navbar>
        </Group>
      }
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Container fluid>{children}</Container>
    </AppShell>
  );
};
