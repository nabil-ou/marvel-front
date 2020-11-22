import React, { useState } from "react";
import "./App.css";
import Characters from "./containers/Characters";
import Comics from "./containers/Comics";
import Character from "./containers/Character";
import Comic from "./containers/Comic";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Favorites from "./containers/Favorites";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [menu, setMenu] = useState();
  const [storage, setStorage] = useState({ ...localStorage });

  const baseUrl = "https://marvel-back-nab.herokuapp.com";

  const addFav = (item) => {
    localStorage.setItem(item.id, JSON.stringify(item));
    setStorage({ ...localStorage });
  };

  const removeFav = (item) => {
    localStorage.removeItem(item.id);
    setStorage({ ...localStorage });
  };

  const isFav = (item) => {
    console.log(localStorage.getItem(item.id) !== null);
    return localStorage.getItem(item.id) !== null;
  };

  const hasFav = () => {
    for (const value in storage) {
      if (
        storage[value].indexOf("comic") !== -1 ||
        storage[value].indexOf("character")
      )
        return true;
    }
    return false;
  };

  return (
    <Router>
      <Header menu={menu} setMenu={setMenu} hasFav={hasFav} />
      <Switch>
        <Route path="/favorites">
          <Favorites
            setMenu={setMenu}
            storage={storage}
            addFav={addFav}
            removeFav={removeFav}
            isFav={isFav}
          />
        </Route>
        <Route path="/character/:id">
          <Character
            setMenu={setMenu}
            addFav={addFav}
            removeFav={removeFav}
            isFav={isFav}
            baseUrl={baseUrl}
          />
        </Route>
        <Route path="/comics">
          <Comics
            setMenu={setMenu}
            addFav={addFav}
            removeFav={removeFav}
            isFav={isFav}
            baseUrl={baseUrl}
          />
        </Route>
        <Route path="/comic/:id">
          <Comic
            setMenu={setMenu}
            addFav={addFav}
            removeFav={removeFav}
            isFav={isFav}
            baseUrl={baseUrl}
          />
        </Route>
        <Route path="/">
          <Characters
            setMenu={setMenu}
            addFav={addFav}
            removeFav={removeFav}
            isFav={isFav}
            baseUrl={baseUrl}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
