import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { replaceQuestion } from "../slices/questionsSlice";

const QuestionPreview = () => {
  const questions = useSelector((state) => state.questions.data); // Updated selector
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const replaceQuestionHandler = async (index) => {
    const { type, marks, chapter } = questions[index];
    try {
      const response = await fetch(
        `http://localhost:5000/papers/replace?type=${type}&marks=${marks}&chapter=${chapter}`
      );
      if (!response.ok) throw new Error("Failed to replace question");

      const replacement = await response.json();
      dispatch(
        replaceQuestion({ index, question: replacement[0] }) // Dispatching replaceQuestion action
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const downloadWordFile = () => {
    const doc = new Document({
      sections: [
        {
          children: questions.map((q, idx) =>
            new Paragraph({
              children: [
                new TextRun(`${idx + 1}. ${q.question} [${q.marks}]`),
              ],
            })
          ),
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "QuestionPaper.docx");
    });
  };

  const downloadExcelFile = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      questions.map((q, idx) => ({
        "Question Number": idx + 1,
        Question: q.question,
        Marks: q.marks,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "QuestionPaper.xlsx");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Question Preview</h1>
      {questions.map((q, index) => (
        <div
          key={q.id}
          className="p-4 mb-4 border rounded-lg flex justify-between items-center"
        >
          <span>
            {index + 1}. {q.question} [{q.marks}]
          </span>
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
            onClick={() => replaceQuestionHandler(index)}
          >
            Replace
          </button>
        </div>
      ))}
      <div className="flex gap-4 mt-6">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          onClick={downloadWordFile}
        >
          Download Word File
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={downloadExcelFile}
        >
          Download Excel File
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuestionPreview;
