import React from "react";
import addFavButton from "./addFav.png";
import removeFavButton from "./removeFav.png";

const FavButton = ({ item, addFav, removeFav, isFav }) => {
  return (
    <>
      {isFav(item) ? (
        <button className="button" onClick={() => removeFav(item)}>
          <img src={removeFavButton} alt="Remove fav" />
        </button>
      ) : (
        <button className="button" onClick={() => addFav(item)}>
          <img src={addFavButton} alt="Add fav" />
        </button>
      )}
    </>
  );
};

export default FavButton;
