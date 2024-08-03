
const CategoryModal = ({isCategoryModalOpen, setIsCategoryModalOpen, categoriesError, isCategoriesLoading, categories, onChangeCategoriesHandler, sort}) => {
  return (
    <div
          className="enroll-modal"
          open={isCategoryModalOpen ? true : false}
          onClick={() => setIsCategoryModalOpen(false)}
        >
          <div
            className="enroll-modal__box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 py-10">
              {categoriesError && (
                <h3 className="text-center text-2xl">{categoriesError}</h3>
              )}
              {isCategoriesLoading ? (
                <h3 className="text-center text-2xl">Loading...</h3>
              ) : (
                categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-3">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      onChange={() => {
                        onChangeCategoriesHandler(category.id);
                   
                      }}

                      checked={sort?.categories?.some((el) => el === category.id)}
                    ></input>
                    <span className="text-2xl">{category.title}</span>
                  </label>
                ))
              )}
            </div>

            <button
              className="btn btn-primary absolute bottom-10 right-10"
              onClick={() => {
                setIsCategoryModalOpen(false);
      
              }}
            >
              Применить
            </button>
          </div>
        </div>
  )
}

export default CategoryModal