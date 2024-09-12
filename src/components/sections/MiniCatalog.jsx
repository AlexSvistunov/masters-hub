import { useEffect, useState } from "react";
import CatalogCard from "../CatalogCard";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import EnrollModal from "../EnrollModal";
import { useFetch } from "../../hooks/useFetch";
import CatalogService from "../../service/CatalogService";
import SkeletonMiniCatalog from "../ui/SkeletonMiniCatalog";

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

        {error && <h3 className="text-center text-2xl">{error}</h3>}
        <div className="cards grid gap-6 grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12">
          {isLoading
            ? [...Array(3)].map((_, index) => (
               <SkeletonMiniCatalog key={index}/>
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
