"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link'; // Import Link for routing
import { signIn, signOut } from "next-auth/react";

export async function doLogout() {
  await signOut({redirectTo: "/"});
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Initialize the router
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Please enter both an email and a password");
      return;
    }
  
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, action: "login", }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Login successful:", result);
        alert("Login successful!");
        router.push("/events"); // Redirect on successful login
      } else {
        console.error("Login failed:", result.error);
        alert(result.error); // Display error message
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
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
          <h5 className="text-center text-xl">Welcome Back</h5>
          <div className="text-center">
            New to Planify?{" "}
            <Link href="/signup" className="text-blue-500 font-bold">
              Sign up for free
            </Link>
          </div>
          <div className="space-y-2">
            <label className="block font-medium text-gray-900 text-sm" htmlFor="email">Your email</label>
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
            <label className="font-medium text-gray-900 text-sm" htmlFor="password">Your password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black bg-gray-50 text-sm rounded-lg p-2.5 w-full"
              type="password"
              name="password"
              id="password"
              placeholder="******"
            />
          </div>
          <button
            className="mx-auto w-[200] bg-black text-white h-[40] rounded-full text-center"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>

    </div>
    
  );
};

export default Login;