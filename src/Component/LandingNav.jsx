import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const LandingNav = () => {
  return (
    <div className="flex nav-bg justify-between py-[25px] px-6 md:px-[100px] items-center fixed w-full z-10 ">
      <img src={logo} alt="" />
      <div className="hidden md:flex">
        <div className="flex text-white gap-[40px] justify-between p-3 items-center  ">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <Link className="text-white bg-black py-[12px] px-[55px] rounded-[8px]">
          Sign Up
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
