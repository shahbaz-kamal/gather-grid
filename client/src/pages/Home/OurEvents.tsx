import { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import OurEventCard from "./OurEventCard";
import { Link } from "react-router";

const OurEvents = () => {
  const [events, setEvents] = useState([]);

  const axiosSecure = useAxiosSecure();

  const { data, loading, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("api/events/get-events");
      setEvents(res.data.events);
      return res.data;
    },
  });
  console.log(events);

  return (
    <div className="container mx-auto">
      <header className="mb-6">
        <SectionTitle
          heading="Our Events"
          subheading="Explore  Our featured Events"
        ></SectionTitle>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 md:mt-8 gap-6">
        {events.slice(0, 8).map((event) => (
          <OurEventCard
            key={event._id}
            event={event}
            refetch={refetch}
          ></OurEventCard>
        ))}
      </section>
      <div className="text-center">
        <Link to={"/events"}>
          {" "}
          <button className="mt-3  btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out text-base md:text-lg ">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OurEvents;
