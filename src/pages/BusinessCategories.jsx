import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import BusinessLayout from "../components/BusinessLayout";
import { useFetch } from "../hooks/useFetch";
import { MoonLoader } from "react-spinners";

const BusinessCategories = () => {
  const { currentToken } = useAuth();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await fetch(`${URL}/api/admin-panel/categories/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    if (!response.ok) throw new Error("Something went wrong!");
    const data = await response.json();
    setCategories(data);
    return data;
  };

  const [getCategoriesData, isLoading, error] = useFetch(getCategories);

  useEffect(() => {
    getCategoriesData();
  }, []);

  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">Категории</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <MoonLoader color="#00cab6" size={75}></MoonLoader>
        </div>
      ) : error ? (
        <div className="text-3xl">{error}</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 max-w-xl">
            {categories?.map((category) => (
              <div
                className="text-xl p-4 bg-base-200 rounded-xl"
                key={category.id}
              >
                {category.title}
              </div>
            ))}
          </div>
        </>
      )}
    </BusinessLayout>
  );
};

export default BusinessCategories;
