import React from "react";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "../AppProvider";
import { Navigate } from "react-router-dom";
const LayoutAuth = ({ children }) => {
  const { user, signOut} = useAppContext();
  return (
    <div
      className="min-h-screen h-full w-full flex items-center justify-center  bg-[#e9e9e9]"
      style={{ backgroundImage: "url('/paper.svg')" }}
    >
   {user? <div className="flex justify-end p-2 bg-white inset-x-0 top-0 fixed">
    <button
            onClick={signOut}
            className="bg-amber-500 shadow-xl mt-4 my-2   p-2 px-6 rounded-full font-bold text-lg text-black "
          >
            Sign out
          </button>
    </div>:null}
      <div className="max-w-md border rounded-3xl shadow bg-white  h-full w-full text-center flex-1">
        {children}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default LayoutAuth;
