import { Link, useParams } from "react-router-dom";
import BusinessLayout from "../components/BusinessLayout";
import { DayPicker } from "react-day-picker";
import DayTooltip from "../components/DayTooltip";
import { useState } from "react";

const BusinessWorkTimeSpec = () => {
  const { id } = useParams();

  const myTime = ["11:00", "12:00"];

  const [selectedDays, setSelectedDays] = useState([]);
  const [hovered, setHovered] = useState(false);
  console.log(selectedDays);

  const onDayMouseEnterHandler = (e) => {
    setHovered(true);
  };

  const onDayMouseLeaveHandler = (e) => {
    setHovered(false);
  };

  return (
    <BusinessLayout>
      <div>
        <DayPicker
          mode="multiple"
          onSelect={(day) => setSelectedDays(day)}
          onDayMouseEnter={onDayMouseEnterHandler}
          onDayMouseLeave={onDayMouseLeaveHandler}
        />
        <Link
          className="btn btn-accent"
          state={selectedDays}
          to="/business/work-time/edit"
        >
          Править
        </Link>
        {hovered && <DayTooltip time={myTime} />}
      </div>
    </BusinessLayout>
  );
};

export default BusinessWorkTimeSpec;
