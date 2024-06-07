import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import { Link } from "react-router-dom";
import { URL } from "../utils/backend-url";

const MiniCatalog = ({ setIsModalOpen }) => {
  
  const [catalogItems, setCatalogItems] = useState([]);

  console.log(catalogItems);
  const getCatalogItem = async () => {
    try {
      const reponse = await fetch(`${URL}/api/catalog/`);
      const data = await reponse.json();
      console.log(data);
      setCatalogItems(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCatalogItem();
  }, []);
  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Каталог</h2>
        <></>
        {["detail"] in catalogItems ? (
          <h2 className="text-center text-2xl my-3">
            Нет каталога, нужно его добавить
          </h2>
        ) : (
          <div className="cards grid gap-6 grid-cols-12">
            {catalogItems.map((catalogItem) => (
              <CatalogCard
                key={catalogItem.id}
                setIsModalOpen={setIsModalOpen}
                catalogItem={catalogItem}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center p-4">
          <Link className="btn" to="/catalog">
            Посмотреть все
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MiniCatalog;
