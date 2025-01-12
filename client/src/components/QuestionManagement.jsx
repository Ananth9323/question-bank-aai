import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({ type: "", chapter: "" });
  const [excelFile, setExcelFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, [filters]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/questions?type=${filters.type}&chapter=${filters.chapter}`
      );
      const data = await response.json();
      setQuestions(data || []);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/questions/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Question deleted successfully!");
        fetchQuestions();
      }
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const uploadExcelFile = async () => {
    if (!excelFile) {
      alert("Please select a file before uploading!");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await fetch("http://localhost:5000/questions/add-bulk", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Questions uploaded successfully!");
        fetchQuestions();
      } else {
        alert("Failed to upload questions.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Questions</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/add-question")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Question
        </button>
        <div>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setExcelFile(e.target.files[0])}
            className="mr-2"
          />
          <button
            onClick={uploadExcelFile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload Excel
          </button>
        </div>
      </div>
      <div className="filters mb-6">
        <input
          type="text"
          placeholder="Filter by Type"
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-2 rounded mr-4"
        />
        <input
          type="text"
          placeholder="Filter by Chapter"
          onChange={(e) => setFilters({ ...filters, chapter: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
      <div className="questions-list space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <p>{question.question}</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit-question/${question.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteQuestion(question.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionManagement;
