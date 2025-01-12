import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditQuestion = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    question: "",
    marks: "",
    type: "",
    chapter: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/questions/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching question:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Question updated successfully!");
        navigate("/manage-questions");
      } else {
        alert("Failed to update question.");
      }
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Question</h1>
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
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Update Question
      </button>
    </form>
  );
};

export default EditQuestion;
