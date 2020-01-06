import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import currency from "../../helpers/currency";

const useStyles = makeStyles(() => ({
  input: {
    maxWidth: 80
  },
  editIcon: {
    margin: "0 0 0 10px",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8"
    }
  }
}));

const PriceInput = withStyles(() => ({
  root: {
    "&": {
      marginTop: 8
    },
    "& .MuiInput-input": {
      fontSize: "0.875rem"
    }
  }
}))(TextField);

const PriceCell = ({ name, value, handleChange, values }) => {
  const classes = useStyles();
  const [isEditable, setEdit] = useState(false);

  const handleClick = () => {
    setEdit(!isEditable);
  };

  return (
    <Grid container alignItems="center" justify="space-between">
      {isEditable ? (
        <PriceInput
          className={classes.input}
          id={name}
          value={values[name] || values[name] === "" || value}
          onChange={handleChange}
          type="number"
          InputLabelProps={{
            shrink: true
          }}
          name={name}
          margin="normal"
        />
      ) : (
        currency(value)
      )}
      <Edit onClick={handleClick} className={classes.editIcon} />
    </Grid>
  );
};

export default PriceCell;
