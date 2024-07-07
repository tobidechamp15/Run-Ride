import React from "react";
import Navbar from "./Navbar";
import keke from "../assets/keke.svg";
import car from "../assets/car.svg";
import bus from "../assets/bus.svg";
import { Link } from "react-router-dom";

const Vehicles = () => {
  return (
    <div>
      <Navbar />
      <div className="flex  flex-wrap gap-5 w-full items-center justify-center my-5">
        <section className="flex justify-center items-center flex-col border  gap-[142px] border-black py-[48px] px-[59px]">
          <img src={keke} alt="" />
          <Link className="text-white bg-black p-3 rounded-[8px] ">
            View All
          </Link>
        </section>
        <section className="flex justify-center items-center flex-col border  gap-[142px] border-black py-[48px] px-[59px]">
          <img src={car} alt="" />
          <Link className="text-white bg-black p-3 rounded-[8px] ">
            View All
          </Link>
        </section>
        <section className="flex justify-center items-center flex-col border  gap-[142px] border-black py-[48px] px-[59px]">
          <img src={bus} alt="" />
          <Link
            to="/vehicles/bus"
            className="text-white bg-black p-3 rounded-[8px] "
          >
            View All
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Vehicles;
