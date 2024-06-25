import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import useAuth from "../hooks/useAuth";
import CatalogCard from "../components/CatalogCard";
import { useEffect, useState } from "react";
import { URL } from "../utils/backend-url";
import { MoonLoader } from "react-spinners";
import EnrollModal from "../components/EnrollModal";

const FavoritesPage = () => {
  const [favList, setFavList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
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
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getFav();
    }, 1000)
  }, []);

  console.log(favList);

  return (
    <div>
      <Header />
      <Hero />
      <EnrollModal/>
      <div className="container mx-auto">
        <Tabs />

        <div className="">
          {!token && (
            <div className="text-4xl text-center py-10">
              Авторизируйтесь, чтобы посмотреть избранное
            </div>
          )}

          {isLoading ? <div className="flex items-center justify-center p-10"><MoonLoader color="#6a5bff" size={75}></MoonLoader></div>: (
            <div className="p-10 flex flex-col gap-4">
            
            {favList.length ? (
              favList.map((favEl) => (
                <CatalogCard item={favEl} items={favList} setItems={setFavList} key={favEl.id} keyword='fav' />
              ))
            ) : (
              <div className="text-4xl text-center">
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
