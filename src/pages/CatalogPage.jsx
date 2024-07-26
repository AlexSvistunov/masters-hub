import { useEffect, useState } from "react";
import CatalogCard from "../components/CatalogCard";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import EnrollModal from "../components/EnrollModal";
import { useLocation } from "react-router-dom";
import { logIn } from "../store/slices/userSlice";
import SkeletonCatalog from "../components/SkeletonCatalog";
import CatalogService from "../service/CatalogService";
import axios from "axios";

const CatalogPage = () => {
  const { state } = useLocation();
  let id;
  if (state) {
    id = state.id;
  }

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [chosenCategories, setChosenCategories] = useState(state ? [id] : []);
  const [chosenSpec, setChosenSpec] = useState("all");

  const [catalog, setCatalog] = useState([]);
  const [catalogList, setCatalogList] = useState([]);

  const [step, setStep] = useState(0);
  const { currentToken } = useAuth();

  const [searchQuery, setSearchQuery] = useState({
    specialization: "all",
    categories: state ? [id] : [],
  });

  const showMoreCatalog = async () => {
    const { next } = catalog;
    if (next) {
      try {
        const headers = {};
        if (currentToken) {
          headers.Authorization = `Token ${currentToken}`;
        }
        const response = await fetch(next, {
          method: "GET",
          headers,
        });
        const data = await response.json();

        setCatalog({
          ...data,
          results: data.results,
        });
        setCatalogList(data.results);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const catalogFilter = async (
    item = searchQuery,
    url = `${URL}/api/catalog/`
  ) => {
    let queryString = "";

    if (item.specialization !== "all") {
      queryString = `?specialization=${item.specialization}`;
      const categoriesString = item.categories
        .map((el) => `&categories=${el}`)
        ?.join("");
      if (categoriesString) {
        queryString += categoriesString;
      }
    } else {
      const categoriesString = item.categories
        .map((el, index) => {
          if (index === 0) {
            return `?categories=${el}`;
          } else {
            return `&categories=${el}`;
          }
        })
        .join("");
      if (categoriesString) {
        queryString += categoriesString;
      }
    }

    try {
      const headers = {};
      if (currentToken) {
        headers.Authorization = `Token ${currentToken}`;
      }
      const response = await fetch(`${url}${queryString}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();

      setCatalog(data);
      setCatalogList(data?.results);

      return data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeSpecHandler = (e) => {
    setChosenSpec(e.target.value);
    const item = {
      ...searchQuery,
      specialization: e.target.value,
    };
    setSearchQuery(item);

    catalogFilter(item);
  };

  const onChangeCategoriesHandler = (id) => {
    const isInArray = chosenCategories.some((el) => el === id);
    if (isInArray) {
      const itemsFilter = chosenCategories.filter((el) => el !== id);
      setChosenCategories(itemsFilter);
      setSearchQuery({
        ...searchQuery,
        categories: itemsFilter,
      });
    } else {
      setChosenCategories([...chosenCategories, id]);
      setSearchQuery({
        ...searchQuery,
        categories: [...searchQuery.categories, id],
      });
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(`${URL}/api/categories/`);
      const data = await response.json();
      if (data) {
        setCategories(data);
      }
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // fetchCatalog();
    setTimeout(() => {
      catalogFilter();
    }, 0);
  }, []);

  useEffect(() => {
    if (isCategoryModalOpen) {
      getCategories();
    }
  }, [isCategoryModalOpen]);

  async function getCat() {
    const catalog = await CatalogService.getCatalog(
      currentToken,
      `${URL}/api/catalog/`,
      searchQuery.specialization !== "all" ? searchQuery.specialization : null,
      searchQuery.categories ? searchQuery.categories : null
    );

    console.log(catalog)

  }

  useEffect(() => {
    // getCat();
  }, []);

  // const myCategory = chosenCategories.forEach((el) => {
  //   const my2 = categories.find((category) => category.id === el);
  //   console.log("ITEM", my2["title"]);
  // });
  // const showMoreCatalog = async () => {
  //   const {next} = catalog
  //   // catalogFilter(next)
  //   catalog(_, next)
  // };

  // const filterCatalog = async (id) => {
  //   const response = await fetch(`${URL}/api/catalog/?categories=${id}`);
  //   const data = await response.json();
  // };

  // useEffect(() => {
  //   catalogFilter()
  // }, [catalogFilter])

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
              <div className="list grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12 gap-4">
                {isLoading ? (
                  <>
                    {Array(3)
                      .fill(null)
                      .map((skeletonItem, index) => (
                        <SkeletonCatalog key={index} />
                      ))}
                  </>
                ) : catalogList?.length ? (
                  catalogList?.map((catalogItem) => (
                    <CatalogCard
                      item={catalogItem}
                      key={catalogItem.id}
                      items={catalogList}
                      setItems={setCatalogList}
                    />
                  ))
                ) : (
                  <h2 className="text-center col-span-12 text-4xl py-10">
                    Нет подходящего каталога по Вашему запросу! Попробуйте
                    изменить фильтры
                  </h2>
                )}
              </div>

              <div className="flex justify-center p-5">
                {catalog?.next ? (
                  <button onClick={showMoreCatalog} className="btn my-5">
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

                {chosenCategories?.length ? (
                  <div className="flex flex-wrap gap-2 my-3">
                    {chosenCategories?.map((chosenCategory) => {
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
                    onChange={onChangeSpecHandler}
                    checked={chosenSpec === "all"}
                  ></input>
                  <span>Все</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="master"
                    onChange={onChangeSpecHandler}
                    checked={chosenSpec === "master"}
                  ></input>
                  <span>Только мастера</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="studio"
                    onChange={onChangeSpecHandler}
                    checked={chosenSpec === "studio"}
                  ></input>
                  <span>Только студии</span>
                </label>
              </div>
            </aside>
          </div>
        </section>
        <div className="enroll-modal" open={isCategoryModalOpen ? true : false}>
          <div className="enroll-modal__box">
            <div className="flex flex-col gap-2 py-10">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    onChange={() => {
                      onChangeCategoriesHandler(category.id);
                    }}
                    checked={chosenCategories.some((el) => el === category.id)}
                  ></input>
                  <span className="text-2xl">{category.title}</span>
                </label>
              ))}
            </div>

            <button
              className="btn btn-primary absolute bottom-10 right-10"
              onClick={() => {
                setIsCategoryModalOpen(false);
                catalogFilter();
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

// если не найдено, то просто будет скелетон
// из подборки если нажимаю на item, то автоматом сортируется

export default CatalogPage;
