import React from "react";
import Link from "next/link";


const EventCard = ({ id, date, time, location, title }) => {
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
    <div className="flex items-center">
      <div className="w-full mt-4 space-y-4">
        <div className="flex items-center bg-white p-4 rounded-xl h-32 shadow-md overflow-hidden tranisiton-all duration-300 hover:shadow-lg">
          <img src={defaultImg} className="h-full mr-4 object-cover" />
          <div className="flex-1">
            <p>Date: {date}</p>
            <p>Time: {formattedTime}</p> {/* Display formatted time */}
            <p>Location: {location}</p>
            <p>Event title: {title}</p>
          </div>
          {/* Pass the event ID in the query */}
          <Link
            href={{
              pathname: "/events/edit",
              query: { id }, // Pass the event's unique ID
            }}
            className="font-bold text-blue-500 hover:text-blue-700 hover:underline transition duration-200"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
