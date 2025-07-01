import { useParams } from "react-router";
import SectionTitle from "../../components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Loading from "../../components/shared/Loading";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const axiosSecure = useAxiosSecure();

  const handleJoin = async () => {
    try {
      const result = await axiosSecure.patch(`api/events/join/${id}`);
      if (result.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have joined successfully. Please, be there on time",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/events/get-single-event/${id}`);
      return res.data.event;
    },
    enabled: !!id, // only run if id exists
  });




  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError || !data) {
    return <p className="text-center text-lg text-red-500 mt-20">Failed to load event.</p>;
  }
  const {
    eventTitle,
    name: createdBy,
    dateAndTime,
    location,
    eventPhoto,
    attendeeCount,
    description,
  } = data;

  return (
    <div className="mt-20 container mx-auto px-4">
      <SectionTitle heading="Event Details" />

      <div className="bg-base-100 shadow-xl rounded-xl overflow-hidden md:flex">
        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={eventPhoto}
            alt={eventTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Info */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-light-text dark:text-dark-text">
              {eventTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Created by: <span className="font-medium">{createdBy}</span>
            </p>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mb-2">
              <FaRegCalendarAlt className="text-light-accent dark:text-dark-primary" />
              <span>{format(new Date(dateAndTime), "PPpp")}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mb-2">
              <FaMapMarkerAlt className="text-light-accent dark:text-dark-primary" />
              <span>{location}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 gap-2 mb-4">
              <FaUserFriends className="text-light-accent dark:text-dark-primary" />
              <span>{attendeeCount} attending</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300">{description}</p>
          </div>

          <div className="mt-6">
            <button onClick={handleJoin} className="btn bg-light-accent dark:bg-dark-primary/60 text-white dark:text-dark-text border-none hover:bg-light-primary hover:dark:bg-dark-accent">
              Join Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
