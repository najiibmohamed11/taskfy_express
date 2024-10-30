const { writeGenresTotheFile, readGenresFromFile } = require("../utility/genres")

exports.getgenerated = (req, res) => {
    try {
        const genres = readGenresFromFile();
        res.json(genres); // Add this line to send the response
    } catch (error) {
        res.status(500).json({ message: "Error reading genres" });
    }
}


exports.createGenres = (req, res) => {
    const { genre } = req.body;
    
    if (!genre) {
        return res.status(400).json({ message: 'You must provide a genre' });
    }

    try {
        const genres = readGenresFromFile();
        genres.push(genre);
        writeGenresTotheFile(genres);
        return res.status(201).json({ message: 'Created successfully', genre });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating genre' });
    }
}