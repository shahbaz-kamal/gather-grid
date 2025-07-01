import React, { use, useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const { setUser, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //handling sign in
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

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
    const userInfo = { email, password };
    try {
      setLoading(true);
      const result = await axiosSecure.post("api/auth/sign-in", userInfo);
      if (result.data.success) {
        console.log(result.data);
        const token = result.data.token;
        localStorage.setItem("token", token);
        setLoading(true);

        const userRes = await axiosSecure.get("api/auth/currentUser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign in Success",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        const form = e.target as HTMLFormElement;
        (form.elements.namedItem("email") as HTMLInputElement).value = "";
        (form.elements.namedItem("password") as HTMLInputElement).value = "";
        navigate(from, { replace: true });
        return;
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
      return;
    }
  };

  return (
    <div className="flex flex-col items-center   bg-background dark:bg-dark-background px-4 mt-20">
      <header>
        <SectionTitle
          heading="Welcome Back to GatherGrid"
          subheading="Plan, join, and manage your events — all in one place."
        ></SectionTitle>
        <Helmet>
          <title>Sign in | Gather Grid</title>
        </Helmet>
      </header>
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form onSubmit={handleSignIn} className="card-body">
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
