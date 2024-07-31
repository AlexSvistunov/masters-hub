
const CatalogAside = ({sort, isCategoryModalOpen, categories, setIsCategoryModalOpen, setPageNumber, setSort}) => {
  return (
    <aside className="laptop:block hidden col-start-10 col-end-13 p-5 rounded-xl bg-base-200 max-w-64 ml-auto">
    <label className="input flex items-center gap-2">
      <input type="text" className="grow" placeholder="Search" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>

    <div className="py-5">
      <h3>Категория</h3>

      {sort.categories?.length && !isCategoryModalOpen ? (
        <div className="flex flex-wrap gap-2 my-3">
          {sort.categories?.map((chosenCategory) => {
            const category = categories.find(
              (category) => category.id === chosenCategory
            );
            return category ? (
              <div
                key={category.id}
                className="p-2 bg-base-300 rounded-md max-w-fit font-medium"
              >
                {category.title}
              </div>
            ) : null;
          })}
        </div>
      ) : null}

      <button
        className="btn btn-primary my-2"
        onClick={() => {
          setIsCategoryModalOpen(true);
        }}
      >
        Выбрать категорию
      </button>
    </div>

    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="type"
          value="all"
          onChange={(e) =>
          {
            setPageNumber(null)
            setSort({ ...sort, specialization: e.target.value })
          }
          }
          checked={sort.specialization === "all"}
        ></input>
        <span>Все</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="type"
          value="master"
          onChange={(e) =>
           {
            setPageNumber(null)
            setSort({ ...sort, specialization: e.target.value })
           }
          }
          checked={sort.specialization === "master"}
        ></input>
        <span>Только мастера</span>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="type"
          value="studio"
          onChange={(e) =>{
            setPageNumber(null)
            setSort({ ...sort, specialization: e.target.value })
          }
            
          }
          checked={sort.specialization === "studio"}
        ></input>
        <span>Только студии</span>
      </label>
    </div>
  </aside>
  )
}

export default CatalogAside