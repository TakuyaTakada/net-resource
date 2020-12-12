import {
  createStyles,
  lighten,
  makeStyles,
  Theme
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    title: {
      flex: "1 1 60%",
      marginRight: theme.spacing(1)
    },
    formControl: {
      marginLeft: theme.spacing(1),
      flex: "1 1 30%",
      minWidth: 160
    },
    formControlLabel: {
      marginTop: theme.spacing(1)
    },
    select: {
      marginRight: theme.spacing(1),
      minWidth: 120
    },
    item: {
      marginRight: theme.spacing(1),
      width: "100%",
      height: 55
    }
  })
);

export default useStyles;
