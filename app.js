const express = require('express');
const genres = require('./routes/genres');

const app = express();

// Middleware
app.use(express.json());
app.use('/api/vidly', genres);

// Environment variables
const port = process.env.PORT || 9000;

// Server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});