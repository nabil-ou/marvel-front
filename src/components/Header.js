import React from "react";
import Logo from "./logo-marvel.jpg";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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

const useStylesMenu = makeStyles((theme) => ({
  root: {
    "& > *": {
      padding: "0px 0px 0px 35%",
      position: "fixed",
      zIndex: "999",
      width: "100%",
    },
  },
}));

const Header = ({ menu, setMenu, hasFav }) => {
  const classMenu = useStylesMenu();

  const handleChangeMenu = (event, newValue) => {
    setMenu(newValue);
  };
  return (
    <div className="header">
      <div className={classMenu.root}>
        <ThemeProvider theme={theme}>
          <Paper square>
            <Tabs
              value={menu}
              indicatorColor="secondary"
              textColor="primary"
              onChange={handleChangeMenu}
            >
              <Tab label="Characters" to="/" component={Link} />
              <Tab label="Comics" to="/comics" component={Link} />
              {hasFav() && (
                <Tab label="Favorites" to="/favorites" component={Link} />
              )}
            </Tabs>
          </Paper>
        </ThemeProvider>
      </div>
      <div>
        <img className="logo" alt="logo" src={Logo} />
      </div>
    </div>
  );
};

export default Header;
