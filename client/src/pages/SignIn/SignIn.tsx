import React, { useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", formData);
    // Add your login logic here (API call, context, etc.)
  };

  return (
    <div className="flex flex-col items-center   bg-background dark:bg-dark-background px-4 mt-20">
      <header>
        <SectionTitle
          heading="Welcome Back to GatherGrid"
          subheading="Plan, join, and manage your events — all in one place."
        ></SectionTitle>
      </header>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-text dark:text-dark-text mb-1">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-text dark:text-dark-text mb-1">
                Password
              </span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered  pr-5"
              placeholder="Enter your password"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-2 right-6 z-10"
            >
              {!showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </div>
          </div>
          <div className="mt-2">
            Don't have an account?{" "}
            <span className="font-semibold ml-1">
              <Link to={"/register"}>Register now</Link>
            </span>
          </div>

          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out text-base md:text-lg w-full"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
