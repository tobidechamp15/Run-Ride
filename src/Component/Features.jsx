import React from "react";
import environsFriend from "../assets/environFrie.svg";
import convenience from "../assets/convenience.svg";
import pricing from "../assets/pricing.svg";

const Features = () => {
  return (
    <div className="flex w-full xsm:flex-col p-3 items-center justify-center my-[60px] gap-[60px] container">
      <section className="flex flex-col justify-center md:w-[39%] gap-6">
        <span className="text-[40px] font-bold ">Why Choose Us</span>
        <span className=" text-xl font-normal">
          Embarking on your academic journey is an exciting adventure, and at
          Redeemers University, we are here to ensure that navigating your
          school is a breeze. Introducing RunRide, your trusted companion for
          seamless campus mobility .
        </span>
        <span className="text-white bg-black py-3 px-[39px] rounded-[8px] w-fit">
          Learn More
        </span>
      </section>
      <section className="md:w-[39%] flex flex-col gap-[40px]">
        <section className="flex gap-[16px] border border-[#E8E8E8] rounded-md p-4">
          <img src={environsFriend} alt="" />
          <div className="flex flex-col gap-[8px]">
            <span className="text-[20px] font-bold ">
              Environmentally Friendly
            </span>
            <span className="font-normal text-base">
              Our fleet consists of electric and hybrid vehicles, reducing
              carbon emissions.
            </span>
          </div>
        </section>
        <section className="flex gap-[16px] border border-[#E8E8E8] rounded-md p-4">
          <img src={convenience} alt="" />
          <div className="flex flex-col gap-[8px]">
            <span className="text-[20px] font-bold ">Convenience</span>
            <span className=" font-normal text-base">
              Book your rides easily through our user-friendly website.
            </span>
          </div>
        </section>
        <section className="flex gap-[16px] border border-[#E8E8E8] rounded-md p-4">
          <img src={pricing} alt="" />
          <div className="flex flex-col gap-[8px]">
            <span className="text-[20px] font-bold ">Standard Pricing</span>
            <span className=" font-normal text-base">
              Prices are in correlation with Redeemers University set prices for
              Transportation within the campus
            </span>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Features;
