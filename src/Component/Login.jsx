import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backIconWhite from "../assets/backIconwhite.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slideOut, setSlideOut] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const auth = getAuth(app);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      localStorage.setItem("userId", user.uid);

      const userProfile = await fetchUserProfile(user.uid);
      console.log("User Profile:", userProfile);
      // console.log(user);

      if (userProfile.roles === "student") {
        console.log(userProfile.roles);
        navigate("/vehicles");
      } else if (userProfile.roles === "driver") {
        navigate("/driver-info");
        console.log(userProfile.roles);
      }
      setError("User Login Successfully");
    } catch (error) {
      setError("Invalid Credentials");
      setSlideOut(false); // Ensure the error message slides in again
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setSlideOut(true);
      }, 3000); // Slide out after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when error changes
    }
  }, [error]);

  return (
    <div className="flex w-full min-h-screen ">
      <div className="h-screen md:w-1/3 md:flex hidden p-3 justify-between items-center bg-[#346357] flex-col text-white">
        <div className="flex items-start w-full">
          <Link to="/">
            <img src={backIconWhite} className="w-[38px] cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="logoStyle text-6xl">
            Run Ride
          </Link>
          <span className="my-5 text-2xl">CONTINUE WITH US</span>
        </div>

        <div>
          Do not have an account yet?
          <Link to="/signup" className="text-blue-400">
            Get Started
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-[24px] md:w-2/3 w-full items-center xsm:justify-evenly justify-center">
        {" "}
        <div className="flex md:hidden flex-col items-center justify-center gap-6">
          <Link to="/" className="logoStyle text-6xl">
            Run Ride
          </Link>{" "}
          <span className="text-3xl  text-start font-semibold">
            Welcome Back
          </span>
        </div>
        {error && (
          <div
            className={`text-red-500 fixed p-6 top-0 right-[10px] text-xl shadow-xl rounded-lg m-4 ${
              slideOut ? "slide-out" : "slide-in"
            }`}
          >
            {error}
          </div>
        )}
        <span className="text-3xl xsm:hidden  text-start font-semibold mb-[90px]">
          Welcome Back
        </span>
        <form
          className="w-2/3 flex justify-center items-center flex-col gap-[24] "
          onSubmit={handleSubmit}
        >
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
            <label htmlFor="name">Email</label>
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
          <div>
            <button
              type="submit"
              className="btn btn-outline-success py-2 px-6 font-semibold text-lg rounded-[60px]"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </form>
        <div className="md:hidden">
          Do not have an account yet?
          <Link to="/signup" className="text-blue-400">
            {" "}
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
