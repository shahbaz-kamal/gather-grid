import { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyEventCard from "./MyEventCard";

const MyEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [myEvents, setMyEvents] = useState([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-events"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `api/events/my-events?email=${user?.email}`
      );
      setMyEvents(res.data.events);

      return res.data;
    },
  });

  console.log(myEvents);

  return (
    <div className="mt-20 container mx-auto">
      <header>
        <SectionTitle
          heading="My Events"
          subheading="All events you've joined or organized"
        ></SectionTitle>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-8">
        {myEvents.map((singleEvent) => (
          <MyEventCard
            key={singleEvent._id}
            singleEvent={singleEvent} refetch={refetch}
          ></MyEventCard>
        ))}
      </section>
    </div>
  );
};

export default MyEvents;
