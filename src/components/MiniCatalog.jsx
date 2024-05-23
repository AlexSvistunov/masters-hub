import CatalogCard from "./CatalogCard";

const MiniCatalog = () => {
  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Каталог</h2>

        <div className="grid-cols-4">
          <CatalogCard />
          <CatalogCard />
          <CatalogCard />
        </div>
      </div>
    </section>
  );
};

export default MiniCatalog;
