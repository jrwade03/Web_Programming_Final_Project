"use client"; 
import React from "react";
import EventCard from "./EventCard";

const Events = () => {
    return (
        <div className="absolute inset-0">
        <div className="flex w-screen min-h-screen">
            <div className="flex flex-col items-center border-r border-gray-200 w-1/5 min-h-screen">
                <div className="mb-4 pt-10">
                    <label className="w-full ml-12 rounded-md font-medium block">Search event
                    </label>
                    <input
                        type='text'
                        className="w-4/5 bg-gray-200 ml-4 text-black p-2 rounded-md mb-4"
                        />  
                </div>
                <button className="w-4/5 bg-black text-white p-2 rounded-md mb-4">Add Event</button>
                <button className="mt-auto mb-10 w-4/5 bg-black text-white p-2 rounded-md">Log Out</button>
            </div>

            
            <div style={{backgroundColor: '#6B9080;'}} className="flex-1 p-8">
                <nav className="border-b border-black mb-8">
                <div className="flex space-x-6">
                        <a className="font-bold">Overview</a>
                        <a>Guests</a>
                    </div>
                </nav>
                <div className="flex items-center justify-between">
                </div>
                <h2 className="text-xl mb-2">Upcoming Events</h2>
                <p className="mb-4">Click on existing events to see guest list</p>

                <div className="space-y-4">
                   <EventCard
                   date="2024-12-01"
                   time="10:00 AM"
                   location="Conference Room A"
                   title="Annaul Meeting"
                   onEdit={() => alert("Edit Event")}
                   />
                </div>
               
            </div>
        </div>
    </div>
    );
}

export default Events;