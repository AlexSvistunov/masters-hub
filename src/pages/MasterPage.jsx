import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { URL } from "../utils/backend-url";
import { useEffect, useState } from "react";
import CatalogCard from "../components/CatalogCard";
import useAuth from "../hooks/useAuth";
import EnrollModal from "../components/EnrollModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar } from "swiper/modules";

import "../App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Raiting from "../components/Raiting";

const MasterPage = () => {
  const [masterData, setMasterData] = useState({});
  const [moreReviews, setMoreReviews] = useState(null)

  const { currentToken } = useAuth();

  console.log(masterData);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const averageRating = masterData?.reviews?.average_rating;
  const formattedRating =
    averageRating % 1 === 0 ? averageRating + ".0" : averageRating;

  const { id } = useParams();

  const fetchMasterProfile = async () => {
    const response = await fetch(`${URL}/api/users/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setMasterData(data);
  };

  const showMoreReviews = async () => {
    const response = await fetch(`${URL}/api/reviews/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setMoreReviews(data)
  }

  useEffect(() => {
    fetchMasterProfile();
  }, []);

  return (
    <>
      <Header />
      <EnrollModal />
      <section className="py-40">
        {masterData && (
          <div className="container mx-auto">
            <div className="mb-5">
              <CatalogCard
                item={masterData}
                items={masterData}
                setItems={setMasterData}
                token={currentToken}
                keyword="profile"
              />
            </div>

            <div className="bg-base-200 p-5 rounded-2xl mb-5">
              <h3 className="text-3xl mb-3">Описание</h3>
              <pre className="whitespace-pre-wrap">
                <p className="max-w-full w-full">{masterData.description}</p>
              </pre>
            </div>

            <div className="bg-base-200 p-5 rounded-2xl min-h-64 flex flex-col mb-5">
              <div className="flex gap-2 items-center">
                <h3 className="text-3xl">Услуги</h3>
                <span className="text-2xl text-primary">
                  {masterData?.services?.length}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {masterData?.services?.map((service) => (
                  <div className="flex my-5 flex-col tablet:flex-row" key={service.title}>
                    <div className="flex items-center">
                    <img
                      className="block mr-4 rounded-md h-12 w-12"
                      src={`/backend/masterhub${service.photo}`}
                    ></img>

                    <div className="flex flex-col">
                      <span className="text-2xl">{service.title}</span>
                      <span className="text-gray-500 text-xl">{service.description}</span>
                    </div>
                    </div>

                    <div className="mt-3 tablet:mt-0 tablet:ml-auto flex  gap-10 items-center">
                      <div className="text-gray-500">{service.price} RUB</div>
                      <span className="text-gray-500">{service.time}</span>

                      <div className="ml-auto tablet:ml-0 btn btn-primary">Записаться</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-auto">
                <button className="btn btn-ghost">Посмотреть все</button>
              </div>
            </div>

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
                  {masterData?.images_work?.map((workImage, index) => (
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

            {masterData?.specialists?.length ? (
              <div className="bg-base-200 p-5 rounded-2xl mb-5">
                <h3 className="text-3xl mb-2">Специалисты</h3>

                <div className="flex flex-wrap tablet:flex-nowrap items-center gap-4 my-4">
                  {masterData?.specialists?.map((specialist) => (
                    <div
                      className="flex flex-col items-center border border-gray-700 rounded-lg p-3 min-h-20 min-w-40"
                      key={specialist.id}
                    >
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
                        <svg
                          className="absolute w-12 h-12 text-gray-400 -left-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-xl">{specialist.name}</h3>
                      <span className=" text-gray-500 text-base">
                        {specialist.job}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="bg-base-200 p-5 rounded-2xl mb-5 min-h-40">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                <h3 className="text-3xl mb-2">Отзывы</h3>
                <span className="text-2xl text-primary">{masterData?.reviews?.count}</span>
                </div>
              
                <button className="btn btn-ghost">Оставить отзыв</button>
              </div>

              <div className="flex flex-col gap-5 tablet:flex-row">
                <div className="block w-full max-w-60">
                  {/* <div className="flex items-center mb-2">
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      4.95
                    </p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      out of
                    </p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      5
                    </p>
                  </div> */}

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="ms-1 text-sm font-bold">{formattedRating}</p>
                    {/* <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span> */}
                    {masterData?.reviews?.count > 0 ? (
                      <span
                        href="#"
                        className="text-sm font-medium  underline hover:no-underline mx-3"
                      >
                        {masterData?.reviews?.count} отзывов
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="user-reviews max-w-150 w-full mt-4 tablet:mt-0">
                  {masterData?.reviews?.detail?.map((review) => (
                    <article className="w-full mb-5" key={review.id}>
                      <div className="flex justify-between items-start tablet:items-center flex-col tablet:flex-row">
                        <div className="flex items-center mb-4">
                          <img
                            className="w-10 h-10 me-4 rounded-full"
                            src="/user-icon.svg"
                            alt=""
                          ></img>
                          <div className="font-medium dark:text-white">
                            <p>
                              {review.user_name}
                              <time
                                dateTime="2014-08-16 19:00"
                                className="block text-sm text-gray-500 dark:text-gray-400"
                              >
                                {review?.data_create}
                              </time>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                          {/* <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-gray-300 dark:text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg> */}

                          <Raiting raiting={review?.rating_star} />
                        </div>
                      </div>

                      <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {review.description}
                      </p>

                      {/* <a href="#" className="block mb-5 text-sm font-medium">
                        Read more
                      </a> */}
                    </article>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                {masterData?.reviews?.count > 0 ? (
                  <button className="btn btn-ghost" onClick={showMoreReviews}>Показать еще</button>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MasterPage;
