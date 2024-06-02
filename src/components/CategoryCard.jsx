
// src="/backend/master-hub_API/masterhub/static/media/categories/brows.jpg"
const CategoryCard = ({category}) => {
  return (
    <div className="w-2/6 relative category-card">
      <img
        className="w-full h-full rounded-lg"
        src={`/backend/master-hub_API/masterhub/${category.photo.slice(22)}`}
      ></img>
      <span className="absolute top-2/4 left-2/4 text-3xl text-black">
       {category.title}
      </span>
    </div>
  );
};

export default CategoryCard;
