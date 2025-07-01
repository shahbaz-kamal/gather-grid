import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../components/shared/SectionTitle";
import DatePicker from "react-datepicker";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../../components/shared/Loading";

const TypedDatePicker = DatePicker as unknown as React.FC<any>;

const UpdateEvent = () => {
  const { id } = useParams<{ id: string }>();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [singleData, setSingleData] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/events/get-single-event/${id}`);
      return res.data.event;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (data?.dateAndTime) {
      const fullDate = new Date(data.dateAndTime);
      setSelectedDate(fullDate); // sets the full date
      setSelectedTime(fullDate); // same Date object, but used as time
    }
  }, [data]);
  if (isLoading || !data) {
    return <Loading />;
  }
  console.log(data);
  const { _id, eventTitle, eventPhoto, dateAndTime, location, attendeeCount } =
    data;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const eventTitle = (e.target as HTMLFormElement).eventTitle.value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (e.target as HTMLFormElement).email.value;
    const location = (e.target as HTMLFormElement).location.value;
    const description = (e.target as HTMLFormElement).description.value;
    const eventPhoto = (e.target as HTMLFormElement).photoURL.value;
    if (!selectedDate || !selectedTime) {
      Swal.fire({
        title: "Please select both Date And Time",
        icon: "error",
        draggable: true,
      });
      return;
    }

    // Combine selected date and time into one Date object
    const dateAndTime = new Date(selectedDate);
    dateAndTime.setHours(selectedTime.getHours());
    dateAndTime.setMinutes(selectedTime.getMinutes());
    dateAndTime.setSeconds(0);
    dateAndTime.setMilliseconds(0);

    const eventData = {
      eventTitle,
      name,
      email,
      location,
      description,
      eventPhoto,
      dateAndTime,
    };

    try {
      const response = await axiosSecure.patch(
        `api/events/update-event/${_id}`,
        eventData
      );
      console.log(response);
      if (response.data.success) {
        Swal.fire({
          title: "Event Added Successfully",
          icon: "success",
          draggable: true,
        });

        setSelectedDate(null);
        setSelectedTime(null);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="mt-20 container mx-auto px-4 md:px-0">
      <header>
        <SectionTitle heading="Update Events" subheading=""></SectionTitle>
      </header>
      <section>
        <div className="card bg-base-100 w-full shadow-2xl  mx-auto lg:w-[70%] ">
          <form
            onSubmit={handleUpdate}
            className="card-body  grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1">
                  Event title
                </span>
              </label>
              <input
                type="text"
                name="eventTitle"
                defaultValue={eventTitle}
                className="input input-bordered w-full"
                placeholder="Enter your Event Title"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1">
                  Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={user?.name || ""}
                className="input input-bordered w-full"
                placeholder="Enter your Name"
                required
              />
            </div>

            <div className="form-control relative flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                className="input input-bordered  pr-5 w-full"
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1">
                  Event Date
                </span>
              </label>

              <TypedDatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="input input-bordered w-full"
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1">
                  Event Time
                </span>
              </label>
              <TypedDatePicker
                selected={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="input input-bordered w-full"
                placeholderText="Select time"
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1">
                  Location
                </span>
              </label>
              <input
                defaultValue={location}
                type="text"
                name="location"
                className="input input-bordered w-full"
                placeholder="Enter Event location"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1 ">
                  Description
                </span>
              </label>
              <input
                defaultValue={data?.description}
                type="text"
                name="description"
                className="input input-bordered w-full"
                placeholder="Enter event Description"
                required
              />
            </div>
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text text-text dark:text-dark-text mb-1">
                  Event photo URL
                </span>
              </label>
              <input
                defaultValue={eventPhoto}
                type="text"
                name="photoURL"
                className="input input-bordered w-full"
                placeholder="Enter Event photourl"
                required
              />
            </div>

            <div className="form-control mt-4 md:col-span-2">
              <button
                type="submit"
                className="btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out text-base md:text-lg w-full "
              >
                Update Event
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateEvent;
