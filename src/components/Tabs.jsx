import { Link, NavLink } from "react-router-dom";

const Tabs = () => {
  return (
    <div className="my-2">
      <div className="container mx-auto rounded-lg p-2">
        <div className="w-full flex justify-center gap-4 flex-col tablet:flex-row">
          <NavLink className={({isActive}) => isActive ? 'btn-neutral btn' : 'btn'} to={'/'}>Подборка</NavLink>
          <NavLink className={({isActive}) => isActive ? 'btn-neutral btn' : 'btn'} to={'/catalog'}>Каталог</NavLink>
          <NavLink className={({isActive}) => isActive ? 'btn-neutral btn' : 'btn'} to={'/favorites'}>Избранное</NavLink>
          <NavLink className={({isActive}) => isActive ? 'btn-neutral btn' : 'btn'} to={'/notes'}>Мои записи</NavLink>
        </div>
      </div>
    </div>

  );
};

export default Tabs;
