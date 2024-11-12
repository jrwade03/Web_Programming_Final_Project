import React from "react";
import Link from "next/link";

const EventCard = ({ date, time, location, title, index }) => {
  const defaultImg = "https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg";

  return (
    <div className="flex items-center">
      <div className="w-full mt-4 space-y-4">
        <div className="flex items_center bg-white p-4 rounded-md h-32 shadow-lg">
          <img
            src={defaultImg}
            className="h-full mr-4 object-cover"
          />
          <div className="flex-1">
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Location: {location}</p>
            <p>Event title: {title}</p>
          </div>
          <Link
            href={{
              pathname: "/events/edit",
              query: { index: index },
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
