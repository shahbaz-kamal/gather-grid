import React from "react";
import { BsTwitterX } from "react-icons/bs";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import logo from '../../../src/assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 mt-8 md:mt-10">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center md:justify-evenly  md:items-center gap-6">
        {/* Logo and Name */}
        <div className="flex items-center justify-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-14 rounded-full"
          />
          <span className="text-xl font-semibold">
            {" "}
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl font-lora">
              Gather
              <span className="text-light-accent dark:text-dark-primary ">
                Grid
              </span>
            </h1>
          </span>
        </div>

        {/* Address */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-medium mb-2">Address</h4>
          <p className="text-sm leading-relaxed text-center md:text-start">
            House #565, Road #17, Block: F<br />
            Basundhara Residential Area, Dhaka-1229
            <br />
            Bangladesh
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-medium mb-2">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com/tamim.chowdhury.543/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-[#1877F2] hover:text-opacity-85" />
            </a>
            <a
              href="https://x.com/tamim120096"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX className="text-[#FFFFFF] hover:text-opacity-85" />
            </a>
            <a
              href="https://www.instagram.com/tamimchowdhury10/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-[#FD1D1D] hover:text-opacity-85" />
            </a>
            <a
              href="https://www.linkedin.com/in/shahbaz-kamal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-[#0077B5] hover:text-opacity-85" />
            </a>
            <a
              href="https://github.com/shahbaz-kamal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-[#9EECFF] hover:text-opacity-85" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} Gather Grid. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
