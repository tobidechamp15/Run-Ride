import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config"; // Ensure the correct import path
import Navbar from "./Navbar";
import callImg from "../assets/callImg.svg";
import chatImg from "../assets/chatImg.svg";

const Car = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingDriver, setBookingDriver] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Fetch drivers
        const driversCollection = collection(db, "drivers");
        const driverSnapshot = await getDocs(driversCollection);
        const driversList = driverSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter drivers with vehicleType of "car"
        const carDrivers = driversList.filter(
          (driver) => driver.vehicleType === "car"
        );

        setDrivers(carDrivers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleBookRide = (driver) => {
    // Implement your booking logic here
    setBookingDriver(driver);
    console.log("Booking ride with driver:", driver.name);
  };

  const formatPhoneNumberForWhatsApp = (phoneNumber) => {
    // Assuming the phone number is already in the correct format
    // without the '+' sign and contains the country code.
    return phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Car Drivers</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drivers.map((driver) => (
            <li
              key={driver.id}
              className="bg-white rounded-lg border-1 border-black p-6"
            >
              <div className="flex items-center mb-4">
                {driver.imageSrc && (
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={driver.imageSrc}
                    alt={`${driver.name}`}
                  />
                )}
                <div>
                  <p className="text-xl font-semibold">{driver.name}</p>
                  <p className="text-gray-600">{driver.userName}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-800">
                  <strong>Sex:</strong> {driver.sex}
                </p>
                <p className="text-gray-800">
                  <strong>Mobile Number:</strong> {driver.mobileNumber}
                </p>
                <p className="text-gray-800">
                  <strong>Vehicle Type:</strong> {driver.vehicleType}
                </p>
                <p className="text-gray-800">
                  <strong>Bank Name:</strong> {driver.bankName}
                </p>
                <p className="text-gray-800">
                  <strong>Account Name:</strong> {driver.accountName}
                </p>
                <p className="text-gray-800">
                  <strong>Account Number:</strong> {driver.accountNumber}
                </p>
              </div>
              <div className="flex items-center">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    driver.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {driver.isAvailable ? "Available" : "Unavailable"}
                </span>
                {driver.isAvailable && (
                  <>
                    <button
                      onClick={() => handleBookRide(driver)}
                      className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Book Ride
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {bookingDriver && (
        <div className="h-screen fixed top-0 left-0 flex justify-center items-center w-full bg-black bg-opacity-75">
          <div className="bg- p-8 rounded-lg flex gap-16">
            <img
              src={callImg}
              alt="Call"
              onClick={() =>
                (window.location.href = `tel:${bookingDriver.mobileNumber}`)
              }
              className="cursor-pointer"
            />
            <img
              src={chatImg}
              alt="Chat"
              onClick={() =>
                (window.location.href = `https://wa.me/${formatPhoneNumberForWhatsApp(
                  bookingDriver.mobileNumber
                )}`)
              }
              className="cursor-pointer"
            />
            <button
              onClick={() => setBookingDriver(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Car;
