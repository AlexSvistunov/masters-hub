const CatalogCard = ({setIsModalOpen}) => {
  return (
    <div className="col-span-4 p-4 rounded-xl bg-base-200 flex flex-col relative">
      <div className="flex items-center gap-5 mb-5">
        <img className="w-16 h-16 rounded-lg" src="https://f1.dikidi.ru/c8/v7611/4q9bokl6bv.jpg?size=m"></img>
        <div className="flex flex-col gap-1">
          <span className="text-xl">Beauty break</span>
          <span>Московский проспект 11</span>
        </div>
      </div>
      <footer className="flex justify-between mt-auto">
        <div className="flex gap-1 items-center rounded-xl bg-base-300 max-w-fit px-2 py-1">
          <img className="h-3 w-3" src="https://dikidi.ru/assets/images/catalog/star.png"></img>
          <div>4.9 <span>(33)</span></div>
        </div>
        <button className="btn btn-primary">Записаться</button>
      </footer>

      <button className="absolute top-4 right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
    </div>
  );
};

export default CatalogCard;
