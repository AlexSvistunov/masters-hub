import { DayPicker } from "react-day-picker";
import BusinessLayout from "../components/BusinessLayout";
import "react-day-picker/style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
// import CustomDay from "../components/CustomDay";
import DayTooltip from "../components/DayTooltip";

const BusinessWorkTime = () => {
  const myTime = [
    '11:00',
    '12:00'
  ]

  // date, timestart, timeend

  const [selectedDays, setSelectedDays] = useState([])
  const [hovered, setHovered] = useState(false)
  console.log(selectedDays)

  const onDayMouseEnterHandler = (e) => {
    setHovered(true)
  }

  const onDayMouseLeaveHandler = (e) => {
    setHovered(false)
  }

  return (
    <div>
      <BusinessLayout>
        <DayPicker mode="multiple" onSelect={day => setSelectedDays(day)} onDayMouseEnter={onDayMouseEnterHandler} onDayMouseLeave={onDayMouseLeaveHandler} />
          <Link className="btn btn-accent" state={selectedDays} to='/business/work-time/edit'>Править</Link>
          {hovered && <DayTooltip time={myTime}/>}
      </BusinessLayout>
    </div>
  );
};

export default BusinessWorkTime;
