import CatalogCard from "./CatalogCard";
import { Link } from "react-router-dom";

const MiniCatalog = ({setIsModalOpen}) => {
  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Каталог</h2>

        <div className="cards grid gap-6 grid-cols-12">
          <CatalogCard setIsModalOpen={setIsModalOpen} />
          <CatalogCard setIsModalOpen={setIsModalOpen} />
          <CatalogCard setIsModalOpen={setIsModalOpen} />
          <CatalogCard setIsModalOpen={setIsModalOpen} />
          <CatalogCard setIsModalOpen={setIsModalOpen} />
        </div>

        <div className="flex justify-center p-4">
          <Link className="btn" to='/catalog'>Посмотреть все</Link>
        </div>
      </div>
    </section>
  );
};

export default MiniCatalog;
