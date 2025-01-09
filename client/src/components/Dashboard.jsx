import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome, <span className="text-blue-600">{user.role==="training_instructor"?"Training incharge":"Examiner"}</span>
      </h1>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/create-paper")}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Create New Question Paper
        </button>

        {user.role === "training_instructor" && (
          <button
            onClick={() => navigate("/manage-questions")}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-300 ml-4"
          >
            Manage Questions
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
