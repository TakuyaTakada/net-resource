import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: "150px",
      maxWidth: "210px",
      marginRight: theme.spacing(1)
    },
    selectLabel: {
      marginLeft: theme.spacing(2)
    },
    select: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "30%"
    }
  })
);

export default useStyles;
