import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listBooks } from "../../store/actions/book";

const useStyles = makeStyles((theme) => ({
  SearchBar: {
    display: "flex",
    justifyContent: "center",
    flexGrow: "1",
  },
  SearchInputs: {
    margin: "15px",
  },
}));

const Books = () => {
  const classes = useStyles();
  const state = useSelector((state) => state.reducers);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  // COLUNMS

  const columns = [
    {
      id: "title",
      label: "Book Title",
      minWidth: 100,
      align: "center",
    },
    { id: "publisher", label: "Publisher", minWidth: 100, align: "center" },
    {
      id: "authors",
      label: "Authors",
      minWidth: 100,
      align: "center",
    },

    { id: "type", label: "Type", minWidth: 50, align: "center" },
    {
      id: "isbn",
      label: "ISBN",
      minWidth: 20,
      align: "center",
    },
    {
      id: "category",
      label: "Category",
      minWidth: 50,
      align: "center",
    },
    {
      id: "availableCopies",
      label: "Available Copies",
      minWidth: 20,
      align: "center",
    },
  ];

  //EFFECTS HOOKS

  useEffect(() => {
    dispatch(listBooks(`?Skip=0`));
  }, [dispatch]);

  useEffect(() => {
    dispatch(listBooks(`?Top=${rowsPerPage}`));
  }, [dispatch, rowsPerPage]);

  //FUNCTIONS

  const handleChangePage = (event, newPage) => {
    const skip = (parseInt(newPage + 1) - 1) * parseInt(rowsPerPage);
    dispatch(listBooks(`?Skip=${skip}`));
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTitleFilterChange = (event) => {
    if (event.target.value) dispatch(listBooks(`?Title=${event.target.value}`));
  };

  const handleAuthorFilterChange = (event) => {
    if (event.target.value)
      dispatch(listBooks(`?Author=${event.target.value}`));
  };

  return (
    <>
      <div className={classes.SearchBar}>
        <TextField
          id="title"
          name="title"
          placeholder="Type Book Title"
          variant="outlined"
          className={classes.SearchInputs}
          onChange={(event) => handleTitleFilterChange(event)}
        />

        <TextField
          id="author"
          name="author"
          variant="outlined"
          placeholder="Type Book Author"
          className={classes.SearchInputs}
          onChange={(event) => handleAuthorFilterChange(event)}
        />
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.bookReducer?.data?.length > 0 ? (
              state?.bookReducer?.data?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <>{column.format ? column.format(value) : value}</>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell>No Data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        className={classes.pagination}
        count={state.bookReducer.total ? parseInt(state.bookReducer.total) : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="rows per page"
      />
    </>
  );
};
export default Books;
