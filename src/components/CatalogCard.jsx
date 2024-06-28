import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { URL } from "../utils/backend-url";
import { addToFav } from "../store/slices/favSlice";
import { deleteFromFav } from "../store/slices/favSlice";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setId } from "../store/slices/modalSlice";

const CatalogCard = ({ token, item, items, setItems, keyword }) => {
  const { currentToken } = useAuth();
  const dispatch = useDispatch();


  const averageRating = item?.reviews?.average_rating;
  const formattedRating =
    averageRating % 1 === 0 ? averageRating + ".0" : averageRating;

  return (
    <div className="col-span-2 tablet:col-span-4 p-4 rounded-xl bg-base-200 flex flex-col relative min-h-44">
      <Link className="absolute inset-0" to={`/profile/${item?.id}`} />
      <div className="flex items-center gap-5 mb-5">
        <img
          className="w-12 h-12 tablet:w-16 tablet:h-16 rounded-lg"
          src={`/backend/masterhub${item?.photo}`}
        ></img>
        <div className="flex flex-col gap-1">
          <span className="tablet:text-xl">{item?.name}</span>
          <span className="text-xs tablet:text-base">{item?.address?.length > 20 && keyword !== 'profile'  ? item?.address?.slice(0, 20) + '...' : item?.address}</span>
        </div>
      </div>
      <footer className="flex justify-between mt-auto">
        <div className="flex items-center">
          {formattedRating === "нет отзывов" ? (
            <span>Нет отзывов</span>
          ) : (
            <div className="flex gap-1 items-center rounded-xl bg-base-300 px-3 py-2">
              <img
                className="h-3 w-3"
                src="https://dikidi.ru/assets/images/catalog/star.png"
              ></img>
              <div className="flex items-center gap-2">
                {formattedRating}
                <span>{`(${item?.reviews?.count})`}</span>
              </div>
            </div>
          )}
        </div>
        <button
          className="btn btn-primary relataive z-10"
          onClick={() => {
            dispatch(openModal());
            dispatch(setId({ id: item?.id }));
          }}
        >
          Записаться
        </button>
      </footer>

      <button
        className="absolute top-4 right-4 w-7 h-7 flex justify-center items-center py-1 px-1 box-content group"
        onClick={() => {
          if(item?.is_favorite || item?.is_favorites) {
            if (keyword === "fav") {
              dispatch(deleteFromFav({ currentToken, id: item?.id })).then(
                (data) => {
                  setItems(data.payload);
                }
              );
            }

            if(keyword === 'profile') {
              console.log('write code here');
            }

            if(!keyword) {
              dispatch(deleteFromFav({ currentToken, id: item?.id })).then(
                (data) => {
                  const newItem = {
                    ...item,
                    is_favorite: !item?.is_favorite,
                  };
        
                  const newItems = items.map((el) => {
                    if (el.id === item?.id) {
                      return newItem;
                    }
        
                    return el;
                  });
        
                  setItems(newItems);
                }
              );
            }
          } else {
            if (keyword === "profile") {
              console.log('FIX CODE HERE');
              dispatch(addToFav({ currentToken, id: item?.id })).then(
                (data) => {
                  console.log("FROM PROFILE");
                  console.log("DATA!!!", data);
                  const updatedItem = data?.payload?.find(
                    (profileItem) => profileItem?.id === item?.id
                  );

                  console.log('ITEM', updatedItem);
        
                  setItems(updatedItem);
                }
              );
            } 
            
            if(!keyword) {
              dispatch(addToFav({ currentToken, id: item?.id })).then(
                (data) => {
                  const updatedItem = data.payload.find(
                    (favItem) => favItem?.id === item?.id
                  );
        
                  const updatedItems = items.map((existingItem) => {
                    if (existingItem?.id === updatedItem?.id) {
                      return updatedItem;
                    }
                    return existingItem;
                  });
        
                  setItems(updatedItems);
                }
              );
            }
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 group-hover:scale-110 transition-all"
          fill={
            item?.is_favorite || item?.is_favorites
              ? "rgb(99, 111, 228)"
              : "transparent"
          }
          viewBox="0 0 24 24"
          stroke={
            item?.is_favorite || item?.is_favorites
              ? "rgb(99, 111, 228)"
              : "currentColor"
          }
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
