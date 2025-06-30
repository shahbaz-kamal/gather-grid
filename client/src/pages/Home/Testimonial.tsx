import { useEffect, useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";

const Testimonial = () => {
  const [testimonialData, setTestimonial] = useState([]);

  useEffect(() => {
    fetch("/testimonial.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        return res.json();
      })
      .then((data) => setTestimonial(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-background dark:bg-dark-background container mx-auto">
      <header className="mb-10">
        <SectionTitle heading="Testimonials" subheading="What our users say" />
      </header>
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {testimonialData.length === 0 ? (
          <p className="text-center text-text dark:text-dark-text">
            Loading testimonials...
          </p>
        ) : (
          testimonialData.map(({ id, name, title, imageUrl, comment }) => (
            <div
              key={id}
              className="bg-white dark:bg-neutral p-6 rounded-lg shadow border border-light-accent/60 dark:border-dark-accent/60 dark:border-dark-border"
            >
              <div className="flex items-center mb-4">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-light-text dark:text-dark-text">
                    {name}
                  </h4>
                  <p className="text-sm text-light-text/80 dark:text-dark-text/80">
                    {title}
                  </p>
                </div>
              </div>
              <p className="text-text dark:text-dark-text/80 italic">
                "{comment}"
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Testimonial;
