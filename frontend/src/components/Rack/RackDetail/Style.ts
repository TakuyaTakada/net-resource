import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    },
    container: {
      marginTop: "10px",
      border: "1px solid lightgray",
      borderRadius: "2px"
    },
    list: {
      marginTop: "10px",
      marginBottom: "10px"
    },
    listItem: {
      border: "1px solid lightgray",
      backgroundColor: "white"
    },
    blank: {
      color: "gray"
    }
  })
);

export default useStyles;
