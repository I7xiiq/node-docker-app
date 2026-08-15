const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// init app
const PORT = process.env.PORT || 4000;
const app = express();

//connect to redis
const REDIS_PORT = 6379 ;
const REDIS_HOST = 'redis' ;
const redisclient = redis.createClient({url: `redis://${REDIS_HOST}:${REDIS_PORT}`});
redisclient.on('error', (err) => console.log('redis client error' , err));
redisclient.on('connect', (err) => console.log('connected to redis' , err));
redisclient.connect();

// connect db
const DB_USER = 'root';
const DB_PASSWORD = 'example'
const DB_PORT = 27017;
const DB_HOST = 'mongo'; // أو أي اسم الخدمة كما هو في docker-compose.yml 

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose.connect(URI).then(() => console.log('connect to db...')).catch((err) => console.log('failed to connect to db: ', err));

app.get('/' , (req, res) => res.send('<h1> ed11 aييييhmeggggd</h1>'));

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));