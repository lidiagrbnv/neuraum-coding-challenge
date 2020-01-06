import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Hidden from "@material-ui/core/Hidden";

import { sortingSelect } from "../../ducks/sorting";

const useStyles = makeStyles(theme => ({
  label: {
    paddingBottom: "14px",
    marginRight: "20px"
  },
  root: {
    background: "white",
    zIndex: 999,
    position: "sticky",
    top: 0,
    left: 0,
    margin: "0 0 8px",
    boxShadow: "0 0 3px 2px rgba(0, 0, 0, 0.1)"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  holder: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-end",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end"
    }
  }
}));

const textSortOptions = [
  { value: "", label: "" },
  { value: "asc", label: "A - Z" },
  { value: "desc", label: "Z - A" }
];

const numberSortOptions = [
  { value: "", label: "" },
  { value: "asc", label: "0 - 100" },
  { value: "desc", label: "100 - 0" }
];

const selectData = [
  {
    name: "name",
    id: "name-native-simple",
    label: "Name",
    options: textSortOptions
  },
  {
    name: "price",
    id: "price-native-simple",
    label: "Price",
    options: numberSortOptions
  },
  {
    name: "living_area_total",
    id: "size-native-simple",
    label: "Size",
    options: numberSortOptions
  }
];

const SortingComponent = ({ sortingSelect: sortingSelectAction }) => {
  const initialState = {
    price: "",
    name: "",
    living_area_total: ""
  };
  const classes = useStyles();
  const [state, setState] = useState(initialState);

  const handleChange = name => event => {
    sortingSelectAction({ [name]: event.target.value });
    setState({
      ...initialState,
      [name]: event.target.value
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.holder}>
        <Hidden xsDown>
          <span className={classes.label}>Sort all by</span>
        </Hidden>
        {selectData.map(({ name, id, label, options }) => (
          <FormControl key={name} className={classes.formControl}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Select
              native
              value={state[name]}
              onChange={handleChange(name)}
              inputProps={{
                name,
                id
              }}
            >
              {options.map(({ value, label: optionLabel }) => (
                <option key={optionLabel} value={value}>
                  {optionLabel}
                </option>
              ))}
            </Select>
          </FormControl>
        ))}
      </div>
    </div>
  );
};

export default connect(
  null,
  { sortingSelect }
)(SortingComponent);
