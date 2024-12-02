"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { time } from "console";

const EventForm = ({ onAddEvent }: { onAddEvent: (event: { name: string, date: string, location: string, guests: string[], time: string}) => void }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    guests: "",
    time: "",
  });

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

   
    const newEvent = {
      name: formData.eventName,
      date: formData.date,
      location: formData.location,
      guests: formData.guests.split(","), // Assume guests are entered as a comma-separated string
      time: formData.time,
    };

    // Ensure the function is called correctly
    if (onAddEvent && typeof onAddEvent === "function") {
      onAddEvent(newEvent); // Call the parent function to add the new event
    }

    // Reset the form
    setFormData({
      eventName: "",
      date: "",
      location: "",
      guests: "",
      time: "",
    });

    // Redirect to the Events page after submitting
    router.push("/events");
  };

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement; // Type casting for e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-between inset-0 w-[500px] h-[600px] mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">New Event Registration</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-left">Event Name</label>
          <input
            value={formData.eventName}
            name="eventName"
            onChange={handleChange}
            placeholder="Enter event name"
            className="mt-4 font-medium border rounded-md px-3 text-left w-full"
          />
        </div>
        <div className="space-y-2 flex-1">
          <label className="font-medium text-sm text-left">Date</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="font-medium border rounded-md px-3 mt-4 w-full"
          />
        </div>
        <div className="space-y-2 flex-1">
          <label className="text-sm font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="border font-medium rounded-md px-3 w-full"
          />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <label className="font-medium text-sm">Guest List</label>
          </div>
          <input
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Enter guest names (comma separated)"
            className="font-medium border rounded-md px-3 mt-3 w-full"
          />
        </div>
        <button className="rounded-lg h-[35] text-white bg-black w-full">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;