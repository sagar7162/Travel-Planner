import React from "react";

function Sidebar() {
  return (
    <div>
      {/* Sidebar */}
      <div className="fixed top-[70px] left-0 h-[calc(100vh-64px)] w-1/5 p-4 border border-r-2 border-b-2 border-t-2 border-black box-border flex flex-col rounded">
        {/* Load previous trips data here */}
        <div className="flex flex-col flex-1 overflow-y-auto gap-y-2 items-center">
          {/* Replace this with dynamically loaded trip data */}
          <button className="w-3/4 shadow-md border-2 border-gray rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Trip 1
          </button>
          <button className="w-3/4 shadow-md border-2 border-gray rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Trip 2
          </button>
          <button className="w-3/4 shadow-md border-2 border-gray rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Trip 3
          </button>
        </div>

        {/* New Trip Button */}
        <button className="mt-4 border rounded border-2 border-sky-400 bg-sky-400 text-white font-bold p-2">
          New Trip
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
