import { useEffect, useState } from "react";
import CatalogCard from "../components/CatalogCard";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import { URL } from "../utils/backend-url";
import useAuth from "../hooks/useAuth";
import EnrollModal from "../components/EnrollModal";

const CatalogPage = () => {
  const [catalog, setCatalog] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [chosenCategories, setChosenCategories] = useState([]);
  const [catalogList, setCatalogList] = useState([]);
  const [chosenSpec, setChosenSpec] = useState("all");

  const [searchQuery, setSearchQuery] = useState({
    specialization: 'all',
    categories: []
  })

  // console.log(chosenSpec);
  // console.log(catalog);
  // console.log(catalogList);
  // console.log(chosenCategories);
  console.log(searchQuery);

  const { currentToken } = useAuth();

  const fetchCatalog = async (url = `${URL}/api/catalog/`) => {
    try {
      const headers = {};
      if (currentToken) {
        headers.Authorization = `Token ${currentToken}`;
      }
      const response = await fetch(`${url}`, {
        method: "GET",
        headers,
      });
      const data = await response.json();
      setCatalog(data);
      setCatalogList(data?.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const showMoreCatalog = async () => {
    fetchCatalog(catalog.next);
  };

  const catalogFilter = async (newSpec = '') => {
    const categoriesString = searchQuery.categories.map(el => `&categories=${el}`).join('')
    console.log(categoriesString);
    const queryString = `?specialization=${searchQuery.specialization}${categoriesString ? categoriesString : ''}`
    console.log(queryString);

    try {
      const response = await fetch(`${URL}/api/categories/${queryString}`);
      const data = await response.json();
      console.log(data);
      setCatalog(data);
      setCatalogList(data?.results);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };


  const onChangeSpecHandler = (e) => {
    setChosenSpec(e.target.value);
    catalogFilter(e.target.value);
    setSearchQuery({
      ...searchQuery,
      specialization: e.target.value
    })
  };

  const onChangeCategoriesHandler = (id) => {
    const isInArray = chosenCategories.some(el => el === id)
    if(isInArray) {
      const itemsFilter = chosenCategories.filter(el => el !== id)
      setChosenCategories(itemsFilter)
      setSearchQuery({
        ...searchQuery,
        categories: itemsFilter
      })
    } else {
      setChosenCategories([...chosenCategories, id])
      setSearchQuery({
        ...searchQuery,
        categories: [...searchQuery.categories, id]
      })
    }
  }

  useEffect(() => {
    fetchCatalog();
  }, []);

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

  // const filterCatalog = async (id) => {
  //   const response = await fetch(`${URL}/api/catalog/?categories=${id}`);
  //   const data = await response.json();
  // };

  useEffect(() => {
    getCategories();
  }, []);

  // useEffect(() => {
  //   catalogFilter()
  // }, [catalogFilter])

  return (
    <>
      <Header />
      <Hero />
      <EnrollModal />

      <div className="">
        <Tabs />
        <section className="p-2 tablet:p-7">
          <div className="container mx-auto grid grid-cols-12 gap-8">
            <div className="col-span-12 laptop:col-span-9">
              <h1 className="text-4xl mb-5">Каталог</h1>
              <div className="list grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12 gap-4">
                {catalogList?.length ? (
                  catalogList?.map((catalogItem) => (
                    <CatalogCard
                      item={catalogItem}
                      key={catalogItem.id}
                      items={catalogList}
                      setItems={setCatalogList}
                    />
                  ))
                ) : (
                  <>
                    <div className="flex flex-col gap-4 col-span-4 rounded-xl min-h-44">
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

                    <div className="flex flex-col gap-4 col-span-4 rounded-xl min-h-44">
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

                    <div className="flex flex-col gap-4 col-span-4 rounded-xl min-h-44">
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
                  </>
                )}
              </div>

              <div className="flex justify-center p-5">
                <button onClick={showMoreCatalog} className="btn my-5">
                  Показать еще
                </button>
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

                <button
                  className="btn btn-primary my-2"
                  onClick={() => {
                    setIsCategoryModalOpen(true);
                  }}
                >
                  Выбрать категорию
                </button>
                {/* <details className="dropdown">
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
                </details> */}
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
                      // setChosenCategories([...chosenCategories, category.id])
                      onChangeCategoriesHandler(category.id)
                      // setSearchQuery({...searchQuery, categories: })
                    }
                      
                    }
                  ></input>
                  <span className="text-2xl">{category.title}</span>
                </label>
              ))}
            </div>

            <button
              className="btn btn-primary absolute bottom-10 right-10"
              onClick={() => {
                setIsCategoryModalOpen(false);
                // filterCatalog(chosenCategories[0]);
                catalogFilter()
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

export default CatalogPage;
