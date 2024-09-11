import { Link, useParams } from "react-router-dom";
import BusinessLayout from "../components/business/BusinessLayout";
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
  const [selected, setSelected] = useState(new Date())

  return (
    <BusinessLayout>
      <div className="flex items-start gap-10 flex-col laptop:flex-row">
        <DayPicker mode="single" selected={selected} onSelect={(day) => setSelectedDays(day)} />

        <div className="py-4 px-9 border border-gray-700 max-w-lg w-full flex flex-wrap gap-2 rounded-xl min-h-32 items-start relative">
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
