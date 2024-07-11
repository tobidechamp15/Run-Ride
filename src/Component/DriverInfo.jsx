import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, userId } from "./firebase/config"; // Ensure the correct import path for your Firebase config

const DriverInfo = () => {
  const [userName, setUserName] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isAvailable, setIsAvailable] = useState(false); // State to manage availability status

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        const driverDocRef = doc(db, "drivers", userId);
        const userDocRef = doc(db, "users", userId);

        try {
          const [driverDoc, userDoc] = await Promise.all([
            getDoc(driverDocRef),
            getDoc(userDocRef),
          ]);

          if (driverDoc.exists()) {
            console.log(driverDoc.data());
            setUserName(driverDoc.data().userName);
            setSex(driverDoc.data().sex);
            setAccountName(driverDoc.data().accountName);
            setAccountNumber(driverDoc.data().accountNumber);
            setVehicleType(driverDoc.data().vehicleType);
            setMobileNumber(driverDoc.data().mobileNumber);
            setImageSrc(driverDoc.data().imageSrc);
            setBankName(driverDoc.data().bankName);
            setIsAvailable(driverDoc.isAvailable || false); // Fetch availability status
          }

          if (userDoc.exists()) {
            console.log(userDoc.data());
            setName(userDoc.data().name);
          }
        } catch (error) {
          console.error("Error fetching user info: ", error);
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  const handleAvailabilityToggle = async () => {
    if (userId) {
      const driverDocRef = doc(db, "drivers", userId);

      try {
        await updateDoc(driverDocRef, {
          isAvailable: !isAvailable,
        });
        setIsAvailable(!isAvailable); // Toggle the availability state
      } catch (error) {
        console.error("Error updating availability status: ", error);
      }
    }
  };
  return (
    <div className="flex items-center justify-center flex-col container py-4">
      <div className="text-4xl text-black font-medium my-6">Driver's Info</div>
      <form className="w-[60%] xsm:w-full py-4 flex flex-ol gap-7 items-center flex-wrap">
        <div className="border-dashed border-2 w-fit p-4 border-[#bdbdbd] flex flex-col cursor-pointer">
          <img src={imageSrc} alt="" />
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full font-bold"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={userName}
            disabled
          />
          <label htmlFor="userName">Username</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full font-bold"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={name}
            disabled
          />
          <label htmlFor="name"> Name</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full no-spin font-bold"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={sex}
            disabled
          />
          <label htmlFor="name">Sex</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="number"
            required
            autoComplete="off"
            className="w-full no-spin font-bold"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={mobileNumber}
            disabled
          />
          <label htmlFor="name">Mobile Number</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full no-spin font-bold"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={vehicleType}
            disabled
          />
          <label htmlFor="name">Vehicle Type</label>
        </div>

        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full font-bold"
            value={bankName}
            disabled
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Bank Name</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full font-bold"
            value={accountNumber}
            disabled
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Account Number</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full font-bold"
            value={accountName}
            disabled
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Account Name</label>
        </div>
        <button
          type="button"
          onClick={handleAvailabilityToggle}
          className={`btn ${isAvailable ? "btn-success" : "btn-outline-dark"}`}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </button>
      </form>
    </div>
  );
};

export default DriverInfo;
