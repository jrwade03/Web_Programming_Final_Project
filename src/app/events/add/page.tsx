"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    guests: ''
  });

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newEvent = {
      name: formData.name,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      guests: formData.guests.split(',').map(guest => guest.trim())
    };

    // Retrieve existing events from localStorage or initialize an empty array
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Add the new event to the array
    existingEvents.push(newEvent);
    
    // Save the updated events array back to localStorage
    localStorage.setItem('events', JSON.stringify(existingEvents));

    // Reset the form
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      guests: ''
    });

    // Redirect to the events page
    router.push('/events');
  };

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col justify-between inset-0 w-[500px] h-[700px] mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">New Event Registration</h2>
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
        <button type="submit" className="rounded-lg h-[35] text-white bg-black w-full">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;