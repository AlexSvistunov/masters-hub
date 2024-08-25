import { Link, NavLink } from "react-router-dom";

import Header from "../components/HeaderBusiness";

const Drawer = ({ children }) => {
  return (
    <div className="drawer default-tablet:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-10">
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side rounded-2xl h-full">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="drawer-menu flex flex-col gap-2 text-base-content min-h-full w-80 p-4 bg-base-200 default-tablet:bg-transparent">
          {/* Sidebar content here */}
          <li>
            <NavLink
              to="/business/profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <Link to="">Мои специалисты</Link>
          </li>

          <li>
            <Link to="">Услуги</Link>
          </li>

          <li>
            <Link to="">Рабочее время</Link>
          </li>

          <li>
            <Link to="">Категории</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
