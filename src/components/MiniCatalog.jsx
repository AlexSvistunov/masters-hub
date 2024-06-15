import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import { Link } from "react-router-dom";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const MiniCatalog = ({ isModalOpen, setIsModalOpen, setId }) => {
  const [catalogItems, setCatalogItems] = useState([]);
  const { currentToken } = useAuth();
  const favList = useSelector(state => state.fav.favList)
  console.log(favList);
  console.log(catalogItems);

  const getCatalogItem = async () => {
    try {
      const reponse = await fetch(`${URL}/api/catalog/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await reponse.json();
      console.log(data);
      setCatalogItems(data.results);
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

        <div className="cards grid gap-6 grid-cols-12">
          {catalogItems.map((catalogItem) => (
            <CatalogCard
              key={catalogItem.id}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              token={currentToken}
              item={catalogItem}
  
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Link className="btn my-4" to="/catalog">
            Посмотреть все
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MiniCatalog;
