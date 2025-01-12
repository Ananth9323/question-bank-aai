import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    question: "",
    marks: "",
    type: "",
    chapter: "",
    answer : "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/questions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        alert("Question added successfully!");
        navigate("/manage-questions");
      } else {
        alert("Failed to add question.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Question</h1>
      <input
        type="text"
        name="question"
        placeholder="Question"
        value={formData.question}
        onChange={handleInputChange}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <input
        type="number"
        name="marks"
        placeholder="Marks"
        value={formData.marks}
        onChange={handleInputChange}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleInputChange}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <input
        type="text"
        name="chapter"
        placeholder="Chapter"
        value={formData.chapter}
        onChange={handleInputChange}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <input
        type="text"
        name="answer"
        placeholder="Answer"
        value={formData.answer}
        onChange={handleInputChange}
        className="border p-2 rounded w-full mb-4"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Question
      </button>
    </form>
  );
};

export default AddQuestion;
