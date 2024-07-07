import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { app, db } from "./firebase/config";
// import { doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import backIconWhite from "../assets/backIconwhite.svg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
    setError(null);
  };
  const handleUsername = (e) => {
    setError(null);
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError(null);

    // setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError(null);
  };
  const handleRoles = (e) => {
    setRoles(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let auth = getAuth(app);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      createUserProfile(response.user, username, name);
      localStorage.setItem("userId", response.user.uid);

      setError("User Created Successfully");
      await sendEmailVerification(response.user);

      if (roles === "driver") {
        navigate("/setup-driver");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = (user, username, name) => {
    const userDocRef = doc(db, "users", user.uid); // Reference to the user's document using their UID
    const userProfileData = {
      username: username,
      email: user.email,
      verificationStatus: user.emailVerified,
      name: name,
      roles: roles,

      // Add other user-specific data as needed
    };
    setDoc(userDocRef, userProfileData)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error("Error Creating user Profile", error);
      });
  };
  return (
    <div className="flex w-full">
      <div className="h-screen md:w-1/3 md:flex p-3 justify-between items-center bg-[#346357] flex-col text-white hidden w-full">
        <div className="flex  items-start w-full">
          <Link to="/">
            <img src={backIconWhite} className="w-[38px] cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="logoStyle text-6xl">
            Run Ride
          </Link>
          <span className="my-5 text-2xl text-center">LET GET YOU STARTED</span>
        </div>

        <div className="text-center flex flex-wrap gap-2 items-center justify-center">
          Already have an account?
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:w-2/3 items-center justify-center w-full ">
        {error && (
          <div className="text-red-500 slide-in fixed p-6 top-0 right-[10px] text-xl shadow-xl rounded-lg m-4">
            {error}
          </div>
        )}
        <span className="text-2xl font-medium md:w-2/3 text-start">
          Create an Account
        </span>

        <form
          className="md:w-2/3 flex justify-center items-center flex-col gap-[24] w-full p-2 "
          onSubmit={handleSubmit}
        >
          <div className="inputGroup flex items-center justify-center">
            <input
              type="text"
              required
              autoComplete="off"
              className="w-full"
              onChange={handleName}
              placeholder=" " // Use a space as a placeholder to trigger the label animation
              value={name}
            />
            <label htmlFor="name">Your Name</label>
          </div>
          <div className="inputGroup flex items-center justify-center">
            <input
              type="email"
              required
              autoComplete="off"
              className="w-full"
              value={email}
              onChange={handleEmail}
              placeholder=" " // Use a space as a placeholder to trigger the label animation
            />
            <label htmlFor="name">E-mail</label>
          </div>

          <div className="inputGroup flex items-center justify-center">
            <input
              type="text"
              required
              autoComplete="off"
              className="w-full"
              value={username}
              onChange={handleUsername}
              placeholder=" " // Use a space as a placeholder to trigger the label animation
            />
            <label htmlFor="name">Username</label>
          </div>
          <div className="inputGroup flex items-center justify-center">
            <input
              type="password"
              required
              autoComplete="off"
              className="w-full"
              value={password}
              onChange={handlePassword}
              placeholder=" " // Use a space as a placeholder to trigger the label animation
            />
            <label htmlFor="name">Password</label>
          </div>
          <div className="inputGroup flex items-center justify-center w-full">
            <select
              name="roles"
              value={roles}
              onChange={handleRoles}
              required
              className="w-full form-control mb-3"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="student">Student</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-success py-6 px-10 rounded-[60px]"
              disabled={loading}
              // onClick={handleSubmit}
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
