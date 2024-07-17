import { useEffect, useState } from "react";
import { URL } from "../utils/backend-url";
import CatalogCard from "./CatalogCard";

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);
  const getPopular = async () => {
    try {
      const response = await fetch(`${URL}/api/popular/`);
      const data = await response.json();
      setPopularItems(data.results);
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Популярные</h2>

        <div className="cards grid gap-6 grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12">
          {popularItems.length &&
            popularItems.map((popularItem) => (
              <CatalogCard
                key={popularItem.id}
                item={popularItem}
                items={popularItems}
                setItems={setPopularItems}
              />
            ))}
        </div>

        {/* <div className="flex gap-4">
          <div className="w-3/12">
            <div className="">
              <div className="mb-4">
                <img
                  className="rounded-lg block w-full h-full"
                  src="https://f1.dikidi.ru/c8/v7611/4q9bokl6bv.jpg?size=q"
                ></img>
              </div>

              <span className="block text-center text-xl">Beauty break</span>
            </div>
          </div>

          <div className="w-3/12">
            <div>
              <div className="mb-4">
                <img
                  className="rounded-lg block w-full h-full"
                  src="https://f1.dikidi.ru/c8/v7611/4q9bokl6bv.jpg?size=q"
                ></img>
              </div>

              <span className="block text-center text-xl">Beauty break</span>
            </div>
          </div>

          <div className="w-3/12">
            <div className="">
              <div className="mb-4">
                <img
                  className="rounded-lg block w-full h-full"
                  src="https://f1.dikidi.ru/c8/v7611/4q9bokl6bv.jpg?size=q"
                ></img>
              </div>

              <span className="block text-center text-xl">Beauty break</span>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Popular;
