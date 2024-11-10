"use client";
import React from "react";
//import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(!email || !password) {
      alert('Please enter both an email and a password');
      return;
    } else {
      console.log(email);
      console.log(password);
    }
  }

  //const emailInput = (document.getElementById('email') as HTMLInputElement)?.value;
  //const passwordInput = (document.getElementById('password') as HTMLInputElement)?.value;

  /**function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if(emailInput) {
      setEmail(emailInput);
      console.log("Email: ", emailInput);
    } else {
      alert("email not found");
    }
    if(passwordInput) {
      setPassword(passwordInput);
      console.log("Password: ", passwordInput);
    } else {
      alert("Password not found");
    }
  }
  **/





  return (
    <div className="flex flex-col w-[500] mt-16 w-2/5 h-[500] bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
     <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-5">
      <div className="flex justify-center">
      <FontAwesomeIcon className="w-[50] h-[50]" icon={faCalendarCheck} />
      </div>
      <h5 className="text-center text-xl">Welcome Back</h5> 
      <div className="text-center">
      New to website name? <a className="text-blue-500 font-bold" href='#'>Sign up for free</a> 
      </div>
      <div className="space-y-2">
        <label className="block font-medium text-gray-900 text-sm" htmlFor='email'>Your email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="border border-black bg-gray-50 text-sm rounded-lg p-2.5 w-full" type='text' name='email' id='email' placeholder="name@email.com"/>
      </div>
      <div className="space-y-6"/>
      <div className="space-y-2">
        <label className="font-medium text-gray-900 text-sm" htmlFor='password'>Your password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="border border-black bg-gray-50 text-sm rounded-lg p-2.5 w-full" type='text' name='password' id='password' placeholder="******"/>
      </div>
      <button className="mx-auto w-[200] bg-black text-white h-[40] rounded-full text-center"type='submit'>Sign in</button>
     </form>
    </div>
  );
}

export default Login;
