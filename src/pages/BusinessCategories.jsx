import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import URL from "../utils/backend-url";
import BusinessLayout from "../components/BusinessLayout";

const BusinessCategories = () => {
  const { currentToken } = useAuth();
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await fetch(`${URL}/api/admin-panel/categories/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${currentToken}`,
        },
      });
      const data = await response.json();
      console.log(data);

      setCategories(data);
      return data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <BusinessLayout>
      <div className="flex flex-col gap-2">
        {categories?.map((category) => (
          <div className="text-xl" key={category.id}>
            {category.title}
          </div>
        ))}
      </div>
    </BusinessLayout>
  );
};

export default BusinessCategories;
