import { Link, NavLink } from "react-router-dom";

const Drawer = ({ children }) => {
  return (
    <div className="drawer default-tablet:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content px-10 py-5">
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side rounded-2xl h-full z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="drawer-menu flex flex-col gap-2 text-base-content min-h-full w-80 p-4 tablet:py-4 py-7 bg-base-200 default-tablet:bg-transparent">
          {/* Sidebar content here */}
          <li>
            <NavLink
              to="/business/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Профиль
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/business/recording"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Записи
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/business/specialists"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Мои специалисты
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/business/service"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Услуги
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/business/categories"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Категории
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/business/work-time"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              График
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
