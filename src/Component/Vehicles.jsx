import React from "react";
import Navbar from "./Navbar";
import keke from "../assets/keke.svg";
import car from "../assets/car.svg";
import bus from "../assets/bus.svg";
import { Link } from "react-router-dom";

const Vehicles = () => {
  return (
    <div className="flex items-center flex-col w-full">
      <Navbar />
      <div className="md:w-[60%] self-center flex mt-[48px]">
        <input
          type="text"
          className="rounded-[20px] py-[24px] px-[48px] form-control border-1 border-black"
          placeholder="Search Drivers Name"
        />
      </div>
      <div className="flex  flex-wrap gap-5 w-full xsm:px-[24px] items-center justify-center my-5">
        <section className="flex justify-center items-center flex-col border  gap-[24px] rounded-lg border-black py-[48px] px-[59px]">
          <img src={keke} alt="" />
          <div className="flex flex-col gap-4 items-start w-full">
            <span className="text-[16px] text-[#808080]">Napep</span>
            <span className="text-[20px] font-semibold ">3 Passenger Ride</span>
          </div>
          <Link
            to="/vehicles/keke"
            className="text-white bg-black p-3 rounded-[8px] mt-[35px]"
          >
            View All
          </Link>
        </section>
        <section className="flex justify-center items-center flex-col border  gap-[24px] rounded-lg border-black py-[48px] px-[59px]">
          <img src={car} alt="" />
          <div className="flex flex-col gap-4 items-start w-full">
            <span className="text-[16px] text-[#808080]">Cars</span>
            <span className="text-[20px] font-semibold ">5 Passenger Ride</span>
          </div>
          <Link
            to="/vehicles/car"
            className="text-white bg-black p-3 rounded-[8px] mt-[35px]"
          >
            View All
          </Link>
        </section>
        <section className="flex justify-center items-center flex-col border  gap-[24px] rounded-lg border-black py-[48px] px-[59px]">
          <img src={bus} alt="" />
          <div className="flex flex-col gap-4 items-start w-full">
            <span className="text-[16px] text-[#808080]">Buses</span>
            <span className="text-[20px] font-semibold ">9 Passenger Ride</span>
          </div>
          <Link
            to="/vehicles/bus"
            className="text-white bg-black p-3 rounded-[8px] mt-[35px]"
          >
            View All
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Vehicles;
