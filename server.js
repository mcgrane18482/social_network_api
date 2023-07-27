const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./db/connection');

// Middleware
app.use(express.json());