import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import { Link } from "react-router-dom";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import EnrollModal from "./EnrollModal";

const MiniCatalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const { currentToken } = useAuth();

  const [step, setStep] = useState(0);

  const isModalOpen = useSelector((state) => state.enrollModal.isModalOpen);
  console.log(isModalOpen);

  const getCatalogItem = async () => {
    try {
      const headers = {};
      if (currentToken) {
        headers.Authorization = `Token ${currentToken}`;
      }
      const reponse = await fetch(`${URL}/api/catalog/`, {
        method: "GET",
        headers,
      });
      const data = await reponse.json();

      setCatalogItems(data.results);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCatalogItem();
  }, []);

  useEffect(() => {
    if(isModalOpen) {
      renderModal()
    }
  }, [isModalOpen])

  const renderModal = () => {
    return <EnrollModal step={step} setStep={setStep} />;
  };

  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Каталог</h2>
        <></>

        <div className="cards grid gap-6 grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12">
          {catalogItems?.length ? (
            catalogItems?.map((catalogItem, index) => (
              <CatalogCard
                key={catalogItem.id}
                item={catalogItem}
                items={catalogItems}
                setItems={setCatalogItems}
              />
            ))
          ) : (
            <>
              {[...Array(3)].map((_, index) => (
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
              ))}
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
