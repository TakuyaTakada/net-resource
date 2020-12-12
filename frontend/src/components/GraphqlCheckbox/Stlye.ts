import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      padding: theme.spacing(1, 2)
    },
    list: {
      width: 200,
      height: 230,
      overflow: "auto"
    }
  })
);

export default useStyles;
