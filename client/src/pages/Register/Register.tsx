import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SectionTitle from "../../components/shared/SectionTitle";
import { Link } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

interface User {
  name: string;
  email: string;
  password: string;
  photo: string;
}

  const handleChange = (e) => {
    setShowPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;
    const newUser:User = { name, email, password, photo };
    console.log(newUser)
  };
  return (
    <div className="flex flex-col items-center -z-10  bg-background dark:bg-dark-background px-4 mt-20">
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
                Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="Enter your Name"
              required
            />
          </div>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text text-text dark:text-dark-text mb-1">
                Photo Url
              </span>
            </label>
            <input
              type="text"
              name="photo"
              className="input input-bordered"
              placeholder="Enter your Name"
              required
            />
          </div>
          <div className="mt-2">
            Already have an account?
            <span className="font-semibold ml-1">
              <Link to={"/sign-in"}>Sign in now</Link>
            </span>
          </div>

          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out text-base md:text-lg w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
