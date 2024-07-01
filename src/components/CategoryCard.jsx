import { Link } from "react-router-dom";

// src="/backend/master-hub_API/masterhub/static/media/categories/brows.jpg"
const CategoryCard = ({category}) => {
  return (
    <Link className="block w-full tablet:w-2/6 relative category-card  before:block before:absolute before:inset-0 before:bg-black-rgba rounded-lg tablet:min-h-52 h-40 tablet:h-auto" to={'/catalog'} state={category}>
      <img
        className="w-full h-full rounded-lg object-cover"
        src={`/backend/masterhub${category.photo}`}
      ></img>

      <div className="absolute top-2/4 left-2/4 text-xl  text-white text-center  !-translate-x-2/4 !-translate-y-2/4 ">
       {category.title}
      </div>
    </Link>
  );
};

export default CategoryCard;
