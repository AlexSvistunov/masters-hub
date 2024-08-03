import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

import EnrollModal from "../components/EnrollModal";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Tabs from "../components/Tabs";
import CatalogService from "../service/CatalogService";
import CategoryService from "../service/CategoryService";
import serverURL from "../utils/backend-url";
import Catalog from "../components/Catalog";
import CatalogAside from "../components/CatalogAside";
import CategoryModal from "../components/CategoryModal";
import { useLocation } from "react-router-dom";

const CatalogPage = () => {
  const { currentToken } = useAuth();

  const [catalog, setCatalog] = useState([]);
  const [catalogList, setCatalogList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(null);

  const { state } = useLocation();
  console.log(state);

  const [sort, setSort] = useState({
    specialization: "all",
    categories: state ? [state.id] : [],
  });

  const [step, setStep] = useState(0);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  async function getCatalogCallback() {
    const response = await CatalogService.getCatalog(
      currentToken,
      `${serverURL}/api/catalog/`,
      sort.specialization,
      sort.categories,
      pageNumber
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
  }, [sort, isCategoryModalOpen, pageNumber]);

  useEffect(() => {
    getCategories();
  }, [isCategoryModalOpen]);

  const onChangeCategoriesHandler = (id) => {
    setPageNumber(null);
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
            <Catalog
              error={error}
              isLoading={isLoading}
              catalog={catalog}
              catalogList={catalogList}
              setCatalogList={setCatalogList}
              setPageNumber={setPageNumber}
            />

            <CatalogAside
              sort={sort}
              isCategoryModalOpen={isCategoryModalOpen}
              categories={categories}
              setIsCategoryModalOpen={setIsCategoryModalOpen}
              setPageNumber={setPageNumber}
              setSort={setSort}
            />
          </div>
        </section>

        <CategoryModal
        sort={sort}
          isCategoryModalOpen={isCategoryModalOpen}
          setIsCategoryModalOpen={setIsCategoryModalOpen}
          categoriesError={categoriesError}
          isCategoriesLoading={isCategoriesLoading}
          categories={categories}
          onChangeCategoriesHandler={onChangeCategoriesHandler}
        />
      </div>
    </>
  );
};

// reset pagenumber

export default CatalogPage;
