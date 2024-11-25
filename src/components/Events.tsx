"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "./EventCard";
import Link from "next/link";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="absolute inset-0">
      <div className="flex w-screen min-h-screen">
        {/* Sidebar */}
        <div className="flex flex-col items-center border-r border-gray-200 w-1/5 min-h-screen">
        <div className="flex justify-center flex-col items-center mt-10">
          <FontAwesomeIcon className="w-[100] h-[100]" icon={faCalendarCheck} />
          <p className="mt-4 text-4xl font-playwrite text-gray-800 ">Planify</p>
        </div>
        <div className="mb-4 pt-10">
            
          </div>

          <Link
            href="/events/add"
            style={{ textAlign: "center" }}
            className="flex items-center justify-center w-4/5 bg-black text-white p-2 rounded-md mb-4"
          >
            Add Event
          </Link>
          <button
            onClick={handleLogout}
            className="mt-auto mb-4 w-4/5 bg-black text-white p-2 rounded-md"
          >
            Log Out
          </button>
        </div>

        {/* Main Content */}
        <div style={{ backgroundColor: "#6B9080" }} className="flex-1 p-8">
          <nav className="border-b border-black mb-8">
            <div className="flex space-x-6">
              <a className="font-bold">Overview</a>
              <a>Guests</a>
            </div>
          </nav>
          <h2 className="text-xl mb-2">Upcoming Events</h2>
          <p className="mb-4">Click on existing events to see guest list</p>

          {/* Event List */}
          <div className="space-y-4">
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : events.length > 0 ? (
              events.map((event, index) => (
                <EventCard
                  key={event._id}
                  id={event._id} // Pass the MongoDB ObjectId
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  title={event.title || event.name} // Ensure compatibility with "name" or "title"
                  onEdit={() => alert("Edit Event")}
                />
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;