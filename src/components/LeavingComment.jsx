import { Rating } from "flowbite-react";
import { useState } from "react";

const LeavingComment = ({ isLeavingCommentOpen, sendReview }) => {
  const [textareaValue, setTextareaValue] = useState("");

  const [amountStars, setAmountStars] = useState(5);

  return (
    <div
      className={
        isLeavingCommentOpen
          ? "flex items-center gap-2 w-full my-4"
          : "hidden items-center gap-2 w-full my-4"
      }
    >
      <div className="flex flex-col gap-3 items-start">
        <div className="flex items-center gap-1">
          {Array(5)
            .fill(0)
            .map((star, index) => (
              <div className="cursor-pointer" onClick={() => setAmountStars(index + 1)} key={index}>
                <svg
                  className={index + 1 <= amountStars ? 'w-4 h-4 text-yellow-300' : 'w-4 h-4 text-gray-300'}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            ))}
        </div>
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
      </div>

      <div className="flex items-center gap-1"></div>

      <div className="p-4 bg-base-300 rounded-lg flex items-center gap-2 flex-auto">
        <textarea
          className="bg-base-200 rounded-lg py-2 px-4 flex-auto text-lg"
          placeholder="Your review..."
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        ></textarea>

        <button
          className="inline-flex justify-center p-2 text-primary rounded-full cursor-pointer"
          onClick={() => sendReview(textareaValue, amountStars.toString())}
        >
          <svg
            className="w-6 h-6 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LeavingComment;
