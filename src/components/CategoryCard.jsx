import { Link } from "react-router-dom";

const CategoryCard = ({category}) => {
  return (
    <Link className="block relative category-card before:block before:absolute before:inset-0 before:bg-black-rgba before:rounded-lg tablet:h-40 tablet:w-72 h-28" to={'/catalog'} state={category}>
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

//  <Link className="block w-64 tablet:w-2/6 relative category-card  before:block before:absolute before:inset-0 before:bg-black-rgba before:rounded-lg h-40"/>

export default CategoryCard;
