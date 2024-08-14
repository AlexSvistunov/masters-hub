import { Link } from "react-router-dom"

const Recording = ({recording}) => {
  return (
    <div
    className="p-5 bg-base-200 flex flex-col items-start rounded-xl relative"
    key={recording.id}
  >
    <span className="font-bold block text-xl mb-2">
      {recording.date} {recording.time_start} -{" "}
      {recording.time_end}
    </span>

    <div className="mb-2 flex flex-col items-start gap-1">
      <Link
        to={`/profile/${recording.profile_master.id}`}
        className="text-lg hover:underline"
      >
        <span>{recording.profile_master.name}</span>
      </Link>

      {recording.service.specialist && (
        <Link
          className="inline-block hover:underline"
          to={`/profile/${recording.profile_master.id}/specialist/${recording.service.specialist.id}`}
        >
          Специалист: {recording.service.specialist.name}
        </Link>
      )}
    </div>
    <div className="mt-2 flex gap-2 justify-between w-full">
      <span className="font-bold">{recording.service.title}</span>
      <span className="text-gray-500">
        {recording.service.price} RUB{" "}
      </span>
    </div>

    <button className="btn btn-circle absolute top-2 right-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
  )
}

export default Recording