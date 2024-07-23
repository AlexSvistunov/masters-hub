import { useEffect, useState } from "react";
import { URL } from "../utils/backend-url";
import CatalogCard from "./CatalogCard";

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);
  const getPopular = async () => {
    try {
      const response = await fetch(`${URL}/api/popular/`);
      const data = await response.json();
      setPopularItems(data);
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
          {popularItems?.length ? 
            popularItems?.map((popularItem) => (
              <CatalogCard
                key={popularItem.id}
                item={popularItem}
                items={popularItems}
                setItems={setPopularItems}
              />
            )) : null }
        </div>
      </div>
    </section>
  );
};

export default Popular;
