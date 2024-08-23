import Drawer from "./Drawer";
import HeaderBusiness from "./HeaderBusiness";

const BusinessLayout = ({ children }) => {
  return (
    <div>
      <HeaderBusiness />
      <Drawer>{children}</Drawer>
    </div>
  );
};

export default BusinessLayout;
