import React from "react";
import { Toaster } from 'react-hot-toast'
const LayoutAuth = ({ children }) => {
  return (
    <div className="min-h-screen h-full w-full flex items-center justify-center  bg-[#e9e9e9]" style={{backgroundImage:"url('/paper.svg')"}}>
      <div className="max-w-xs border rounded-3xl shadow bg-white  h-full w-full text-center flex-1">
   
        {children}
      </div>
      <Toaster
          position="top-center"
  reverseOrder={false}
      />
    </div>
  );
};

export default LayoutAuth;
