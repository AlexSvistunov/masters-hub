import { useLocation } from "react-router-dom";
import BusinessLayout from "../components/BusinessLayout"

const BusinessWorkTimeE = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state)
  return (
    <BusinessLayout>
      <div>Hello</div>
    </BusinessLayout>
  )
}

export default BusinessWorkTimeE