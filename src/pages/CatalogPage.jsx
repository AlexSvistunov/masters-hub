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
            <div className="list grid grid-cols-8 gap-3">
              <CatalogCard/>
              <CatalogCard/>
              <CatalogCard/>
              <CatalogCard/>
            </div>

            <div className="flex justify-center p-5">
              <button className="btn btn-primary">Показать еще</button>
            </div>
          </div>

          <aside className="col-start-10 col-end-12">
           <input placeholder="Поиск"></input> 
           <button>Сортировать по</button>
           <h3>Категория</h3>
           <button>Выбрать категорию</button>

           <div>
            <label>
              <input type="checkbox"></input>
              <span>Все</span>
            </label>

            <label>
              <input type="checkbox"></input>
              <span>Только компании</span>
            </label>


            <label>
              <input type="checkbox"></input>
              <span>Только мастера</span>
            </label>
           </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default CatalogPage;
