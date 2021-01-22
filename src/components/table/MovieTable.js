import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useMediaQuery } from "@material-ui/core";

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "black",
    color: "white",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function MovieTable({ release, votes, rating, budget }) {
  const matches = useMediaQuery("(max-width:950px)");
  var useStyles;
  if (matches) {
    useStyles = makeStyles({
      table: {
        width: 350,
      },
    });
  } else {
    useStyles = makeStyles({
      table: {
        width: 930,
      },
    });
  }

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Release</StyledTableCell>
            <StyledTableCell align="center">Rating</StyledTableCell>
            <StyledTableCell align="center">Votes</StyledTableCell>
            {budget > 0 && (
              <StyledTableCell align="center">Budget</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align="center">{release}</StyledTableCell>
            <StyledTableCell align="center">{rating}</StyledTableCell>
            <StyledTableCell align="center">{votes}</StyledTableCell>
            {budget > 0 && (
              <StyledTableCell align="center">${budget}</StyledTableCell>
            )}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
