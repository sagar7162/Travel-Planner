import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Main from "../components/main";
import Chatbox from "../components/chatbox";

function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className="flex grow">
        {/* Sidebar */}
        <div className="w-1/5">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="grow">
          <Main />
        </div>

        {/* Chatbox */}
        <div className="w-1/5">
          <Chatbox />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
