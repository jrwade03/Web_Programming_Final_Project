import React from "react";
import Link from "next/link";
import { Clock, MapPin, Calendar } from 'lucide-react';

const UpdatedEventCard = ({ id, date, time, location, title }) => {
  const defaultImg =
    "https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg";

  // Function to convert 24-hour time to 12-hour format with AM/PM
  const formatTimeTo12Hour = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const hour12 = hourInt % 12 || 12; // Convert 0 to 12 for midnight
    return `${hour12}:${minute} ${period}`;
  };

  const formattedTime = formatTimeTo12Hour(time);

  console.log("Event ID passed to EventCard:", id); // Debugging log

  return (

        <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 transiion duration-300 hover:shadow-xl transform hover:-translate-y-2">
        <div className="w-full bg-gradient-to-r from-green-600 to-emerald-300 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold truncate max-w-[70%]">
                {title}
            </h2>
            <div className="bg-white/20 rounded-full p-2">
                <Calendar className="w-6 h-6 text-white"/>
            </div>
        </div>
        <div className="flex items-start space-x-6">
  
  <img src={defaultImg} className="ml-4 py-5 h-40 w-40 object-cover rounded-md" alt="Event" />
  
  
  <div className="mt-6 space-y-4">
    <div className="flex items-center space-x-3">
      <Calendar className="w-5 h-5 text-blue-600" />
      <span className="text-gray-700 font-medium">Date: {date}</span>
    </div>
    <div className="flex items-center space-x-3">
      <Clock className="w-5 h-5 text-blue-600" />
      <span className="text-gray-700 font-medium">Time: {formattedTime}</span>
    </div>
    <div className="flex items-center space-x-3">
      <MapPin className="w-5 h-5 text-blue-600" />
      <span className="text-gray-700 font-medium">Location: {location}</span>
    </div>
  </div>
</div>
        <div className="flex justify-between items-center border-t border-gray-100 p-6"> 
                <Link href={{
                    pathname:"/events/guests",
                    query: { id }
                }} 
                    className="rounded-md py-2 text-white font-large bg-gradient-to-r from-green-600 to-emerald-300 px-4">View Guests</Link>
                <button className="bg-gray-200 py-2 font-medium rounded-md px-4">
                <Link
            href={{
              pathname: "/events/edit",
              query: { id }, // Pass the event's unique ID
            }}
            className="font-bold text-blue-500 hover:text-blue-700 hover:underline transition duration-200"
          >
            Edit Event
          </Link>
            </button>
        </div>
    </div> 
  );
};

export default UpdatedEventCard;
