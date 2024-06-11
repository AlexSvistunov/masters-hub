import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import { Link } from "react-router-dom";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";

const MiniCatalog = ({ isModalOpen, setIsModalOpen }) => {

  const [catalogItems, setCatalogItems] = useState([]);
  const [favList, setFavList] = useState([])
  const { currentToken } = useAuth();

  const getFav = async () => {
    try {
      const response = await fetch(`${URL}/api/favorites/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });

    
      const data = await response.json();
      setFavList(data)
      
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

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
    getFav();
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
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                catalogItem={catalogItem}
                token={currentToken}
                favList={favList}
                setFavList={setFavList}
              />
            ))}
          </div>
        )}

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
