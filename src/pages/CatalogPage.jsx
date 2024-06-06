import { useEffect, useState } from "react";
import CatalogCard from "../components/CatalogCard";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import { URL } from "../utils/backend-url";

const CatalogPage = () => {
  const [catalog, setCatalog] = useState([])

  const fetchCatalog = async () => {
    try {
      const response = await fetch(`${URL}/api/catalog/`)
      const data = await response.json()
      setCatalog(data)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchCatalog()
  }, [])

  return (
    <>
      <Header />
      <Hero/>

      <div className="">
        <Tabs />
        <section className="">
          <div className="container mx-auto grid grid-cols-12 gap-8">
            <div className="col-span-9">
              <h1 className="text-5xl mb-5">Каталог</h1>
              <div className="list grid grid-cols-8 gap-4">
                {catalog.map((catalogItem) => (
                  <CatalogCard catalogItem={catalogItem} key={catalogItem.id}/>
                ))}

              </div>

              <div className="flex justify-center p-5">
                <button className="btn my-5">Показать еще</button>
              </div>
            </div>

            <aside className="col-start-10 col-end-13 p-5 rounded-xl bg-base-200 max-w-64 ml-auto">
              <label className="input flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

              <div className="py-5">
                <h3>Категория</h3>

                <details className="dropdown">
                  <summary className="m-1 btn p-2 btn-primary">
                    Выбрать категорию
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details>
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="type"></input>
                  <span>Все</span>
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="type"></input>
                  <span>Только компании</span>
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="type"></input>
                  <span>Только мастера</span>
                </label>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
};

export default CatalogPage;
