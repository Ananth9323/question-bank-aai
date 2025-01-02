const express = require('express');
const router = express.Router();

const {addQuestion, getQuestions, deleteQuestion} = require('../models/questionPaperModel');

router.post('/add', (req,res) => {
    addQuestion(req.body, (err) => {
        if(err)return res.status(500).json({error : err});
        return res.status(201).json({message : "Question added successfully"});
    });
});

router.get('/', (req,res) => {
    getQuestions((err, rows) => {
        if(err)return res.status(500).json({error: "Database error"});
        return res.json(rows);
    });
});

router.delete('/:id', (req,res) => {
    deleteQuestion(req.params.id, (err) => {
        if(err) return res.status(500).json({error : "Database error"});
        return res.status(201).json({message : "Question deleted successfully"});
    });
});

module.exports = router;