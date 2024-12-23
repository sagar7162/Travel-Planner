import React, { useState } from "react";

function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) {
        alert("Please fill in all fields");
        return;
    }
    console.log(email, password);
  };

  const handleChange = (e, func) => {
    func(e.target.value);
  };

  return (
    <div className="flex items-center justify-center relative h-screen w-screen">
      <div className="box-content h-[400px] w-[400px] border-1 border-gray-500 rounded-lg shadow-inner-lg shadow-2xl bg-white">
        <h1 className="font-black text-4xl pt-4">Login In</h1>

        <div className="flex flex-col items-center justify-center h-full relative gap-y-10">

          <div>
            <label htmlFor="email" className="text-xl mr-[50px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
              className="w-[230px] border-b-2 border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xl mr-4">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
              className="w-[230px] border-b-2 border-gray-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="bg-sky-500/100 p-2 mb-5 rounded text-white font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
