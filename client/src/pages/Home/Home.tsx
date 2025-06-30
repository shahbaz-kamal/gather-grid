import Banner from "./Banner";
import FAQ from "./FAQ";
import OurEvents from "./OurEvents";
import Process from "./Process";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className="space-y-6 md:space-y-10">
      <section>
        <Banner></Banner>
      </section>
      <section>
        <OurEvents></OurEvents>
      </section>
      <section>
        <Process></Process>
      </section>
      <section>
        <Testimonial></Testimonial>
      </section>
      <section>
        <FAQ></FAQ>
      </section>
    </div>
  );
};

export default Home;
