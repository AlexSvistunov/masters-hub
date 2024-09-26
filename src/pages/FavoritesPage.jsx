import Header from "../components/Header";
import Hero from "../components/sections/Hero";
import Tabs from "../components/ui/Tabs";
import CatalogCard from "../components/CatalogCard";

import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

import { MoonLoader } from "react-spinners";
import EnrollModal from "../components/EnrollModal";

import scrollToRef from "../utils/scrollToRef";

import { getFav } from "../service/FavoriteService";

const FavoritesPage = () => {
  const { currentToken, token } = useAuth();

  const [step, setStep] = useState(0);
  const location = useLocation();
  const ref = useRef();

  const [getFavorites, isLoading, error, favList, setData] = useFetch(() =>
    getFav(currentToken)
  );

  useEffect(() => {
    if (token) {
      getFavorites();
    }
  }, [token]);

  useEffect(() => {
    if (location.state === "dropdown") {
      scrollToRef(ref);
    }
  }, [location]);

  return (
    <div>
      <Header />
      <Hero />
      <EnrollModal step={step} setStep={setStep} />
      <div className="mx-auto min-h-screen">
        <Tabs />
        <div className="" ref={ref}>
          {!token ? (
            <div className="text-4xl text-center py-10">
              Авторизируйтесь, чтобы посмотреть избранное
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center p-10">
              <MoonLoader color="#6a5bff" size={75}></MoonLoader>
            </div>
          ) : error ? (
            <p className="text-xl text-center">{error}</p>
          ) : (
            <div className="p-10 flex flex-col gap-4">
              {favList.map((favEl) => (
                <CatalogCard
                  item={favEl}
                  items={favList}
                  setItems={setData}
                  key={favEl.id}
                  keyword="fav"
                />
              ))}

              {favList.length === 0 && (
                <div className="tablet:text-4xl text-xl text-center">
                  Ваше избранное пусто!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
