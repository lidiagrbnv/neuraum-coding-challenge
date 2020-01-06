import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { fetchData } from "./ducks/data";
import Table from "./components/table";
import SortPanel from "./components/sort_panel";

import "./App.css";

const useStyles = makeStyles(theme => ({
  buttonHolder: {
    padding: "0 16px"
  }
}));

const App = ({
  fetchData: fetchDataAction,
  vendorHouses,
  loading,
  tableSorting
}) => {
  useEffect(() => {
    fetchDataAction();
  }, [fetchDataAction]);
  const classes = useStyles();

  if (loading) return <CircularProgress />;

  if (!vendorHouses) return <h1>No house data!</h1>;

  const handleSubmit = val => {
    const update = Object.entries(val)
      .filter(i => i[1])
      .reduce((obj, [key, value]) => {
        const [newKey, id] = key.split("/");

        return [
          ...obj,
          {
            id,
            [newKey]: value
          }
        ];
      }, []);

    console.log({ update });
  };

  return (
    <div className="table-page">
      <SortPanel />
      <main className="table-wrapper" role="main">
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
          render={({ handleSubmit, handleChange, handleBlur, values }) => (
            <form onSubmit={handleSubmit}>
              {Object.values(vendorHouses).map(
                ({
                  vendor_verbose: { display_name: displayName, logo },
                  houses
                }) => (
                  <article className="table-holder" key={displayName}>
                    <header className="table-header">
                      <img
                        className="table-logo"
                        src={logo.original}
                        alt={displayName}
                      />
                      <h3>{displayName}</h3>
                    </header>
                    <div className="table-area">
                      <Table
                        handleChange={handleChange}
                        values={values}
                        rows={Object.values(houses)}
                        sort={tableSorting}
                      />
                    </div>
                  </article>
                )
              )}
              <Grid
                className={classes.buttonHolder}
                container
                justify="flex-end"
              >
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Grid>
            </form>
          )}
        />
      </main>
    </div>
  );
};

const mapStateToProps = ({
  houseData: { vendorHouses, loading },
  sorting: { tableSorting }
}) => ({ vendorHouses, loading, tableSorting });

export default connect(
  mapStateToProps,
  { fetchData }
)(App);
