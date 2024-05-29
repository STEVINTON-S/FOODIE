const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/router');

const app = express();

// Enable CORS middleware
app.use(cors());

app.use(express.json());

const PORT = 8080;
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'MealDB';

app.use('/', route);

mongoose.connect(`${MONGO_URL}/${DB_NAME}`)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
