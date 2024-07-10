import React from "react";
import keke from "../assets/keke.svg";
import car from "../assets/car2.svg";
import bus from "../assets/bus.svg";

const Services = () => {
  return (
    <div className="w-full justify-center items-center flex flex-col gap-7 my-[40px]">
      <section className="flex flex-col gap-2">
        <span className="text-[40px] font-bold text-center">Our Services</span>
        <span>Choose from a variety of transportation options.</span>
      </section>
      <section className="flex gap-[40px] xsm:flex-col my-3">
        <div className=" flex flex-col gap-[12px] ">
          <div className="img-cont">
            <img src={keke} alt="" />
          </div>
          <div className=" flex flex-col gap-1 p-2">
            <span className="text-xl ">Napep</span>
            <span className="font-bold text-[20px] ">3 Passenger Ride</span>
          </div>
        </div>
        <div className=" flex flex-col gap-[12px] ">
          <div className="img-cont">
            <img src={car} alt="" />
          </div>
          <div className=" flex flex-col gap-1 p-2">
            <span className="text-xl ">Cars</span>
            <span className="font-bold text-[20px] ">5 Passenger Ride</span>
          </div>
        </div>
        <div className=" flex flex-col gap-[12px] ">
          <div className="img-cont">
            <img src={bus} alt="" />
          </div>
          <div className=" flex flex-col gap-1 p-2">
            <span className="text-xl ">Buses</span>
            <span className="font-bold text-[20px] ">9 Passenger Ride</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
