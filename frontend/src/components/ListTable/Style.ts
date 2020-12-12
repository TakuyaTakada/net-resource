import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: "10%"
    },
    link: {
      cursor: "pointer"
    }
  })
);

export default useStyles;
