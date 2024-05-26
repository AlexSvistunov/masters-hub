import CatalogCard from "../components/CatalogCard";
import Header from "../components/Header";

const CatalogPage = () => {
  return (
    <>
      <Header />
      <section className="py-40">
        <div className="container mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-9">
            <h1 className="text-5xl mb-5">Каталог</h1>
            <div className="list grid grid-cols-4">
              <CatalogCard/>
              <CatalogCard/>
              <CatalogCard/>
              <CatalogCard/>
            </div>

            <div className="flex justify-center">
              <button className="btn btn-primary">Показать еще</button>
            </div>
          </div>

          <aside className="col-start-8 col-end-12">
           21312
          </aside>
        </div>
      </section>
    </>
  );
};

export default CatalogPage;
