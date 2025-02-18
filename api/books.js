const mongoose = require('mongoose');
const { Schema, model } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const bookSchema = new Schema({
    title: String, author: String, genre: String, owner: String, status: String
});
const Book = model('Book', bookSchema);

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const books = await Book.find();
            res.status(200).json({ books });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books', error: error.message });
        }
    } 
    else if (req.method === 'POST') {
        try {
            await Book.deleteMany();
            await Book.insertMany(req.body.books);
            res.status(200).json({ message: 'Books updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error saving books', error: error.message });
        }
    } 
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
