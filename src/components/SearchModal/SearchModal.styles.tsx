import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    padding: "8px 0",
    "&:hover": {
      backgroundColor: "#F0F6FF",
    },
    cursor: "pointer",
  },

  itemActive: {
    "&, &:hover": {
      backgroundColor: "#F0F6FF",
    },
  },
}));
