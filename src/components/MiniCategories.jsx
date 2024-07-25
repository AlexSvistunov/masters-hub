import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { useFetch } from "../hooks/useFetch";
import CategoryService from "./CategoryService";

const MiniCategories = () => {
  const [categories, setCategories] = useState([]);
  const [getCategories, isLoading, error] = useFetch(async () => {
    const categories = await CategoryService.getAllCategories();
    setCategories(categories);
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="p-7">
      <div className="container mx-auto">
        <h2 className="text-4xl mb-5">Категории</h2>
        <div className="flex gap-4 tablet:flex-row flex-col">
          {error && <h3>{error}</h3>}
          {isLoading ? (
            <>
              {Array(3)
                .fill(0)
                .map((skeleton, index) => (
                  <div
                    key={index}
                    className="skeleton tablet:w-2/6 w-full rounded-lg tablet:min-h-52 min-h-40"
                  ></div>
                ))}
            </>
          ) : (
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MiniCategories;
