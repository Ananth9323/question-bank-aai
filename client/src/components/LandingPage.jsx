import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { setUser } from "../slices/userSlice";

const LandingPage = () => {
  const [activeRole, setActiveRole] = useState(null); // Track which button is clicked
  const [password, setPassword] = useState(""); // Track password input

  const navigate = useNavigate();
  const dispatchh = useDispatch();

  const u = useSelector((state) => state.user);

  const handleLogin = async () => {
    if (password) {
        console.log(password);
        
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "username" : activeRole,
            "password" : password
           }),
        });
        const data = await response.json();
        console.log(data);
        
        if (data.token) {
          console.log({ role: activeRole, token: data.token });
          
          dispatchh(setUser({ role: activeRole, token: data.token }));

          console.log(u);

          //window.location.replace("/dashboard");
          navigate("/dashboard")
          

        } else {
          alert("Invalid password!");
        }
      }
    else {
      alert("Please enter a password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">AAI Question Paper Generator</h1>
      <div className="flex flex-col items-center gap-4">
        {/* Examiner Button */}
        <div className="relative flex items-center">
          <button
            onClick={() =>
              setActiveRole("examiner")
            }
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Login as Examiner
          </button>
          {activeRole === "examiner" && (
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-4 px-4 py-2 border rounded-md"
            />
          )}
        </div>

        {/* Training Instructor Button */}
        <div className="relative flex items-center">
          <button
            onClick={() =>
              setActiveRole("training_instructor")
            }
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
          >
            Login as Training Instructor
          </button>
          {activeRole === "training_instructor" && (
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-4 px-4 py-2 border rounded-md"
            />
          )}
        </div>
      </div>
      {/* Login Button */}
      {activeRole && (
        <button
          onClick={handleLogin}
          className="mt-6 bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default LandingPage;
