import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import { Link } from "react-router-dom";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const MiniCatalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const { currentToken } = useAuth();

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
    setTimeout(() => {
      getCatalogItem();
    }, 0);
  }, []);

  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Каталог</h2>
        <></>

        <div className="cards grid gap-6 grid-cols-12">
          {catalogItems.length ? (
            catalogItems?.map((catalogItem) => (
              <>
                <CatalogCard
                  key={catalogItem.id}
                  // isModalOpen={isModalOpen}
                  // setIsModalOpen={setIsModalOpen}
                  token={currentToken}
                  item={catalogItem}
                  items={catalogItems}
                  setItems={setCatalogItems}
                />
               
              </>
            ))
          ) : (
            <>
              <div className="flex flex-col gap-4 col-span-4 p-4 rounded-xl">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>

              <div className="flex flex-col gap-4 col-span-4 p-4 rounded-xl">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>

              <div className="flex flex-col gap-4 col-span-4 p-4 rounded-xl">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </>
          )}
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
