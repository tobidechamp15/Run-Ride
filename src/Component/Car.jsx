import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config"; // Ensure the correct import path
import Navbar from "./Navbar";

const Car = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

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

        // Filter drivers with vehicleType of "bus"
        const busDrivers = driversList.filter(
          (driver) => driver.vehicleType === "car"
        );

        setDrivers(busDrivers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [drivers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Bus Drivers</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drivers.map((driver) => (
            <li
              key={driver.id}
              className="bg-white rounded-lg border-1 border-black  p-6"
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Car;
