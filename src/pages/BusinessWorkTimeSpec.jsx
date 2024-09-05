import { Link, useParams } from "react-router-dom";
import BusinessLayout from "../components/BusinessLayout";
import { DayPicker } from "react-day-picker";
import { useState } from "react";

import { Pencil } from "lucide-react";

const BusinessWorkTimeSpec = () => {
  const { id } = useParams();

  const myTime = [
    "11:00",
    "12:00",
    "11:00",
    "12:00",
    "11:00",
    "12:00",
    "11:00",
    "12:00",
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  console.log(selectedDays);

  return (
    <BusinessLayout>
      <div className="flex items-start gap-10 flex-col laptop:flex-row">
        <DayPicker mode="single" onSelect={(day) => setSelectedDays(day)} />

        <div className="p-7 px-9 bg-base-200 max-w-lg w-full flex flex-wrap gap-2 rounded-xl min-h-40 items-start relative">
          {myTime?.map((time) => (
            <>
              <div
                key={time}
                className="p-2 border border-2 border-accent rounded-lg"
              >
                {time}
              </div>
            </>
          ))}

          <Link state={selectedDays} to={`/business/work-time/${id}/edit`}>
            <Pencil color={"#00CDB7"} className="absolute top-2 right-2" />
          </Link>
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessWorkTimeSpec;
