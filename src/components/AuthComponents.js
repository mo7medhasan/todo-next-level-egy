import React, { useState } from "react";
import { useAppContext } from "../AppProvider";
import { NavLink, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignInForm = () => {
  const { signIn } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim()))
      return toast.error("Please enter a valid email address");
    if (password.trim().length < 6)
      return toast.error("The password is not enough");
    const { user, error } = await signIn(email.trim(), password.trim());
    if (error) {
      setError(error.message);
      toast.error(error.message);
    } else {
      toast.success(" successful sign-in");
      setTimeout(() => {
        <Navigate to="/" replace />;
      }, 200);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4 p-4">
      <h2 className="text-3xl font-bold font-sans text-amber-500">Sign In</h2>

      <input
        type="email"
        placeholder="Email" required
        className="h-10 bg-slate-300/90 rounded-full p-2 my-2 px-4"
        value={email}
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password" required
        placeholder="Password"
        value={password}
        autoComplete="password"
        className="h-10 bg-slate-300/90 rounded-full p-2 my-2 px-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <NavLink to="/signup" className={"hover:underline text-blue-500"}>
          create account
        </NavLink>{" "}
        <button
          type="submit"
          className="bg-amber-500 shadow-xl mt-4 my-2   p-2 px-6 rounded-xl font-bold text-lg text-black "
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

const SignUpForm = () => {
  const { signUp } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim()))
      return toast.error("Please enter a valid email address");
    if (password.trim().length < 6)
      return toast.error("The password is not enough");
    if (password.trim() !== confirmPassword.trim())
      return toast.error("The password does not match");

    const { user, error } = await signUp(email.trim(), password.trim());
  
    if (error) {
      setError(error.message);
      toast.error(error.message);
    } else {
      toast.success("successful sign-up");
      setTimeout(() => {  

        <Navigate to="/" replace />;
      }, 200);
      // Handle successful sign-up (redirect, update UI, etc.)
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4 p-4">
      <h2 className="text-3xl font-bold font-sans text-amber-500">Sign Up</h2>

      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        autoComplete="email"
        className="h-10 bg-slate-300/90 rounded-full p-2 my-2 px-4"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        autoComplete="Password"
        className="h-10 bg-slate-300/90 rounded-full p-2 my-2 px-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        required
        autoComplete="Password"

        placeholder="Confirm Password"
        value={confirmPassword}
        className="h-10 bg-slate-300/90 rounded-full p-2 my-2 px-4"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <NavLink to="/signin" className={"hover:underline text-blue-500"}>
          or log in
        </NavLink>{" "}
        <button
          type="submit"
          className="bg-amber-500 shadow-xl mt-4 my-2   p-2 px-6 rounded-full font-bold text-lg text-black "
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export { SignInForm, SignUpForm };
