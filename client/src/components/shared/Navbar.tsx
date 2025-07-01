import { useContext, useEffect, useState } from "react";
import ThemeController from "./ThemeController";
import { links } from "../../utils/navlinks";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";

import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, loading, setUser, setLoading } = useAuth();
  console.log(user, loading);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  const navLinks = links.map((link) => (
    <NavLink
      key={link.id}
      to={link.to}
      className={({ isActive }) =>
        isActive
          ? "text-light-accent dark:text-dark-primary font-semibold text-base md:text-lg"
          : "text-light-text dark:text-dark-text  font-semibold text-base md:text-lg "
      }
    >
      <li className="group relative hover:text-light-primary hover:dark:text-dark-accent hover:font-semibold transition duration-300 ease-in-out">
        {link.title}
      </li>
    </NavLink>
  ));

  const handleLogOut = async (e) => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <div className="navbar container mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-10 h-10 rounded-full">
            <img
              className="w-full h-full object-cover rounded-full"
              src={logo}
              alt=""
            />
          </div>
          <Link to={"/"}>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl font-lora hidden md:inline-block">
              Gather
              <span className="text-light-accent dark:text-dark-primary ">
                Grid
              </span>
            </h1>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="navbar-end space-x-4">
        {user ? (
          <div className="">
            <Link to={"/sign-in"}>
              <button
                onClick={handleLogOut}
                className="btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out text-base md:text-lg "
              >
                Log Out
              </button>
            </Link>
          </div>
        ) : (
          <div className="">
            <Link to={"/sign-in"}>
              <button className="btn  bg-light-accent border-none dark:bg-dark-primary/60 text-light-text dark:text-dark-text hover:bg-light-primary hover:dark:bg-dark-accent shadow-none  transition duration-300 ease-in-out text-base md:text-lg ">
                Sign in
              </button>
            </Link>
          </div>
        )}
        <div className="w-10 h-10 rounded-full">
          {user && (
            <img
              className="w-full h-full object-cover rounded-full"
              src={user.photo}
              alt=""
            />
          )}
        </div>
        <ThemeController
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        ></ThemeController>
      </div>
    </div>
  );
};

export default Navbar;
