const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection String (Replace with your credentials)
const MONGO_URI = 'mongodb+srv://bhardwajkrati20:EEMNcPH7sZS6m0qC@cluster0.nb3j4.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    owner: String,
    status: String
});

const Book = mongoose.model('Book', bookSchema);

app.use(cors());
app.use(express.json());

// ✅ API: Fetch Books from MongoDB
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
});

// ✅ API: Add or Update Books
app.post('/api/update-books', async (req, res) => {
    try {
        await Book.deleteMany();  // Clear existing books
        await Book.insertMany(req.body.books);  // Insert new books
        res.status(200).json({ message: 'Books updated successfully in MongoDB' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving books', error: err.message });
    }
});

// Start Server (For Local Testing)
if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

// ✅ Export for Vercel Deployment
module.exports = app;
