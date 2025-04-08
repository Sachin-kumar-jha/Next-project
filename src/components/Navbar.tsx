"use client"
import React from 'react'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from 'react';
import { Spinner } from './Spinner';
function Navbar() {
    const { data: session, status } = useSession();
    const[loading,setLoading]=useState(false);

  const router = useRouter();

  if (status === "loading"){
    return null;
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    setLoading(false);
    toast.success("Signed out successfully!");
    router.push("/signin"); 
  };
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black/30 backdrop-blur-sm z-20">
        <div className="text-xl font-bold text-white">RoleBase</div>
        { session && <div className="text-xl font-bold"><span className="hover:text-purple-400 transition duration-300 cursor-pointer" onClick={()=>redirect("/user")}>Check User Details</span></div>}
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-white text-md md:px-4">
          <li className="transition duration-300 cursor-pointer bg-pink-400 px-4 py-2 rounded-md shadow-lg hover:text-black">
          {!session ? (
              <button className="cursor-pointer" onClick={() =>redirect("/signin")}>
                Sign In
              </button>
            ) : (
               <button className="cursor-pointer"  onClick={handleSignOut}>

                { loading ? <Spinner/> :"Sign Out"}
              </button>
            )}
        </li>
        </ul>
      </nav>
  )
}

export default Navbar