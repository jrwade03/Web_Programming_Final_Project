"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !eventDate || !eventTime || !eventLocation) {
      alert("Please fill in all fields.");
      return;
    }

    const newEvent = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
    };

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
        name: "Team Building",
        date: "2024-12-10",
        time: "2:00 PM",
        location: "Zoom",
      },
    ];

    const existingEvents = JSON.parse(localStorage.getItem("events")) || defaultEvents;

    existingEvents.push(newEvent);

    localStorage.setItem("events", JSON.stringify(existingEvents));

    router.push("/events");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700" htmlFor="eventName">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Event Name"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700" htmlFor="eventDate">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700" htmlFor="eventTime">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700" htmlFor="eventLocation">
              Event Location
            </label>
            <input
              type="text"
              id="eventLocation"
              name="eventLocation"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Location"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-md mt-4"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;