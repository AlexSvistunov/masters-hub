import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

import EnrollModal from "../components/EnrollModal";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import SkeletonCatalog from "../components/SkeletonCatalog";
import CatalogService from "../service/CatalogService";
import CatalogCard from "../components/CatalogCard";
import CategoryService from "../service/CategoryService";
import { URL } from "../utils/backend-url";

const CatalogPage = () => {
  const { currentToken } = useAuth();

  const [catalog, setCatalog] = useState([]);
  const [catalogList, setCatalogList] = useState([]);
  const [categories, setCategories] = useState([]);

  const [sort, setSort] = useState({
    specialization: "all",
    categories: [],
  });

  const [step, setStep] = useState(0);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  async function getCatalogCallback() {
    const response = await CatalogService.getCatalog(
      currentToken,
      `${URL}/api/catalog/`,
      sort.specialization,
      sort.categories
    );
    setCatalog(response.data);
    setCatalogList(response.data.results);
  }

  const [getCatalog, isLoading, error] = useFetch(getCatalogCallback);

  const [getCategories, isCategoriesLoading, categoriesError] = useFetch(
    async () => {
      const categories = await CategoryService.getAllCategories();
      setCategories(categories);
    }
  );

  useEffect(() => {
    if (!isCategoryModalOpen) {
      getCatalog();
    }
  }, [sort, isCategoryModalOpen]);

  useEffect(() => {
    if (isCategoryModalOpen) {
      getCategories();
    }
  }, [isCategoryModalOpen]);

  const onChangeCategoriesHandler = (id) => {
    const isExist = sort.categories.some((category) => category === id);

    if (isExist) {
      const itemsFilter = sort.categories.filter((category) => category !== id);
      setSort({ ...sort, categories: itemsFilter });
    } else {
      setSort({ ...sort, categories: [...sort.categories, id] });
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <EnrollModal step={step} setStep={setStep} />

      <div className="">
        <Tabs />
        <section className="p-2 tablet:p-7">
          <div className="container mx-auto grid grid-cols-12 gap-8">
            <div className="col-span-12 laptop:col-span-9">
              <h1 className="text-4xl mb-5">Каталог</h1>
              {error && <h3>{error}</h3>}
              <div className="list grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12 gap-4">
                {isLoading
                  ? Array(3)
                      .fill(null)
                      .map((_, index) => <SkeletonCatalog key={index} />)
                  : catalogList.map((catalogItem) => (
                      <CatalogCard
                        item={catalogItem}
                        key={catalogItem.id}
                        items={catalogList}
                        setItems={setCatalogList}
                      />
                    ))}
              </div>

              <div className="flex justify-center p-5">
                {catalog?.next ? (
                  <button onClick={() => {}} className="btn my-5">
                    Показать еще
                  </button>
                ) : (
                  isLoading && <div className="skeleton my-5 w-32 h-12"></div>
                )}
              </div>
            </div>

            <aside className="laptop:block hidden col-start-10 col-end-13 p-5 rounded-xl bg-base-200 max-w-64 ml-auto">
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

                {sort.categories?.length && !isCategoryModalOpen ? (
                  <div className="flex flex-wrap gap-2 my-3">
                    {sort.categories?.map((chosenCategory) => {
                      const category = categories.find(
                        (category) => category.id === chosenCategory
                      );
                      return category ? (
                        <div
                          key={category.id}
                          className="p-2 bg-base-300 rounded-md max-w-fit font-medium"
                        >
                          {category.title}
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : null}

                <button
                  className="btn btn-primary my-2"
                  onClick={() => {
                    setIsCategoryModalOpen(true);
                  }}
                >
                  Выбрать категорию
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="all"
                    onChange={(e) =>
                      setSort({ ...sort, specialization: e.target.value })
                    }
                    checked={sort.specialization === "all"}
                  ></input>
                  <span>Все</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="master"
                    onChange={(e) =>
                      setSort({ ...sort, specialization: e.target.value })
                    }
                    checked={sort.specialization === "master"}
                  ></input>
                  <span>Только мастера</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="studio"
                    onChange={(e) =>
                      setSort({ ...sort, specialization: e.target.value })
                    }
                    checked={sort.specialization === "studio"}
                  ></input>
                  <span>Только студии</span>
                </label>
              </div>
            </aside>
          </div>
        </section>
        <div
          className="enroll-modal"
          open={isCategoryModalOpen ? true : false}
          onClick={() => setIsCategoryModalOpen(false)}
        >
          <div
            className="enroll-modal__box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 py-10">
              {categoriesError && (
                <h3 className="text-center text-2xl">{categoriesError}</h3>
              )}
              {isCategoriesLoading ? (
                <h3 className="text-center text-2xl">Loading...</h3>
              ) : (
                categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      onChange={() => {
                        onChangeCategoriesHandler(category.id);
                        // setSort({...sort, categories: [...sort.categories, category.id]})
                      }}
                    ></input>
                    <span className="text-2xl">{category.title}</span>
                  </label>
                ))
              )}
            </div>

            <button
              className="btn btn-primary absolute bottom-10 right-10"
              onClick={() => {
                setIsCategoryModalOpen(false);
                // catalogFilter();
              }}
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// декомпозиция по компонентам
// можно чтобы категории не сразу рисовались, а только после применения (useEffect, условия)

export default CatalogPage;
