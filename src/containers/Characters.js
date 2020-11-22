import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import loader from "./loader.gif";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#79000f",
    },
    secondary: {
      main: "#000000",
    },
  },
});

const useStylesPagination = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      padding: "0px 0px 10px 35%",
    },
  },
}));

const Characters = ({ setMenu, addFav, removeFav, isFav, baseUrl }) => {
  const classPagination = useStylesPagination();
  const numItem = 100;
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState();
  setMenu(0);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const fetchDataSearch = async () => {
    const result = await axios.get(`${baseUrl}/charactersBySearch/${search}`);
    setData(result.data);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/characters/${page}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDataSearch();
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return isLoading ? (
    <div className="loader">
      <img src={loader} alt="Loading" />
    </div>
  ) : (
    <>
      <input
        type="search"
        placeholder="Search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        className="search"
      />
      {data.results.length > 0 ? (
        <>
          <div className={classPagination.root}>
            <ThemeProvider theme={theme}>
              <Pagination
                color="primary"
                count={Math.ceil(data.total / numItem)}
                page={page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
              />
            </ThemeProvider>
          </div>
          <div className="card-wrapper">
            {data.results.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  type="character"
                  addFav={addFav}
                  removeFav={removeFav}
                  isFav={isFav}
                />
              );
            })}
          </div>
          <div className={classPagination.root}>
            <ThemeProvider theme={theme}>
              <Pagination
                color="primary"
                count={Math.ceil(data.total / numItem)}
                page={page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
              />
            </ThemeProvider>
          </div>
        </>
      ) : (
        <div className="loader">
          <h2>No results</h2>
        </div>
      )}
    </>
  );
};

export default Characters;
