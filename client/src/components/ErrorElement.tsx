import React from "react";
import { Link } from "react-router";

const ErrorElement = () => {
  return (
    <div className="container mx-auto mt-20 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg mb-6">Sorry, an unexpected error occurred.</p>

      <button
        className="mt-6 btn bg-light-accent text-white hover:bg-light-primary"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
      <Link to={"/"}>
        <button className="mt-6 btn bg-light-accent text-white hover:bg-light-primary">
          Go back to Home Page
        </button>
      </Link>
    </div>
  );
};

export default ErrorElement;
