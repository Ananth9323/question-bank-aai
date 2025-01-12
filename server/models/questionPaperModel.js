const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./db/database.db");
const fs = require("fs");
const xlsx = require("xlsx");

const addQuestion = (q, cb) => {
    const {question, answer, chapter, type, marks} = q;
    const command = "INSERT INTO questions(question, answer, chapter, type, marks) VALUES (?, ?, ?, ?, ?)";
    db.run(command, [question, answer, chapter, type, marks], cb);
};

const getQuestions = (cb) => {
    const command = "SELECT * FROM questions";
    db.all(command,[],cb);
};

const deleteQuestion = (id, cb) => {
    const command = "DELETE FROM questions WHERE id = ?";
    db.run(command,[id],cb);
};

const updateQuestion = (id, data, callback) => {
    const { question, marks, type, chapter } = data;
    const query = `
        UPDATE questions 
        SET question = ?, marks = ?, type = ?, chapter = ?
        WHERE id = ?`;

    db.run(query, [question, marks, type, chapter, id], (err) => {
        callback(err);
    });
};

const getQuestionById = (id, callback) => {
    const query = `SELECT * FROM questions WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        callback(err, row);
    });
};

const parseExcelAndAddQuestions = (filePath, callback) => {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const questions = xlsx.utils.sheet_to_json(sheet);
  
      const query = "INSERT INTO questions (question, type, chapter, marks) VALUES (?, ?, ?, ?)";
      const placeholders = questions.map((q) => [q.question, q.type, q.chapter, q.marks]);
  
      db.run("BEGIN TRANSACTION");
      placeholders.forEach((placeholder) => {
        db.run(query, placeholder);
      });
      db.run("COMMIT", callback);
  
      fs.unlinkSync(filePath);
    } catch (err) {
      callback(err);
    }
  };
  

module.exports = {addQuestion, getQuestions, deleteQuestion, updateQuestion, getQuestionById, parseExcelAndAddQuestions};