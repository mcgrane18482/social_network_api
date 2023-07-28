const express = require('express');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./db/connection');

// Middleware
app.use(express.json());

app.use(routes);

// Start the server
db.once('open', () => {
    app.listen(PORT, () => console.log('Server started on port %s', PORT));
});