const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/BVKcNrx0/event-management.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-center text-neutral-content px-4">
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-light-text dark:text-dark-text">
        Seamless Event Planning Starts Here
      </h1>
      <p className="mb-6 text-base md:text-lg">
        Organize, manage, and join events effortlessly. Whether you're hosting
        a concert, meetup, or workshop — our platform has you covered.
      </p>
      <button className="btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out md:text-xl">
        Explore Events
      </button>
    </div>
  </div>
    </div>
  );
};

export default Banner;
