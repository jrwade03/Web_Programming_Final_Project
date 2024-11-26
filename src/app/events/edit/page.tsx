"use client";
import React, { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    guests: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const eventId = searchParams.get("id");

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setError("Event ID not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/events/${eventId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event details.");
        }

        const event = await response.json();
        setFormData({
          title: event.title || "",
          date: event.date || "",
          time: event.time || "",
          location: event.location || "",
          guests: event.guests || "",
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!eventId) {
      setError("Event ID not found.");
      return;
    }

    try {
      const response = await fetch(`/api/events`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: eventId,
          ...formData,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to update event.");
      }

      alert("Event updated successfully!");
      router.push("/events");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = async () => {
    if (!eventId) {
      setError("Event ID not found.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/events`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eventId }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to delete event.");
      }

      alert("Event deleted successfully!");
      router.push("/events");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg')",
      }}
    >
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-[500px] bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Edit Event</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block font-medium mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Guests</label>
              <input
                type="text"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Enter guest names (comma separated)"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
              >
                Update Event
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
              >
                Delete Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default EditEventForm;