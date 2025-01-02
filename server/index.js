const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const paperRoutes = require('./routes/paperRoutes');
const questionRoutes = require('./routes/questionRoutes');

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/papers', paperRoutes);
app.use('/questions', questionRoutes);

app.listen(5000, () => {
    console.log("Server connected");
});

// const bcrypt = require('bcrypt');
// const password = 'traininginstructor987654321';
// bcrypt.hash(password, 10, (err, hash) => console.log(hash));
