import React from "react";
import hero from "../assets/hero.svg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="flex w-full xsm:flex-col-reverse px-3 pt-[100px] items-center justify-center gap-[60]   md:h-screen nav-bg ">
      <section className="flex md:p-5 xsm:pt-5 m flex-col gap-[24px] md:w-[35%] -fit xsm:items-center pb-6">
        <span className="md:text-[48px] text-[32px] font-bold text-wrap text-white xsm:text-center ">
          Welcome to RunRide Transportation !
        </span>
        <div className=" text-white text-xl">
          Mobility in RUN made Easier...
        </div>
        <section className=" flex gap-4">
          <Link to="/login" className="btn bg-black text-white px-5 py-2 ">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-outline-light px-5 py-2 ">
            Sign Up
          </Link>
        </section>
      </section>
      <section className="flex items-center justify-center md:p-8 w-fit">
        <img
          src={hero}
          alt="Hero Image"
          className="max-w-fit xsm:w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 animate-fade-in"
        />
      </section>
    </div>
  );
};

export default HeroSection;
