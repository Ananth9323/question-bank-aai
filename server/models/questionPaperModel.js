const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./db/database.db");

const addQuestion = (question, cb) => {
    const {q, answer, chapter, type, marks} = question;
    const command = "INSERT INTO questions(question, answer, chapter, type, marks) VALUES (?, ?, ?, ?, ?)";
    db.run(command, [q, answer, chapter, type, marks], cb);
};

const getQuestions = (cb) => {
    const command = "SELECT * FROM questions";
    db.all(command,[],cb);
};

const deleteQuestion = (id, cb) => {
    const command = "DELETE FROM questions WHERE id = ?";
    db.run(command,[id],cb);
};

module.exports = {addQuestion, getQuestions, deleteQuestion};