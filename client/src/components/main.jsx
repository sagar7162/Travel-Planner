import React from "react";

function Main() {
  return (
    <div className="relative top-[70px] h-[calc(100vh-64px)] flex border-2 border-black ml-2 mt-2 mr-2 rounded-lg">
      {/* Main Content */}
      <div className="grow  border-l border-r p-4 flex flex-col">
        <button className="my-4 border rounded border-2 border-sky-400 bg-sky-400 text-white font-bold p-2 left-2">Add People</button>
        <div className="h-[30px] hover:bg-zinc-100 rounded hover:text-black text-transparent">Click For New Sub-Destination</div>
      </div>
    </div>
  );
}

export default Main;
