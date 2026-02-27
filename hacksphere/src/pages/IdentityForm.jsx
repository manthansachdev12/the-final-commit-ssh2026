import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function IdentityForm(){

 const navigate=useNavigate();

 const [college,setCollege]=useState("");
 const [branch,setBranch]=useState("");
 const [year,setYear]=useState("");
 const [phone,setPhone]=useState("");
 const [github,setGithub]=useState("");
 const [linkedin,setLinkedin]=useState("");
 const [skills,setSkills]=useState("");


 const submitForm=async()=>{

  await API.post(
   "/identity/save",
   {
    college,
    branch,
    year,
    phone,
    github,
    linkedin,
    skills
   }
  );

  alert("Profile Completed");

  navigate("/dashboard");

 };


 return(

 <div className="min-h-screen flex justify-center items-center bg-gray-50">

  <div className="bg-white p-10 rounded-xl w-96 shadow">

   <h1 className="text-2xl font-bold mb-5">

    Complete Your Profile

   </h1>


   <input
    placeholder="College Name"
    className="border p-2 w-full mb-3"
    onChange={(e)=>setCollege(e.target.value)}
   />

   <input
    placeholder="Branch"
    className="border p-2 w-full mb-3"
    onChange={(e)=>setBranch(e.target.value)}
   />

   <input
    placeholder="Year"
    className="border p-2 w-full mb-3"
    onChange={(e)=>setYear(e.target.value)}
   />

   <input
    placeholder="Phone Number"
    className="border p-2 w-full mb-3"
    onChange={(e)=>setPhone(e.target.value)}
   />

   <input
    placeholder="Github Link"
    className="border p-2 w-full mb-3"
    onChange={(e)=>setGithub(e.target.value)}
   />

   <input
    placeholder="LinkedIn Link"
    className="border p-2 w-full mb-3"
    onChange={(e)=>setLinkedin(e.target.value)}
   />

   <input
    placeholder="Skills"
    className="border p-2 w-full mb-3"
    onChange={(e)=>setSkills(e.target.value)}
   />


   <button
    onClick={submitForm}
    className="bg-blue-600 text-white p-3 w-full"
   >

    Submit Profile

   </button>

  </div>

 </div>

 );

}