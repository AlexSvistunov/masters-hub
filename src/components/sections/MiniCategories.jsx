import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard";
import { useFetch } from "../../hooks/useFetch";
import CategoryService from "../../service/CategoryService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

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
        {error && <h3 className="text-center text-2xl">{error}</h3>}
        <div className="flex gap-4">
          {isLoading ? (
            <>
              {Array(3)
                .fill(0)
                .map((skeleton, index) => (
                  <div
                    key={index}
                    className="skeleton tablet:h-40 tablet:w-72 h-28"
                  ></div>
                ))}
            </>
          ) : (
            <Swiper wrapperClass="category" modules={[Navigation]} slidesPerView={"auto"} spaceBetween={30} navigation>
              {categories.map((category) => (
                <SwiperSlide className="myCard">
                  <CategoryCard key={category.id} category={category} />
                  {/* <img src={`/backend/masterhub${category.photo}`} className="h-40 w-64" alt="" /> */}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default MiniCategories;
