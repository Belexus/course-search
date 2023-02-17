import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => {
  return {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      borderBottom: 0,
      padding: "0 12px",
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
      zIndex: 101,
    },
  };
});
