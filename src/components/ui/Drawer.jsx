import { NavLink } from "react-router-dom";
import { RoutesConfig } from "../../utils/routes";

const Drawer = ({ children }) => {
  return (
    <div className="drawer default-tablet:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content px-10 py-5">{children}</div>
      <div className="drawer-side rounded-2xl h-full z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="drawer-menu flex flex-col gap-2 text-base-content min-h-full laptop:w-80 w-50 p-4 tablet:py-4 py-7 bg-base-200 default-tablet:bg-transparent">
          <li>
            <NavLink
              to={RoutesConfig.BUSINESS_PROFILE}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Профиль
            </NavLink>
          </li>

          <li>
            <NavLink
              to={RoutesConfig.BUSINESS_RECORDING}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Записи
            </NavLink>
          </li>
          <li>
            <NavLink
              to={RoutesConfig.BUSINESS_SPECIALISTS}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Мои специалисты
            </NavLink>
          </li>

          <li>
            <NavLink
              to={RoutesConfig.BUSINESS_SERVICE}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Услуги
            </NavLink>
          </li>

          <li>
            <NavLink
              to={RoutesConfig.BUSINESS_CATEGORIES}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Категории
            </NavLink>
          </li>

          <li>
            <NavLink
              to={RoutesConfig.BUSINESS_WORK_TIME}
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
