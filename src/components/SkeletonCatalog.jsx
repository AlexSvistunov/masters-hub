const SkeletonCatalog = () => {
  return (
    <div className="flex flex-col gap-4 col-span-4 rounded-xl min-h-44">
      <div className="h-full w-full bg-base-200 p-4 flex items-center flex-col skeleton">
        <div className="flex items-center gap-5 mb-5 w-full">
          <div className="skeleton h-16 w-16"></div>
          <div className="flex flex-col gap-1">
            <div className="skeleton w-40 h-5"></div>
            <div className="skeleton w-40 h-5"></div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-auto">
          <div className="skeleton w-20 h-10"></div>
          <div className="skeleton w-20 h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCatalog;
