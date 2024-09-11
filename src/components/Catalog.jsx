import SkeletonCatalog from "./ui/SkeletonCatalog";
import CatalogCard from "./CatalogCard";

const Catalog = ({error, isLoading, catalog, catalogList, setCatalogList, setPageNumber}) => {
  return (
    <div className="col-span-12 laptop:col-span-9">
              <h1 className="text-4xl mb-5">Каталог</h1>
              {error && <h3 className="text-2xl">{error}</h3>}
              <div className="list grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-8 desktop:grid-cols-12 gap-4">
                {isLoading
                  ? Array(3)
                      .fill(null)
                      .map((_, index) => <SkeletonCatalog key={index} />)
                  : catalogList.map((catalogItem) => (
                      <CatalogCard
                        item={catalogItem}
                        key={catalogItem.id}
                        items={catalogList}
                        setItems={setCatalogList}
                      />
                    ))}
              </div>

              <div className="flex justify-center p-5">
                {catalog?.next ? (
                  <button
                    onClick={() => {
                      const nextString = catalog?.next
                      const url = new URL(nextString);

                      const pageNum = url.searchParams.get("page")
                        ? url.searchParams.get("page")
                        : null;

                        setPageNumber(pageNum)
                    }}
                    className="btn my-5"
                  >
                    Показать еще
                  </button>
                ) : (
                  isLoading && <div className="skeleton my-5 w-32 h-12"></div>
                )}
              </div>
            </div>
  )
}

export default Catalog