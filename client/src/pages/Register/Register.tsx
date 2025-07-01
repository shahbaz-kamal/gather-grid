import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SectionTitle from "../../components/shared/SectionTitle";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { setLoading, loading } = useAuth();

  interface User {
    name: string;
    email: string;
    password: string;
    photo: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    const photo = (e.target as HTMLFormElement).photo.value;
    const newUser: User = { name, email, password, photo };
    console.log(newUser);
    setLoading(true);
    // verifying password
    const regexPass = /^.{6,}$/;
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;

    if (!regexPass.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should be at least 6 characters",
      });
      return;
    }
    if (!regexUpperCase.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should contain at least 1 uppercase letter",
      });
      return;
    }
    if (!regexLowerCase.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should contain at least 1 lowercase letter",
      });
      return;
    }
    const result = await axiosSecure.post("api/auth/register", newUser);
    if (result.data.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration Successfull",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      navigate("/sign-in");
      // Redirect or show success message
      return;
    } else if (result.data.message === "Email already exists") {
      Swal.fire({
        position: "top-end",
        title: "Error!",
        text: `${result.data.message}. Please Sign in`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/sign-in");
      // Handle error
      return;
    }
  };
  return (
    <div className="flex flex-col items-center -z-10  bg-background dark:bg-dark-background px-4 mt-20">
      <header>
        <SectionTitle
          heading="Welcome Back to GatherGrid"
          subheading="Plan, join, and manage your events — all in one place."
        ></SectionTitle>
        <Helmet>
          <title>Register | Gather Grid</title>
        </Helmet>
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
              placeholder="Enter your photourl"
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
