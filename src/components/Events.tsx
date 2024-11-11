"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "./EventCard";
import Link from "next/link";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      // Default events array
      const defaultEvents = [
        {
          name: "Annual Meeting",
          date: "2024-12-01",
          time: "10:00 AM",
          location: "Conference Room A",
        },
        {
          name: "Team Building",
          date: "2024-12-10",
          time: "2:00 PM",
          location: "Zoom",
        },
        {
            name: "Lunch w/ Manager",
            date: "2024-12-10",
            time: "12:00 PM",
            location: "Olive Garden",
          },
      ];
      setEvents(defaultEvents);
    }
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleClearLocalStorage = () => {
    const userConfirmed = window.confirm("Are you sure you want to clear all events? This action cannot be undone.");
    if (userConfirmed) {
      localStorage.clear();
      setEvents([]);
      alert('All events cleared!');
    }
  };

  return (
    <div className="absolute inset-0">
      <div className="flex w-screen min-h-screen">
        <div className="flex flex-col items-center border-r border-gray-200 w-1/5 min-h-screen">
          <div className="mb-4 pt-10">
            <label className="w-full ml-12 rounded-md font-medium block">Search event</label>
            <input
              type="text"
              className="w-4/5 bg-gray-200 ml-4 text-black p-2 rounded-md mb-4"
            />
          </div>
<<<<<<< HEAD

          <Link
            href="/events/add"
            style={{ textAlign: "center" }}
            className="flex items-center justify-center w-4/5 bg-black text-white p-2 rounded-md mb-4"
          >
            Add Event
          </Link>
=======
          
          <Link href="/events/add" style={{ textAlign: 'center'}} className="flex items-center justify-center w-4/5 bg-black text-white p-2 rounded-md mb-4">
              Add Event
          </Link>
        

>>>>>>> 0e0363650a0c11a234ff6544287565b5e81ad7a9
          <button
            onClick={handleLogout}
            className="mt-auto mb-4 w-4/5 bg-black text-white p-2 rounded-md"
          >
            Log Out
          </button>
          <button
            onClick={handleClearLocalStorage}
            className="mt-auto mb-10 w-4/5 bg-red-500 text-white p-2 rounded-md"
          >
            Clear Events
          </button>
        </div>

        <div style={{ backgroundColor: "#6B9080" }} className="flex-1 p-8">
          <nav className="border-b border-black mb-8">
            <div className="flex space-x-6">
              <a className="font-bold">Overview</a>
              <a>Guests</a>
            </div>
          </nav>
          <h2 className="text-xl mb-2">Upcoming Events</h2>
          <p className="mb-4">Click on existing events to see guest list</p>

          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard
                  key={index}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  title={event.name}
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