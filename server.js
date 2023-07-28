const express = require('express');
const routes = require('./routes');

const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(routes);

// Start the server
db.once('open', () => {
    app.listen(PORT, () => console.log('Server started on port %s', PORT));
});