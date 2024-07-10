import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const LandingNav = () => {
  return (
    <div className="flex nav-bg justify-between py-[25px] px-6 md:px-[100px] items-center md:fixed w-full z-10 ">
      <img src={logo} alt="" />
      <div className="hidden md:flex justify-center items-center">
        <div className="flex text-white gap-[40px] justify-between p-3 items-center  ">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <Link
          to="/signup"
          className="bg-black flex items-center justify-center h-fit w-fit px-6   py-2 rounded-lg text-white"
        >
          Get Started
        </Link>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="text-3xl text-white flex md:hidden "
      />
    </div>
  );
};

export default LandingNav;
