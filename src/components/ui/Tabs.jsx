import { NavLink } from "react-router-dom";
import { tabsArray } from "../../utils/tabs";

const Tabs = () => {
  return (
    <div className="my-2">
      <div className="container mx-auto rounded-lg p-2">
        <div className="w-full flex justify-center gap-4 flex-col tablet:flex-row">
          {tabsArray.map((tab) => (
            <NavLink
              key={tab.url}
              className={({ isActive }) =>
                isActive ? "btn-neutral btn" : "btn"
              }
              to={tab.url}
            >
              {tab.text}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
