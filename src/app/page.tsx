import React from "react";
import Login from "../components/Signup";
import Signup from "../components/Signup";
import UpdatedEventCard from "@/components/UpdatedEventCard";

const Home: React.FC = () => {
  const demoEvent = {
    id: "1",
    date: "2024-11-26",
    time: "2:00",
    location: "Atlanta",
    title: "Meeting",
  };
  return (
      <Signup />
  )
};

export default Home;