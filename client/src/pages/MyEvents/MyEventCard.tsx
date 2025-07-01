import React from "react";
import { format } from "date-fns";
import {
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyEventCard = ({ singleEvent, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { _id, eventTitle, eventPhoto, dateAndTime, location, attendeeCount } =
    singleEvent;
  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        const response = await axiosSecure.delete(`api/events/delete/${_id}`);
        if (response.data.success) {
          refetch();
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      Swal.fire({
        title: error.message,
        icon: "error",
        draggable: true,
      });
    }
  };
  return (
    <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
      {/* Event Image */}
      <figure className="h-44 w-full overflow-hidden">
        <img
          src={eventPhoto}
          alt={eventTitle}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Event Content */}
      <div className="card-body p-4 relative">
        {/* Edit/Delete Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="text-blue-600 hover:text-blue-800" title="Edit">
            <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800"
            title="Delete"
          >
            <FaTrashAlt />
          </button>
        </div>

        <h2 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1">
          {eventTitle}
        </h2>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mt-1">
          <FaRegCalendarAlt className="text-light-accent dark:text-dark-primary" />
          <span>{format(new Date(dateAndTime), "PPpp")}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mt-1">
          <FaMapMarkerAlt className="text-light-accent dark:text-dark-primary" />
          <span>{location}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mt-1 mb-2">
          <FaUsers className="text-light-accent dark:text-dark-primary" />
          <span>{attendeeCount} Attending</span>
        </div>
        <Link to={`/details/${_id}`}>
          {" "}
          <button className="btn bg-light-accent dark:bg-dark-primary/60 text-white dark:text-dark-text border-none hover:bg-light-primary hover:dark:bg-dark-accent btn-sm">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyEventCard;
