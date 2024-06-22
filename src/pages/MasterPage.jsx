import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { URL } from "../utils/backend-url";
import { useEffect, useState } from "react";
import CatalogCard from "../components/CatalogCard";
import useAuth from "../hooks/useAuth";

const MasterPage = () => {
  const [masterData, setMasterData] = useState({});
  console.log(masterData);

  const { currentToken } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const averageRating = masterData?.reviews?.average_rating;
  const formattedRating =
    averageRating % 1 === 0 ? averageRating + ".0" : averageRating;

  const { id } = useParams();

  const fetchMasterProfile = async () => {
    const response = await fetch(`${URL}/api/users/${id}/`);
    const data = await response.json();
    console.log(data);
    setMasterData(data);
  };

  useEffect(() => {
    fetchMasterProfile();
  }, []);

  return (
    <>
      <Header />
      <section className="py-40">
        {masterData && (
          <div className="container mx-auto">
            {/* <div className="p-5 rounded-2xl min-h-32 bg-base-200 relative mb-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <img
                      className="h-12 w-12 rounded-lg"
                      src={`/backend/masterhub${masterData.photo}`}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="text-2xl">{masterData.name}</span>
                      <span>{masterData.address}</span>
                    </div>
                  </div>

                  <div className="flex g-2">
                    <span></span>
                    <span>{masterData.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-5xl">
                      {formattedRating}
                    </span>
                    <div className="flex flex-col">
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>

                      <span>{masterData.reviews?.count} оценок</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end">
                  <button className="btn btn-primary">Записаться</button>
                </div>
              </div>

              <button className="absolute top-5 right-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div> */}

            <div className="mb-5">
              <CatalogCard
                item={masterData}
                setItems={setMasterData}
                token={currentToken}
                keyword='profile'
              />
            </div>

            <div className="bg-base-200 p-5 rounded-2xl mb-5">
              <h3 className="text-3xl mb-3">Описание</h3>
              <p>{masterData.description}</p>
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
                  <div className="flex my-5" key={service.title}>
                    <img
                      className="block mr-4 rounded-md h-12 w-12"
                      src={`/backend/masterhub${service.photo}`}
                    ></img>

                    <div className="flex flex-col">
                      <span>{service.title}</span>
                      <span>Брови</span>
                    </div>

                    <div className="ml-auto flex gap-10 items-center">
                      <div className="">{service.price} RUB</div>
                      <span>1 час</span>

                      <div className="btn btn-primary">Записаться</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-auto">
                <button className="btn">Посмотреть все</button>
              </div>
            </div>

            <div className="bg-base-200 p-5 rounded-2xl mb-5">
              <div className="flex gap-2 items-center mb-5">
                <h3 className="text-3xl">Примеры работ</h3>
                <span className="text-2xl text-primary">
                  {masterData?.images_work?.length}
                </span>
              </div>

              <div className="flex gap-4 items-center justify-center">
                {masterData?.images_work?.map((workImage) => (
                  <img
                    className="rounded-lg w-40 h-40 object-cover"
                    src={`/backend/masterhub${workImage.image}`}
                    key={workImage.image}
                  ></img>
                ))}
              </div>
            </div>

            <div className="bg-base-200 p-5 rounded-2xl mb-5">
              <div className="flex justify-between">
                <h3 className="text-3xl mb-2">Отзывы</h3>
                {/* <button>Оставить отзыв</button> */}
                <div className="lg:tooltip" data-tip="Отзыв можно оставить только после визита">
                  <button className="btn">Оставить отзыв</button>
                </div>
              </div>

              <div className="flex">
                <div className="block max-w-lg w-full">
                  {/* <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div> */}

                  <div className="flex items-center mb-2">
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
                  </div>
                  {/* <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    1,745 global ratings
                  </p> */}

                  {/* <div className="flex items-center mt-4">
                    <a href="#" className="text-sm font-mediu">
                      5 star
                    </a>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div
                        className="h-5 bg-yellow-300 rounded"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      70%
                    </span>
                  </div>
                  <div className="flex items-center mt-4">
                    <a href="#" className="text-sm font-medium">
                      4 star
                    </a>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div
                        className="h-5 bg-yellow-300 rounded"
                        style={{ width: "17%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      17%
                    </span>
                  </div>
                  <div className="flex items-center mt-4">
                    <a href="#" className="text-sm font-medium">
                      3 star
                    </a>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div
                        className="h-5 bg-yellow-300 rounded"
                        style={{ width: "8%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      8%
                    </span>
                  </div>
                  <div className="flex items-center mt-4">
                    <a href="#" className="text-sm font-medium">
                      2 star
                    </a>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div
                        className="h-5 bg-yellow-300 rounded"
                        style={{ width: "4%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      4%
                    </span>
                  </div>
                  <div className="flex items-center mt-4">
                    <a href="#" className="text-sm font-medium">
                      1 star
                    </a>
                    <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div
                        className="h-5 bg-yellow-300 rounded"
                        style={{ width: "1%" }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      1%
                    </span>
                  </div> */}
                </div>
                <div className="user-reviews max-w-150 w-full">
                  {masterData?.reviews?.detail.map((review) => (
                    <article className="w-full mb-5" key={review.id}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center mb-4">
                          <img
                            className="w-10 h-10 me-4 rounded-full"
                            src="https://f1.dikidi.ru/c9/v8029/14hio6bc32.jpg?size=s"
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
                          </svg>
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
                <button className="btn">Показать еще</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MasterPage;
