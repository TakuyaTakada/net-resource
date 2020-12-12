import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import ListTableToolbar from "./ListTableToolbar/ListTableToolbar";
import { getSorting, stableSort } from "../utils";
import { LinearProgress, Paper, TableBody } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import useStyles from "./Style";
import ListTableHead from "./ListTableHead/ListTableHead";
import { gqlInput, headCellsType, Order, SearchFieldType } from "../../types";
import { useQuery } from "@apollo/react-hooks";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { TranslateType } from "../../const";
import { GetSites_getSites } from "../../graphql/queries/__generated__/GetSites";

type PropsType = {
  title: string;
  query: any;
  typename: string;
  headCells: headCellsType;
  handleFilter(): void;
  handleUpdateOpen(id: string): void;
  handleBulkDeleteOpen?(): void;
  searchInput: gqlInput;
  selected: string[];
  setSelected(selected: string[]): void;
  searchField: SearchFieldType;
  orderByCol: string;
  asc?: boolean;
  disableCheckbox?: boolean;
};

const ListTable: React.FC<PropsType> = ({
  title,
  query,
  typename,
  headCells,
  handleFilter,
  handleUpdateOpen,
  handleBulkDeleteOpen,
  searchInput,
  selected,
  setSelected,
  searchField,
  orderByCol,
  asc,
  disableCheckbox
}): JSX.Element => {
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = useState<Order>(asc ? "asc" : "desc");
  const [orderBy, setOrderBy] = useState(orderByCol);
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event: Object, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const { loading, error, data } = useQuery(query, {
    variables: searchInput
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>{`Error! ${error.message}`}</p>;
  if (!data) return <p>{"No Data"}</p>;

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data[typename].map((n: GetSites_getSites) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const getText = (transList: TranslateType, value: number): string | null => {
    const trans = transList.find(trans => trans.value === value);
    if (trans && trans.text) {
      return trans.text;
    }
    return null;
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, data[typename].length - page * rowsPerPage);

  return (
    <>
      <Paper className={classes.paper}>
        <ListTableToolbar
          title={title}
          numSelected={selected.length}
          handleFilter={handleFilter}
          handleBulkDeleteOpen={handleBulkDeleteOpen}
          searchField={searchField}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <ListTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data[typename].length}
              headCells={headCells}
              disableCheckbox={disableCheckbox}
            />
            <TableBody>
              {stableSort(data[typename], getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      {!disableCheckbox ? (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={event => handleClick(event, row.id)}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                      ) : null}
                      <TableCell padding="none">
                        <IconButton
                          color="primary"
                          onClick={() => handleUpdateOpen(row.id)}
                        >
                          <Info />
                        </IconButton>
                      </TableCell>
                      {headCells.map((headCell, idx) => {
                        if (headCell.translate) {
                          return (
                            <TableCell key={idx} align="left">
                              {headCell.link ? (
                                <Link
                                  className={classes.link}
                                  onClick={() =>
                                    history.push(headCell.link + row.id)
                                  }
                                >
                                  {getText(
                                    headCell.translate,
                                    row[headCell.id]
                                  )}
                                </Link>
                              ) : (
                                getText(headCell.translate, row[headCell.id])
                              )}
                            </TableCell>
                          );
                        } else if (headCell.nestId) {
                          return (
                            <TableCell key={idx} align="left">
                              {headCell.link ? (
                                <Link
                                  className={classes.link}
                                  onClick={() =>
                                    history.push(headCell.link + row.id)
                                  }
                                >
                                  {row[headCell.id]
                                    ? row[headCell.id][headCell.nestId]
                                    : ""}
                                </Link>
                              ) : row[headCell.id] ? (
                                row[headCell.id][headCell.nestId]
                              ) : (
                                ""
                              )}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={idx} align="left">
                              {headCell.link ? (
                                <Link
                                  className={classes.link}
                                  onClick={() =>
                                    history.push(headCell.link + row.id)
                                  }
                                >
                                  {row[headCell.id]}
                                </Link>
                              ) : (
                                row[headCell.id]
                              )}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data[typename].length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </>
  );
};

export default ListTable;
