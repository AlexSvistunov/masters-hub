import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import URL from "../../utils/backend-url";
import BusinessLayout from "../../components/business/BusinessLayout";
import { useFetch } from "../../hooks/useFetch";
import { MoonLoader } from "react-spinners";
import { Link } from "react-router-dom";

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
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Нет профиля! Создайте профиль");
      } else {
        throw new Error("Something went wrong");
      }
    }
    const data = await response.json();
    setCategories(data);
    return data;
  };

  const [getCategoriesData, isLoading, error] = useFetch(getCategories);

  useEffect(() => {
    getCategoriesData();
  }, []);

  console.log(categories)

  return (
    <BusinessLayout>
      <h1 className="text-3xl mb-4">Категории</h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <MoonLoader color="#00cab6" size={75}></MoonLoader>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-3 items-start">
          <div className="text-xl">{error}</div>
          <Link to="/business/profile/creation" className="btn btn-accent">
            Создать профиль
          </Link>
        </div>
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
