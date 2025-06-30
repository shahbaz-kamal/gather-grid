import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";

const FAQ = () => {
  return (
    <div className="container mx-auto">
      <header>
        {" "}
        <SectionTitle
          heading="Frequently Asked Questions"
          subheading=""
        ></SectionTitle>
      </header>
      <div className="collapse collapse-arrow bg-light-background dark:bg-neutral border border-light-accent/60 dark:border-dark-accent/60">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold text-light-text dark:text-dark-text">
        Can I join multiple events?
        </div>
        <div className="collapse-content text-sm text-light-text/80 dark:text-dark-text/80">
        Yes, you can join as many events as you like, but you can join each event only once.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-light-background dark:bg-neutral border border-light-accent/60 dark:border-dark-accent/60">
        <input type="radio" name="my-accordion-2"  />
        <div className="collapse-title font-semibold text-light-text dark:text-dark-text">
        Is it free to use the platform?
        </div>
        <div className="collapse-content text-sm text-light-text/80 dark:text-dark-text/80">
        Absolutely! Creating an account, browsing events, and joining them is completely free.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-light-background dark:bg-neutral border border-light-accent/60 dark:border-dark-accent/60">
        <input type="radio" name="my-accordion-2"  />
        <div className="collapse-title font-semibold text-light-text dark:text-dark-text">
        How do I add my own event?
        </div>
        <div className="collapse-content text-sm text-light-text/80 dark:text-dark-text/80">
        Once logged in, navigate to the 'Add Event' page, fill in the details, and submit to host your event.
        </div>
      </div>
      <div className="collapse collapse-arrow bg-light-background dark:bg-neutral border border-light-accent/60 dark:border-dark-accent/60">
        <input type="radio" name="my-accordion-2"  />
        <div className="collapse-title font-semibold text-light-text dark:text-dark-text">
        Can I update or delete my events?
        </div>
        <div className="collapse-content text-sm text-light-text/80 dark:text-dark-text/80">
        Yes, you can manage your events from the 'My Event' page, where you can update or delete your events anytime.
        </div>
      </div>
    
    </div>
  );
};

export default FAQ;
