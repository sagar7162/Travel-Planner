import React from "react";

let user = "user";

function Navbar() {
  return (
    <div>
      <div className="flex border border-2 h-16 mb-5 items-center w-full fixed top-0 left-0">
        <div className="ml-8 text-xl font-bold">Travel Planner</div>
        <div className="ml-auto mr-8 text-xl font-bold">Hey {user}!</div>
      </div>
    </div>
  );
}

export default Navbar;
