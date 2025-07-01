import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const OurEventCard = ({ event, refetch }) => {
  const { _id, eventTitle, dateAndTime, location, eventPhoto, attendeeCount } =
    event;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleJoin = async () => {
    try {
      const result = await axiosSecure.patch(`api/events/join/${_id}`);
      if (result.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have joined successfully. Please, be there on time",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      refetch();
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mt-1">
          <span>🧍‍♂️ {attendeeCount} attending</span>
        </div>
        <div className="mt-4 flex justify-between">
          <Link to={`/details/${_id}`}>
            {" "}
            <button className="btn bg-light-accent dark:bg-dark-primary/60 text-white dark:text-dark-text border-none hover:bg-light-primary hover:dark:bg-dark-accent btn-sm">
              View Details
            </button>
          </Link>
          {user && user?.email ? (
            <button
              onClick={handleJoin}
              className="btn bg-light-accent dark:bg-dark-primary/60 text-white dark:text-dark-text border-none hover:bg-light-primary hover:dark:bg-dark-accent btn-sm"
            >
              Join Event
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default OurEventCard;
