import React, { ChangeEvent } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import useStyles from "./Style";

export type SelectorProps = {
  name: string;
  label?: string;
  blankText: string;
  query: any;
  variables: { input: {} };
  typename: string;
  value: string;
  accessors: {
    value(d: {}): any;
    text(d: {}): any;
  };
  handleChange(a: any): void;
};

export function isSelectorProps(arg: any): arg is SelectorProps {
  return arg !== null && typeof arg === "object" && arg.blankText && arg.query;
}

const GraphqlSelector: React.FC<SelectorProps> = ({
  name,
  label,
  blankText,
  query,
  variables,
  typename,
  value,
  accessors,
  handleChange
}): JSX.Element => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(query, {
    variables: variables || {}
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>No Data</p>;

  let options: { value: any; text: any }[] = [];
  try {
    options = data[typename].map((d: Object) => {
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
    <FormControl className={classes.formControl}>
      <div className={classes.select}>
        {label ? (
          <InputLabel id="select-label" className={classes.selectLabel}>
            {label}
          </InputLabel>
        ) : null}
        <Select
          labelId="select-label"
          id={name}
          value={value}
          onChange={(
            event: ChangeEvent<{ name?: string | undefined; value: unknown }>
          ) => handleChange(event.target.value)}
          variant="outlined"
          displayEmpty
          style={{ maxWidth: "200px", minWidth: "140px" }}
        >
          {blankText ? <MenuItem value="">{blankText}</MenuItem> : null}
          {options.map(({ value, text }, idx) => (
            <MenuItem key={idx} value={value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </div>
    </FormControl>
  );
};

export default GraphqlSelector;
