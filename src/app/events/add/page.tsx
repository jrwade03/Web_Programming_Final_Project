"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    guests: "",
  });

  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const formatTimeWithAmPm = (time: string) => {
    const [hour, minute] = time.split(":");
    let hourInt = parseInt(hour);
    const amPm = hourInt >= 12 ? "PM" : "AM";
    hourInt = hourInt % 12 || 12;
    return `${hourInt}:${minute} ${amPm}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formattedTime = formatTimeWithAmPm(formData.time);

    const newEvent = {
      title: formData.name,
      date: formData.date,
      time: formattedTime,
      location: formData.location,
      guests: formData.guests,
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Event created successfully!");
        setFormData({
          name: "",
          date: "",
          time: "",
          location: "",
          guests: "",
        });

        // Redirect to the events page
        router.push("/events");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Unexpected error: ${error}`);
    }
  };

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg')",
      }}
    >
    <div className="flex flex-col justify-between inset-0 w-[500px] h-[700px] mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Add New Event</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sm text-left">Event Name</label>
          <input
            value={formData.name}
            name="name"
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
          <label className="font-medium text-sm text-left">Time</label>
          <input
            name="time"
            type="time"
            value={formData.time}
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
          <label className="font-medium text-sm">Guest List</label>
          <input
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            placeholder="Enter guest names (comma separated)"
            className="font-medium border rounded-md px-3 mt-3 w-full"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg h-[35] text-white bg-black hover:bg-blue-600 w-full"
        >
          Create Event
        </button>
      </form>
      {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
    </div>
    </div>
  );
};

export default EventForm;
