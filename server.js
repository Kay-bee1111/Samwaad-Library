const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const BOOKS_FILE = 'books.json';

app.use(cors());
app.use(express.json());

// Fetch books.json data
app.get('/books', (req, res) => {
    fs.readFile(BOOKS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading books file' });
        res.json(JSON.parse(data));
    });
});

// Update books.json
app.post('/update-books', (req, res) => {
    const updatedBooks = req.body;

    fs.writeFile(BOOKS_FILE, JSON.stringify(updatedBooks, null, 2), 'utf8', (err) => {
        if (err) return res.status(500).json({ message: 'Error saving books' });
        res.json({ message: 'Books updated successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
