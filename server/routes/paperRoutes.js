const express = require('express');
const sqlite = require('sqlite3').verbose();
const router = express.Router();

const db = new sqlite.Database('./db/database.db');

router.get('/generate', (req, res) => {
    const { blueprint } = req.body;
    let questions = [];

    const fetchQuestions = (index) => {
        if(index >= blueprint.length){
            return res.json(questions);
        }

        const {questionType, noOfQuestions, chapterName, marksEach} = blueprint[index];
        db.all("SELECT * FROM questions WHERE type = ? AND chapter = ? AND marks = ? ORDER BY RANDOM() LIMIT ?",
             [questionType, chapterName, marksEach, noOfQuestions],
             (err, rows) => {
                if(err) return res.status(500).json({error : "Database error, failed to fetch question from database"});
                questions = [...questions, ...rows];
                fetchQuestions(index+1);
             }
        );

    };

    fetchQuestions(0);


});

router.get("/replace", (req, res) => {
    const {type, marks, chapter} = req.query;
    db.all("SELECT * FROM questions WHERE type = ? AND marks = ? AND chapter = ? ORDER BY RANDOM() LIMIT 1",
        [type, marks, chapter],
        (err, rows) => {
            if(err) return res.status(500).json({error : 'Database error'});
            res.json(rows);
        }
    );
});

module.exports = router;