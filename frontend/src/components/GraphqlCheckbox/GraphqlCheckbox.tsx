import React from "react";
import { useQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";
import useStyles from "./Stlye";
import { Card, CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export type CheckboxProps = {
  title: string;
  checkedName: string;
  query: any;
  variables: { input: {} };
  typename: string;
  accessors: {
    value(d: {}): any;
    text(d: {}): any;
  };
  checked: any[];
  handleChecked(a: any): void;
};

const GraphqlCheckbox: React.FC<CheckboxProps> = ({
  title,
  checkedName,
  query,
  variables,
  typename,
  accessors,
  checked,
  handleChecked
}): JSX.Element => {
  const classes = useStyles();
  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    handleChecked(newChecked);
  };

  const { loading, error, data } = useQuery(query, {
    variables: variables || {}
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>No Data</p>;

  let items: { value: any; text: any }[] = [];
  try {
    items = data[typename].map((d: Object) => {
      const value = accessors.value(d);
      const text = accessors.text(d);
      if (!value) {
        throw new Error(`No value error ${JSON.stringify(data)}`);
      }
      if (!text) {
        throw new Error(`No text error ${JSON.stringify(data)}`);
      }
      return { value, text };
    });
  } catch (e) {
    return <span>{e.message}</span>;
  }

  return (
    <Card>
      <CardHeader className={classes.cardHeader} subheader={title} />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(({ value, text }) => {
          const labelId = `item-${text}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={text} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );
};

export default GraphqlCheckbox;
