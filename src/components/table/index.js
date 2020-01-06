import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { stableSort, getSorting } from "../../helpers/sorting";
import PriceCell from "../price_cell";

import TableHead from "../table_header";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  }
}));

const TableComponent = ({ rows, values, handleChange, sort }) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  useEffect(() => {
    if (sort) {
      const [orderByGlobal, orderGlobal] = Object.entries(sort)[0];

      setOrder(orderGlobal);
      setOrderBy(orderByGlobal);
    }
  }, [sort]);

  const handleRequestSort = (_, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            size="small"
            aria-labelledby="tableTitle"
          >
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy)).map(row => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell>{row.internal_id}</TableCell>
                    <TableCell>
                      <img
                        src={row.exterior_images[0]["fill-320x240"]}
                        alt={row.name}
                        width="80px"
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <PriceCell
                        values={values}
                        handleChange={handleChange}
                        name={`price/${row.internal_id}`}
                        value={row.price}
                      />
                    </TableCell>
                    <TableCell>{row.living_area_total}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

export default TableComponent;
