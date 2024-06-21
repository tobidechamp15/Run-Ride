import React from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center nav-bg p-[20px]">
      <img src={logo} alt="" />
      <div className="hidden md:flex  items-center justify-center mx-6 gap-[20px]">
        <span className="bg-black p-[12px] text-white rounded-[8px]">
          Sign Out
        </span>
        <img src={avatar} alt="" />
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="flex md:hidden text-white "
        size="2x"
      />
    </nav>
  );
};

export default Navbar;
