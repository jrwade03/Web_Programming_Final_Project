import React from "react";
import Link from "next/link";

const EventCard = ({ id, date, time, location, title }) => {
  const defaultImg =
    "https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg";

  console.log("Event ID passed to EventCard:", id); // Debugging log

  return (
    <div className="flex items-center">
      <div className="w-full mt-4 space-y-4">
        <div className="flex items-center bg-white p-4 rounded-md h-32 shadow-lg">
          <img src={defaultImg} className="h-full mr-4 object-cover" />
          <div className="flex-1">
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Location: {location}</p>
            <p>Event title: {title}</p>
          </div>
          {/* Pass the event ID in the query */}
          <Link
            href={{
              pathname: "/events/edit",
              query: { id }, // Pass the event's unique ID
            }}
            className="font-bold text-blue-500"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;