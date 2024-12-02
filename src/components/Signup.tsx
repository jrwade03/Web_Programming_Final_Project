"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation"; 
import Link from 'next/link'; 

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter(); 

 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both an email and a password");
      return;
    } else {
      console.log("Email:", email);
      console.log("Password:", password);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, action: "register", }),
      });
      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        alert("This email is already associated with an account");
        return;
      }
      const data = await response.json();
      console.log("Server response", data)

      // future logic here, like sending data to a backend
      router.push("/events"); // Redirect to events page after successful sign-up
    }
  }

  return (
    <div
    className="flex items-center justify-center h-screen w-full bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg')",
    }}
  >
    <div className="flex flex-col w-[500] mt-16 w-2/5 h-[500] bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-5">
        <div className="flex justify-center">
          <FontAwesomeIcon className="w-[50] h-[50]" icon={faCalendarCheck} />
        </div>
        <h5 className="text-center text-xl">New User</h5>
        <div className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-bold">
            Sign in here
          </Link>
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-900 text-sm" htmlFor="email">
            Your email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black bg-gray-50 text-sm rounded-lg p-2.5 w-full"
            type="text"
            name="email"
            id="email"
            placeholder="name@email.com"
          />
        </div>
        <div className="space-y-6" />
        <div className="space-y-2">
          <label className="font-medium text-gray-900 text-sm" htmlFor="password">
            Your password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black bg-gray-50 text-sm rounded-lg p-2.5 w-full"
            type="password"
            name="password"
            id="password"
            placeholder="******"
          />
        </div>
        <button className="mx-auto w-[200] bg-black text-white h-[40] rounded-full text-center" type="submit">
          Sign up
        </button>
      </form>
    </div>
  </div>
    
  );
};

export default Signup;