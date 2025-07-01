import React, { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import OurEventCard from "../Home/OurEventCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RxCross1 } from "react-icons/rx";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [filterByDate, setFilterByDate] = useState("");

  const handleClear = () => {
    setSearchByTitle("");
    setFilterByDate("");
    refetch(); // Refetch to reset the filters
  };

  console.log(searchByTitle, filterByDate);
  const axiosSecure = useAxiosSecure();

  const { data, loading, refetch } = useQuery({
    queryKey: ["events", searchByTitle, filterByDate],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `api/events/get-events?title=${searchByTitle}&dateFilter=${filterByDate}`
      );
      setEvents(res.data.events);

      return res.data;
    },
  });
  console.log(events);
  return (
    <div className="mt-20 container mx-auto px-4 md:px-0">
      <header>
        <SectionTitle
          heading="Our Events"
          subheading="Explore all Our Events"
        ></SectionTitle>
      </header>
      {/* filtering option */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="w-full">
          <input
            onChange={(e) => setSearchByTitle(e.target.value)}
            value={searchByTitle}
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Search by Event Title"
            required
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setFilterByDate(e.target.value)}
            value={filterByDate}
            name="filter"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a date filter</option>
            <option value="today">Today's Date</option>
            <option value="currentWeek">Current Week</option>
            <option value="lastWeek">Last Week</option>
            <option value="currentMonth">Current Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>
        <div onClick={handleClear} className="w-full relative">
          <button className="btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out text-base md:text-lg w-full">
            Clear Filters
          </button>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <RxCross1 />
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 md:mt-8 gap-6">
        {events.map((event) => (
          <OurEventCard key={event._id} event={event}></OurEventCard>
        ))}
      </section>
    </div>
  );
};

export default Events;
