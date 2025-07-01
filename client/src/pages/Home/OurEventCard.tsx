import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

const OurEventCard = ({ event }) => {
  const { eventTitle, dateAndTime, location, eventPhoto } = event;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition duration-300 ease-in-out rounded-lg overflow-hidden">
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={eventPhoto}
          alt={eventTitle}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold text-light-text dark:text-dark-text">
          {eventTitle}
        </h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mt-2">
          <FaRegCalendarAlt className="text-light-accent dark:text-dark-primary" />
          <span>{format(new Date(dateAndTime), "PPp")}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mt-1">
          <FaMapMarkerAlt className="text-light-accent dark:text-dark-primary" />
          <span>{location}</span>
        </div>
        <div className="mt-4">
          <button className="btn bg-light-accent dark:bg-dark-primary/60 text-white dark:text-dark-text border-none hover:bg-light-primary hover:dark:bg-dark-accent btn-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurEventCard;
