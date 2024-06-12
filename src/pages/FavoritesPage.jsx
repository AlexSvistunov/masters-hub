import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import useAuth from "../hooks/useAuth";
import CatalogCard from "../components/CatalogCard";
import { useEffect, useState } from "react";
import { URL } from "../utils/backend-url";

const FavoritesPage = () => {
  const [favList, setFavList] = useState([]);
  const { currentToken } = useAuth();

  const { token } = useAuth();
  const getFav = async () => {
    try {
      const response = await fetch(`${URL}/api/favorites/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });

      const data = await response.json();
      setFavList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFav();
  }, []);

  console.log(favList);

  return (
    <div>
      <Header />
      <Hero />
      <div className="container mx-auto">
        <Tabs />

        <div>
          {!token && (
            <div className="text-4xl text-center py-10">
              Авторизируйтесь, чтобы посмотреть избранное
            </div>
          )}

          <div className="p-10 flex flex-col gap-4">
            {favList.length ? (
              favList.map((favEl) => (
                <CatalogCard catalogItem={favEl} favList={favList} setFavList={setFavList} key={favEl.id} />
              ))
            ) : (
              <div className="text-4xl text-center">
                Ваше избранное пусто!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
