const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./db/database.db');
const secretKey = "123456789";

router.post('/login', (req,res) => {
    const {username,password} = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], (err,user) => {
        if(err) return res.status(500).json({error : err});
        if(!user) return res.status(404).json({ error: "User not found"});

        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                const token = jwt.sign({id : user.id}, secretKey, {expiresIn : "1h"});
                res.json({token});
            }
            else{
                return res.status(401).json({error: "Invalid password"});
            }
        });
    });
});

router.get('/users', (req,res) => {
    //const {username,password} = req.body;
    db.all("SELECT * FROM users", [], (err,users) => {
        if(err) return res.status(500).json({error : err});
        if(!users) return res.status(404).json({ error: "No users found"});

        res.json({users: users});

    });
});

module.exports = router;