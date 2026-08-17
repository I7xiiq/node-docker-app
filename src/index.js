const express = require('express');
// const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');

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
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
  connectionString: URI,
});

client
  .connect()
  .then(() => console.log('connect to PG db...'))
  .catch((err) => console.log('failed to connect PG to db: ', err));








// const DB_USER = 'root';
// const DB_PASSWORD = 'example'
// const DB_PORT = 27017;
// const DB_HOST = 'mongo'; // أو أي اسم الخدمة كما هو في docker-compose.yml 

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose.connect(URI).then(() => console.log('connect to db...')).catch((err) => console.log('failed to connect to db: ', err));

app.get('/' , (req, res) => {
redisclient.set('product' , 'product...');
res.send('<h1>AHMED MAGD</h1>');
});

app.get('/data' , async (req, res) =>  {
const product = await redisclient.get('product')
redisclient.set('product' , 'product...');
res.send(`<h1>AHMED MAGD</h1> <h2>${product}</h2>`);});

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));