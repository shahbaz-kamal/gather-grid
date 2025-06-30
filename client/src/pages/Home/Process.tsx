import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { FaUserPlus, FaCalendarPlus, FaSearch, FaUsers } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-3xl text-light-primary dark:text-dark-accent" />,
    title: "Create Account",
    description: "Sign up easily with your email and photo to get started.",
  },
  {
    icon: <FaCalendarPlus className="text-3xl  text-light-primary dark:text-dark-accent" />,
    title: "Add Events",
    description: "Host your own events by providing title, date, and location.",
  },
  {
    icon: <FaSearch className="text-3xl  text-light-primary dark:text-dark-accent" />,
    title: "Browse Events",
    description: "Use filters or search to find the events that interest you.",
  },
  {
    icon: <FaUsers className="text-3xl  text-light-primary dark:text-dark-accent" />,
    title: "Join & Enjoy",
    description: "Click ‘Join’ and be a part of exciting experiences!",
  },
];

const Process = () => {
  return (
    <section className=" bg-background dark:bg-dark-background container mx-auto">
      <header className="mb-10">
        <SectionTitle
          heading="How It Works"
          subheading="Get started in 4 simple steps"
        />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white dark:bg-neutral shadow-md rounded-lg p-6 text-center border border-light-accent/60 dark:border-dark-accent/60"
          >
            <div className="mb-4 flex justify-center ">{step.icon}</div>
            <h3 className="text-lg font-semibold text-text dark:text-dark-text mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-text dark:text-dark-text/80">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
