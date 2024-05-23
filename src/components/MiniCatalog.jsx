import CatalogCard from "./CatalogCard";

const MiniCatalog = () => {
  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Каталог</h2>

        <div className="cards grid gap-6 grid-cols-12">
          <CatalogCard />
          <CatalogCard />
          <CatalogCard />
          <CatalogCard />
          <CatalogCard />
        </div>

        <div className="flex justify-center p-4">
          <button className="btn btn-secondary">Посмотреть все</button>
        </div>
      </div>
    </section>
  );
};

export default MiniCatalog;
