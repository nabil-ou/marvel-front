import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Coverflow from "react-coverflow";
import FavButton from "../components/FavButton";
import "../descriptionItem.css";
import loader from "./loader.gif";

const Character = ({ setMenu, addFav, removeFav, isFav, baseUrl }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [itemToFav, setItemToFav] = useState({});
  setMenu(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/character/${id}`);
      const comics = await axios.get(`${baseUrl}/character/${id}/comics`);

      setData(response.data.results[0]);
      setItemToFav({
        id: response.data.results[0].id,
        type: "character",
        name: response.data.results[0].name,
        img:
          response.data.results[0].thumbnail.path +
          "." +
          response.data.results[0].thumbnail.extension,
      });

      setComics(comics.data.results);
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
        <h1>{data.name}</h1>
      </section>
      <div className="container-item">
        <div className="cardItem l-flex-child1">
          <img
            src={data.thumbnail.path + "." + data.thumbnail.extension}
            alt={data.name}
          />

          <div>
            <FavButton
              className="button"
              item={itemToFav}
              addFav={addFav}
              removeFav={removeFav}
              isFav={isFav}
            />
          </div>
        </div>
        <div className="description l-flex-child2">
          {data.description !== "" && (
            <div className="bulle">
              {data.description}
              <span className="tip"></span>
            </div>
          )}
          {comics.length > 0 && (
            <>
              <h2>Featured in</h2>
              <Coverflow
                width="960"
                height="250"
                displayQuantityOfSide={3}
                navigation={false}
                enableScroll={true}
                clickable={true}
                active={0}
              >
                {comics.map((item, index) => {
                  const imgSrc =
                    item.thumbnail.path + "." + item.thumbnail.extension;

                  return (
                    <img
                      src={imgSrc}
                      alt={item.title}
                      data-action={`/comic/${item.id}`}
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

export default Character;
