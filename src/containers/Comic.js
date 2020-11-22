import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Coverflow from "react-coverflow";
import FavButton from "../components/FavButton";
import "../descriptionItem.css";
import loader from "./loader.gif";

const Comic = ({ setMenu, addFav, removeFav, isFav, baseUrl }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [itemToFav, setItemToFav] = useState({});

  setMenu(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Comic/${id}`);
      const characters = await axios.get(`${baseUrl}/Comic/${id}/characters`);

      setData(response.data.results[0]);
      setItemToFav({
        id: response.data.results[0].id,
        type: "character",
        name: response.data.results[0].title,
        img:
          response.data.results[0].thumbnail.path +
          "." +
          response.data.results[0].thumbnail.extension,
      });
      setCharacters(characters.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loader">
      <img src={loader} alt="Loading" />
    </div>
  ) : (
    <>
      <section>
        <h1>{data.title}</h1>
      </section>
      <div className="container-item">
        <div className="cardItem l-flex-child1">
          <img
            src={data.thumbnail.path + "." + data.thumbnail.extension}
            alt={data.title}
          />
          <div>
            <FavButton
              item={itemToFav}
              addFav={addFav}
              removeFav={removeFav}
              isFav={isFav}
            />
          </div>
        </div>

        <div className="description l-flex-child2">
          {data.description !== null && (
            <div className="bulle">
              {data.description}
              <span className="tip"></span>
            </div>
          )}
          {characters.length > 0 && (
            <>
              <h2>Featured characters</h2>
              <Coverflow
                width="960"
                height="250"
                displayQuantityOfSide={3}
                navigation={false}
                enableScroll={true}
                clickable={true}
                active={0}
              >
                {characters.map((item, index) => {
                  const imgSrc =
                    item.thumbnail.path + "." + item.thumbnail.extension;
                  return (
                    <img
                      src={imgSrc}
                      alt={item.name}
                      data-action={`/character/${item.id}`}
                    />
                  );
                })}
              </Coverflow>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Comic;
