import React from "react";
import { Link } from "react-router-dom";
import FavButton from "./FavButton";

const Card = ({ item, type, isFav, addFav, removeFav }) => {
  const name = type === "character" ? item.name : item.title;
  const imgSrc =
    item.thumbnail !== undefined
      ? item.thumbnail.path + "." + item.thumbnail.extension
      : item.img;
  let itemToFav = {};
  if (type === "character") {
    itemToFav = {
      id: item.id,
      type: type,
      name: name,
      img: imgSrc,
    };
  } else {
    itemToFav = {
      id: item.id,
      type: type,
      title: name,
      img: imgSrc,
    };
  }
  return (
    <div className={!isFav(item) ? "card" : "card fav"}>
      <Link
        className="link"
        to={
          type === "character" ? `/character/${item.id}` : `/comic/${item.id}`
        }
      >
        <img src={imgSrc} alt={name} />
        <span>{name}</span>
      </Link>
      <FavButton
        item={itemToFav}
        addFav={addFav}
        removeFav={removeFav}
        isFav={isFav}
      />
    </div>
  );
};

export default Card;
