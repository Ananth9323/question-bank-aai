const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./db/database.db");
const {addQuestion, getQuestions, deleteQuestion, updateQuestion, getQuestionById, parseExcelAndAddQuestions} = require('../models/questionPaperModel');
 
router.post('/add', (req,res) => {
    console.log(req.body);
    addQuestion(req.body, (err) => {
        if(err){console.log(err);return res.status(500).json({error : err});}
        return res.status(201).json({message : "Question added successfully"});
    });
});

router.get("/", (req, res) => {
    const { type, chapter } = req.query;
  
    let query = "SELECT * FROM questions";
    const queryParams = [];
  
    if (type || chapter) {
      query += " WHERE";
      if (type) {
        query += " type = ?";
        queryParams.push(type);
      }
      if (type && chapter) query += " AND";
      if (chapter) {
        query += " chapter = ?";
        queryParams.push(chapter);
      }
    }
  
    db.all(query, queryParams, (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      return res.json(rows);
    });
});

router.delete('/:id', (req,res) => {
    deleteQuestion(req.params.id, (err) => {
        if(err) return res.status(500).json({error : "Database error"});
        return res.status(201).json({message : "Question deleted successfully"});
    });
});

router.put('/:id', (req, res) => {
    const questionId = req.params.id;
    const updatedData = req.body;

    updateQuestion(questionId, updatedData, (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        return res.status(200).json({ message: "Question updated successfully" });
    });
});

router.get('/:id', (req, res) => {
    const questionId = req.params.id;

    getQuestionById(questionId, (err, question) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!question) return res.status(404).json({ error: "Question not found" });

        return res.json(question);
    });
});


router.post("/add-bulk", upload.single("file"), (req, res) => {
  parseExcelAndAddQuestions(req.file.path, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Questions uploaded successfully" });
  });
});


module.exports = router;