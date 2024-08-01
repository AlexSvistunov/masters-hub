import { useEffect, useState } from "react";
import URL from "../utils/backend-url";
import CatalogCard from "./CatalogCard";
import { useFetch } from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);
  const { currentToken } = useAuth();

  const [getPopular, isLoading, error] = useFetch(async () => {
    const headers = {};
    if (currentToken) {
      headers.Authorization = `Token ${currentToken}`;
    }

    const response = await fetch(`${URL}/api/popular/`, {
      method: "GET",
      headers,
    });

    const data = await response.json();
    setPopularItems(data);
  });


  useEffect(() => {
    getPopular();
  }, []);

  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Популярные</h2>
        {error && <h3 className="text-center text-2xl">{error}</h3>}
        <div className="cards grid gap-6 grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12">
          {isLoading
            ? [...Array(6)]?.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 col-span-4 rounded-xl min-h-44"
                >
                  <div className="h-full w-full bg-base-200 p-4 flex items-center flex-col skeleton">
                    <div className="flex items-center gap-5 mb-5 w-full">
                      <div className="skeleton h-16 w-16"></div>
                      <div className="flex flex-col gap-1">
                        <div className="skeleton w-40 h-5"></div>
                        <div className="skeleton w-40 h-5"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full mt-auto">
                      <div className="skeleton w-20 h-10"></div>
                      <div className="skeleton w-20 h-10"></div>
                    </div>
                  </div>
                </div>
              ))
            : popularItems?.map((popularItem) => (
                <CatalogCard
                  key={popularItem.id}
                  item={popularItem}
                  items={popularItems}
                  setItems={setPopularItems}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
