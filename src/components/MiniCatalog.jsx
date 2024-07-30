import { useEffect, useState } from "react";
import CatalogCard from "./CatalogCard";
import { Link } from "react-router-dom";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import EnrollModal from "./EnrollModal";
import { useFetch } from "../hooks/useFetch";
import CatalogService from "../service/CatalogService";

const MiniCatalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const { currentToken } = useAuth();
  const [step, setStep] = useState(0);

  useEffect(() => {
    getCatalog();
  }, []);

  const [getCatalog, isLoading, error] = useFetch(async () => {
    const response = await CatalogService.getCatalog(currentToken);
    setCatalogItems(response.data.results);
  });

  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Каталог</h2>
        <></>

        {error && <h3 className="text-center">{error}</h3>}
        <div className="cards grid gap-6 grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12">
          {isLoading
            ? [...Array(3)].map((_, index) => (
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
            : catalogItems.map((catalogItem) => (
                <CatalogCard
                  key={catalogItem.id}
                  item={catalogItem}
                  items={catalogItems}
                  setItems={setCatalogItems}
                />
              ))}
        </div>

        <div className="flex justify-center">
          <Link className="btn my-4" to="/catalog">
            Посмотреть все
          </Link>
        </div>
      </div>
      <EnrollModal step={step} setStep={setStep} />
    </section>
  );
};

export default MiniCatalog;
