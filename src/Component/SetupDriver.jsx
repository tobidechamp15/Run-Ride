import React, { useEffect, useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "./firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SetupDriver = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [message, setMessage] = useState("");
  const [slideOut, setSlideOut] = useState(false);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          console.log(userDoc.data());
          setUserName(userDoc.data().name);
          setName(userDoc.data().name);
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setSlideOut(true);
      }, 3000); // Slide out after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when message changes
    }
    setMessage("");
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Login!");
      navigate("/login");

      return;
    }

    try {
      const userDocRef = doc(db, "drivers", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setMessage("Driver with this User ID already exists.");
        setMessage(false);
        setSex("");
        setMobileNumber("");
        setBankName("");
        setAccountName("");
        setVehicleType("");
        setAccountNumber("");
        setImageSrc(null);
        navigate("driver-info");
      } else {
        await setDoc(userDocRef, {
          userName,
          sex,
          mobileNumber,
          bankName,
          accountName,
          vehicleType,
          accountNumber,
          imageSrc,
          userId,
          name,
        });

        setUserName(userName);
        setMessage("Driver added successfully!");
        setMessage(false);
        setSex("");
        setMobileNumber("");
        setBankName("");
        setAccountName("");
        setVehicleType("");
        setAccountNumber("");
        setImageSrc(null);
      }
      navigate("/driver-info");
    } catch (error) {
      console.error("Error adding driver: ", error);
      setMessage(error.message);
      setSlideOut(false); // Ensure the error message slides in again
      alert("Error adding driver.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col container py-4">
      {message && (
        <div
          className={`text-red-500 fixed p-6 top-0 right-[10px] text-xl shadow-xl rounded-lg m-4 ${
            slideOut ? "slide-out" : ""
          }`}
        >
          {message}
        </div>
      )}
      <div className="text-4xl text-black font-medium my-6">Setup Account</div>
      <form
        className="w-[60%] xsm:w-full py-4 flex flex-col gap-7 items-center"
        onSubmit={handleSubmit}
      >
        <div
          className="border-dashed border-2 w-fit p-4 border-[#bdbdbd] flex flex-col cursor-pointer"
          onClick={handleImageClick}
        >
          {imageSrc ? (
            <img src={imageSrc} alt="Selected" className="max-w-full h-auto" />
          ) : (
            <>
              <FontAwesomeIcon
                icon={faImage}
                className="text-[160px] text-black"
              />
              <span>Drag and Drop or Choose File here</span>
            </>
          )}
          <input
            type="file"
            required
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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
            className="w-full no-spin"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
          <label htmlFor="name">Sex</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="number"
            required
            autoComplete="off"
            className="w-full no-spin"
            placeholder=" " // Use a space as a placeholder to trigger the label animation
            value={mobileNumber}
            pattern="[0-9]{11}"
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <label htmlFor="name">Mobile Number</label>
        </div>
        <div className="inputGroup flex items-center justify-center w-full">
          <select
            name="roles"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className="w-full form-control mb-3"
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="keke">Keke</option>
            <option value="bus">Bus</option>
            <option value="car">Car</option>
          </select>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Bank Name</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full"
            value={accountNumber}
            pattern="[0-9]{10}"
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Account Number</label>
        </div>
        <div className="inputGroup flex items-center justify-center">
          <input
            type="text"
            required
            autoComplete="off"
            className="w-full"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder=" " // Use a space as a placeholder to trigger the label animation
          />
          <label htmlFor="name">Account Name</label>
        </div>
        <button type="submit" className="btn btn-outline-dark">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default SetupDriver;
