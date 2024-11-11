"use client";
import { fallbackModeToStaticPathsResult } from "next/dist/lib/fallback";
import { ForkOptions } from "node:child_process";
import React, { FormEvent } from "react";
import { useState } from "react";

const EventForm = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        date: '',
        location: '',
        guests: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted: ', formData);
        setFormData({
            eventName: '',
            date: '',
            location: '',
            guests: ''
        });
    }

    const handleChange = (e: FormEvent) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }));
    }

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
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="Enter date"
                    className="font-medium border rounded-md px-3 mt-4 w-full"
                    />
                </div>
                <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Location</label>
                    <input 
                    name="location"
                    placeholder="Enter location"
                    className="border font-medium rounded-md px-3 w-full"
                    />
                </div>
                <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                        <label className="font-medium text-sm">Guest List</label>
                        <button className="text-white bg-black rounded-lg w-[100px] h-[30px]">Add Guest</button>
                    </div>
                    <input 
                        name="guestList"
                        placeholder="Enter guest name"
                        className="font-medium border rounded-md px-3 mt-3 w-full"
                        />
                </div>
                <button className="rounded-lg h-[35] text-white bg-black w-full">Create Event</button>
            </form>
        </div>

        

    );
}

export default EventForm;