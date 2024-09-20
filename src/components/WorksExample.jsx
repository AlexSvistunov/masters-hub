import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

import "../App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const WorksExample = ({ masterData }) => {
  return (
    <div className="bg-base-200 p-5 rounded-2xl mb-5">
      <div className="flex gap-2 items-center mb-5">
        <h3 className="text-3xl">Примеры работ</h3>
        <span className="text-2xl text-primary">
          {masterData?.images_work?.length}
        </span>
      </div>

      <div className="flex justify-center w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={"auto"}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation
        >
          {masterData?.images_work?.map((workImage) => (
            <div key={workImage.image}>
              <SwiperSlide className="myCard">
                <img
                  className="rounded-lg w-40 h-40 object-cover"
                  src={`/backend/masterhub${workImage.image}`}
                ></img>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WorksExample;
