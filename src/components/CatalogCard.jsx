import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { URL } from "../utils/backend-url";

const CatalogCard = ({ setIsModalOpen, catalogItem, token, favList, setFavList }) => {
  console.log('favList ->>> ', favList)
  const item = favList.find((el) => el.id === catalogItem.id);

  const addToFav = async () => {
    try {
      const response = await fetch(
        `${URL}/api/favorites/?id=${catalogItem.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const averageRating = catalogItem?.reviews?.average_rating;
  const formattedRating =
    averageRating % 1 === 0 ? averageRating + ".0" : averageRating;

  return (
    <div className="col-span-4 p-4 rounded-xl bg-base-200 flex flex-col relative">
      <Link className="absolute inset-0" to={`/profile/${catalogItem.id}`} />
      <div className="flex items-center gap-5 mb-5">
        <img
          className="w-16 h-16 rounded-lg"
          src="https://f1.dikidi.ru/c8/v7611/4q9bokl6bv.jpg?size=m"
        ></img>
        <div className="flex flex-col gap-1">
          <span className="text-xl">{catalogItem.name}</span>
          <span>{catalogItem.address}</span>
        </div>
      </div>
      <footer className="flex justify-between mt-auto">
        <div className="flex gap-1 items-center rounded-xl bg-base-300 px-3">
          <img
            className="h-3 w-3"
            src="https://dikidi.ru/assets/images/catalog/star.png"
          ></img>
          <div>
            {formattedRating}
            <span>{`(${catalogItem?.reviews?.count})`}</span>
          </div>
        </div>
        <button className="btn btn-primary">Записаться</button>
      </footer>

      <button
        className="absolute top-4 right-4"
        onClick={() => {
          addToFav().then((data) => {
            if (data?.error) {
              return;
            }

            setFavList(data)

           
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke={item ? "rgb(99, 111, 228)" : "currentColor"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default CatalogCard;
