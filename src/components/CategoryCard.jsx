
// src="/backend/master-hub_API/masterhub/static/media/categories/brows.jpg"
const CategoryCard = ({category}) => {
  return (
    <div className="w-2/6 relative category-card overflow-hidden before:block before:absolute before:inset-0 before:bg-black-rgba">
      <img
        className="w-full h-full rounded-lg"
        src={`/backend/masterhub/${category.photo.slice(22)}`}
      ></img>

      <div className="absolute top-2/4 left-2/4 text-xl  text-white text-center  !-translate-x-2/4 !-translate-y-2/4 ">
       {category.title}
      </div>
    </div>
  );
};

export default CategoryCard;
