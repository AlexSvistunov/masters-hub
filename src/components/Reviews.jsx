import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import LeavingComment from "./LeavingComment";
import Rating from "./ui/Rating";

const Reviews = ({
  masterData,
  setIsLeavingCommentOpen,
  isLeavingCommentOpen,
  sendReview,
  formattedRating,
  masterPage,
  reviewsArray,
  count,
  setPageNum,
  reviewsData,
}) => {
  const { token } = useAuth();

  const { id } = useParams();

  let page;

  if (reviewsData && reviewsData?.next) {
    const url = new URL(reviewsData.next);
    page = url.searchParams.get("page");
  }

  return (
    <div className="bg-base-200 p-5 rounded-2xl mb-5 min-h-40">
      <div className="flex flex-col gap-5 tablet:flex-row">
        <div className="flex items-center gap-2 w-full max-w-60">
          <h3 className="text-3xl mb-2">Отзывы</h3>
          <span className="text-2xl text-primary">{count}</span>
        </div>

        {token && !masterPage && <h3 className="text-xl">Все отзывы</h3>}

        {masterPage && (
          <div className="flex flex-col items-start max-w-150 w-full mb-5 tablet:mb-0">
            {token && masterPage && (
              <button
                className="tablet:self-end"
                onClick={() => setIsLeavingCommentOpen((prev) => !prev)}
              >
                Оставить отзыв
              </button>
            )}

            {isLeavingCommentOpen && (
              <LeavingComment
                isLeavingCommentOpen={isLeavingCommentOpen}
                sendReview={sendReview}
              />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 tablet:flex-row">
        <div className="block w-full max-w-60">
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
            <p className="ms-1 text-sm font-bold">
              {formattedRating ? formattedRating : "5.0"}
            </p>

            {count > 0 ? (
              <span
                href="#"
                className="text-sm font-medium  underline hover:no-underline mx-3"
              >
                {count} отзывов
              </span>
            ) : null}
          </div>
        </div>
        <div className="user-reviews max-w-150 w-full mt-4 tablet:mt-0">
          {reviewsArray?.map((review) => (
            <article className="w-full mb-5" key={review.id}>
              <div className="flex justify-between items-start tablet:items-center flex-col tablet:flex-row">
                <div className="flex items-center mb-4">
                  <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 me-4">
                    <img src={`/backend/masterhub/static${review.photo}`}></img>
                  </div>

                  <div className="font-medium dark:text-white">
                    <p className="text-gray-500 dark:text-gray-400">
                      {review.user_name}
                      <time
                        dateTime={review?.data_create}
                        className="block text-sm text-gray-500 dark:text-gray-400"
                      >
                        {review?.data_create}
                      </time>
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                  <Rating raiting={review?.rating_star} />
                </div>
              </div>

              <p className="mb-2 text-gray-500 dark:text-gray-400 text-lg">
                {review.description}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        {count > 5 && masterPage ? (
          <Link className="btn btn-ghost" to={`/all-reviews/${id}`}>
            Показать еще
          </Link>
        ) : null}

        {!masterPage && reviewsData?.next && (
          <button className="btn btn-ghost" onClick={() => setPageNum(page)}>
            Показать еще
          </button>
        )}
      </div>
    </div>
  );
};

export default Reviews;
