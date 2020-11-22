import React from "react";
import Card from "../components/Card";
import { useHistory } from "react-router-dom";

const Favorites = ({ setMenu, storage, addFav, removeFav, isFav }) => {
  setMenu(2);
  const comics = [];
  const characters = [];
  let history = useHistory();

  for (const value in storage) {
    if (storage[value].indexOf("comic") !== -1)
      comics.push(JSON.parse(storage[value]));
  }

  for (const value in storage) {
    if (storage[value].indexOf("character") !== -1)
      characters.push(JSON.parse(storage[value]));
  }

  return (
    <>
      {characters.length === 0 && comics.length === 0 ? (
        history.push("/")
      ) : (
        <div className="container">
          {characters.length > 0 && (
            <>
              <h2>My favorites characters</h2>
              <hr />

              {characters.map((item, index) => {
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
            </>
          )}
          {comics.length > 0 && (
            <>
              <h2>My favorites comics</h2>
              <hr />

              {comics.map((item, index) => {
                return (
                  <Card
                    key={index}
                    item={item}
                    type="comic"
                    addFav={addFav}
                    removeFav={removeFav}
                    isFav={isFav}
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Favorites;
