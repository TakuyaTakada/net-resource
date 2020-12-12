import React, { ChangeEvent } from "react";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export type AutoCompProps = {
  label?: string;
  query: any;
  variables: { input: Object };
  typename: string;
  value: string;
  accessor(a: Object): any;
  handleChange(a: any): void;
  handleAutoComplete(a: Object, b: any): void;
};

export function isAutoCompProps(arg: any): arg is AutoCompProps {
  return arg !== null && typeof arg === "object" && arg.handleAutoComplete;
}

const GraphqlAutoComplete: React.FC<AutoCompProps> = ({
  label,
  query,
  variables,
  typename,
  value,
  accessor,
  handleChange,
  handleAutoComplete
}): JSX.Element => {
  const { loading, error, data } = useQuery(query, {
    variables: variables || {}
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>{"No Data"}</p>;

  let options = [];
  try {
    options = data[typename].map((d: Object) => {
      const value = accessor(d);
      if (!value) {
        throw new Error(`No value error ${JSON.stringify(data)}`);
      }
      return value;
    });
  } catch (e) {
    return <span>{e.message}</span>;
  }

  return (
    <Autocomplete
      id={label}
      options={options}
      getOptionLabel={(option: string) => option}
      onChange={(event: ChangeEvent<{}>, value: string | null) =>
        handleAutoComplete(event, value)
      }
      style={{ width: "40%", marginRight: "1em" }}
      inputValue={value}
      disableClearable
      renderInput={params => (
        <TextField
          {...params}
          value={value}
          fullWidth
          onChange={event => handleChange(event.target.value)}
          style={{ minWidth: 100, marginRight: "1em" }}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default GraphqlAutoComplete;
