import React, { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const TypedDatePicker = DatePicker as unknown as React.FC<any>;
const AddEvent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventTitle = e.target.eventTitle.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const photoURL = e.target.photoURL.value;
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
      photoURL,
      dateAndTime,
    };

    try {
      const response = await axiosSecure.post(
        "api/events/add-event",
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
        <SectionTitle heading="Add Events" subheading=""></SectionTitle>
      </header>
      <section>
        <div className="card bg-base-100 w-full shadow-2xl  mx-auto lg:w-[70%] ">
          <form
            onSubmit={handleSubmit}
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
                type="text"
                name="location"
                className="input input-bordered w-full"
                placeholder="Enter your photourl"
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
                Add Event
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddEvent;
