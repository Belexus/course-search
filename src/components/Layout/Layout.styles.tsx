import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params) => {
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: 14,
      innerHeight: 36,
      color: "#2563EB",
      padding: `${theme.spacing.xs}px 36px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      "&:hover": {
        backgroundColor: "#F0F6FF",
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: "#F0F6FF",
      },
    },
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid #F0F6FF`,
    },
  };
});
