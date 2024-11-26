import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
        <p className="mt-4 text-xl text-gray-600">
          Something went wrong. Please try again later.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-lg text-blue-500 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;