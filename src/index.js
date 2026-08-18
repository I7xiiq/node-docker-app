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
res.send(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<title>Ahmed Magd</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'Segoe UI', Tahoma, sans-serif;
    overflow: hidden;
  }
  .card {
    text-align: center;
    padding: 60px 80px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 24px;
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }
  h1 {
    font-size: 3.5rem;
    background: linear-gradient(90deg, #00c6ff, #0072ff, #ff00c8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
  p {
    color: #b8b8d1;
    font-size: 1.1rem;
    letter-spacing: 3px;
  }
  .dot {
    width: 10px; height: 10px;
    background: #00e676;
    border-radius: 50%;
    display: inline-block;
    margin-left: 8px;
    box-shadow: 0 0 10px #00e676;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; }
  }
</style>
</head>
<body>
  <div class="card">
    <h1>AHMED MAGD</h1>
    <p>SERVER IS LIVE <span class="dot"></span></p>
  </div>
</body>
</html>
`);
});

app.get('/data' , async (req, res) =>  {
const product = await redisclient.get('product')
redisclient.set('product' , 'product...');
res.send(`<h1>AHMED MAGD</h1> <h2>${product}</h2>`);});

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));