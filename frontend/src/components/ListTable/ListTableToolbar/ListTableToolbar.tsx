import React, { ChangeEvent } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./Style";
import GraphqlAutoComplete, {
  isAutoCompProps
} from "../../GraphqlAutoComplete/GraphqlAutoComplete";
import GraphqlSelector, {
  isSelectorProps
} from "../../GraphqlSelector/GraphqlSelector";
import { isSearchSelectorField, SearchFieldType } from "../../../types";

type PropsType = {
  title: string;
  numSelected: number;
  handleFilter(): void;
  handleBulkDeleteOpen?(): void;
  searchField?: SearchFieldType;
};

const ListTableToolbar: React.FC<PropsType> = ({
  title,
  numSelected,
  handleFilter,
  handleBulkDeleteOpen,
  searchField
}) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {title}
        </Typography>
      )}

      {numSelected === 0 && searchField
        ? searchField.map((param, idx) => {
            if (isSelectorProps(param)) {
              return <GraphqlSelector {...param} key={idx} />;
            } else if (isAutoCompProps(param)) {
              return <GraphqlAutoComplete {...param} key={idx} />;
            } else if (isSearchSelectorField(param)) {
              return (
                <form key={idx}>
                  <FormControl className={classes.formControl}>
                    <div className={classes.select}>
                      <Select
                        labelId={`${param.name}-select-label`}
                        id={`${param.name}-select`}
                        value={param.value}
                        onChange={(
                          event: ChangeEvent<{
                            name?: string | undefined;
                            value: unknown;
                          }>
                        ) => param.handleChange(event.target.value)}
                        autoWidth
                        variant="outlined"
                        className={classes.item}
                      >
                        <MenuItem value={0}>{param.blankText}</MenuItem>
                        {param.transList.map(({ value, text }, idx) => (
                          <MenuItem key={idx} value={value}>
                            {text}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                </form>
              );
            } else {
              return null;
            }
          })
        : null}
      {handleBulkDeleteOpen && numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleBulkDeleteOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Search">
          <IconButton
            aria-label="Search"
            onClick={handleFilter}
            color="primary"
            size="small"
            style={{ marginTop: "1em" }}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default ListTableToolbar;
