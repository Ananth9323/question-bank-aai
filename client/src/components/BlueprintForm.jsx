import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuestions } from "../slices/questionsSlice";

const BlueprintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    totalMarks: 0,
    blueprint: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlueprintChange = (index, field, value) => {
    const updatedBlueprint = [...formData.blueprint];
    updatedBlueprint[index][field] = value;

    setFormData({
      ...formData,
      blueprint: updatedBlueprint,
    });
  };

  const addBlueprint = () => {
    const remainingMarks = calculateRemainingMarks();

    if (remainingMarks <= 0) {
    alert("Cannot add more questions as the remaining marks are zero or negative.");
    return;
    }

    setFormData({
    ...formData,
    blueprint: [
        ...formData.blueprint,
        { questionType: "", noOfQuestions: 0, chapterName: "", marksEach: 0 },
    ],
    });
  };

  const deleteBlueprint = (index) => {
    const updatedBlueprint = [...formData.blueprint];
    updatedBlueprint.splice(index, 1);

    setFormData({
      ...formData,
      blueprint: updatedBlueprint,
    });
  };

  const calculateRemainingMarks = () => {
    const usedMarks = formData.blueprint.reduce(
      (total, question) =>
        total + question.noOfQuestions * question.marksEach,
      0
    );
    return formData.totalMarks - usedMarks;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/papers/generate", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ blueprint: formData.blueprint }),
      });

      if (!response.ok) throw new Error("Failed to generate questions");
      const questions = await response.json();

      dispatch(setQuestions(questions)); // Save questions in Redux
      navigate("/question-preview");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create Blueprint
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Name of Question Paper
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Course</label>
          <input
            type="text"
            name="course"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Total Marks
          </label>
          <input
            type="number"
            name="totalMarks"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Remaining Marks:{" "}
            <span className="text-blue-600">{calculateRemainingMarks()}</span>
          </h2>
        </div>

        {formData.blueprint.map((question, index) => (
          <div
            key={index}
            className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                Question {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => deleteBlueprint(index)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">
                Question Type
              </label>
              <input
                type="text"
                value={question.questionType}
                onChange={(e) =>
                  handleBlueprintChange(index, "questionType", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">
                Number of Questions
              </label>
              <input
                type="number"
                value={question.noOfQuestions}
                onChange={(e) =>
                  handleBlueprintChange(index, "noOfQuestions", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">
                Chapter Name
              </label>
              <input
                type="text"
                value={question.chapterName}
                onChange={(e) =>
                  handleBlueprintChange(index, "chapterName", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Marks Per Question
              </label>
              <input
                type="number"
                value={question.marksEach}
                onChange={(e) =>
                  handleBlueprintChange(index, "marksEach", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addBlueprint}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mb-4"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlueprintForm;
