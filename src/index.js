const express = require('express');
const mongoose = require('mongoose');
// init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect db
const DB_USER = 'root';
const DB_PASSWORD = 'example'
const DB_PORT = 27017;
const DB_HOST = 'mongo'; // أو أي اسم الخدمة كما هو في docker-compose.yml 

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URI).then(() => console.log('connect to db...')).catch((err) => console.log('failed to connect to db: ', err));

app.get('/' , (req, res) => res.send('<h1> ed11 aييييhmeggggd</h1>'));

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));